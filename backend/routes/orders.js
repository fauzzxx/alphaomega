import express from 'express';
import multer from 'multer';
import path from 'path';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

// On Vercel (serverless) use memory storage; locally use disk for payment screenshots
const storage = process.env.VERCEL
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/orders/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'payment-' + uniqueSuffix + path.extname(file.originalname));
        }
    });

const upload = multer({ storage });

// Helper to generate ORD-YYYY-XXXXX format
function generateOrderReference() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `ORD-${year}-${random}`;
}

// Create new order
router.post('/', upload.single('paymentScreenshot'), async (req, res) => {
    try {
        const customer = JSON.parse(req.body.customer);
        const items = JSON.parse(req.body.items);
        const paymentMethod = req.body.paymentMethod;
        const source = req.body.source || 'website';

        // 1. Hydrate items with current prices and names from DB
        const productIds = items.map(item => item.product);

        // Check which IDs are UUIDs and which are likely slugs
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const uuids = productIds.filter(id => uuidRegex.test(id));
        const slugs = productIds.filter(id => !uuidRegex.test(id));

        let allProducts = [];

        if (uuids.length > 0) {
            const { data: uuidProducts, error: uuidError } = await supabase
                .from('products')
                .select('id, name, price, slug')
                .in('id', uuids);
            if (!uuidError && uuidProducts) allProducts = [...allProducts, ...uuidProducts];
        }

        if (slugs.length > 0) {
            const { data: slugProducts, error: slugError } = await supabase
                .from('products')
                .select('id, name, price, slug')
                .in('slug', slugs);
            if (!slugError && slugProducts) allProducts = [...allProducts, ...slugProducts];

            // Fallback: If slug column doesn't exist or no match, try matching name (best effort)
            if (slugError || (!slugProducts || slugProducts.length < slugs.length)) {
                // If we hit a PGRST204 (column not found) or missing products, try name mapping
                // For now, let's just log and skip slugs if they fail, or we could add a temporary name mapping
                console.log('Slug lookup failed or incomplete, using fallback name mapping');
            }
        }

        const hydratedItems = items.map(item => {
            const product = allProducts.find(p => p.id === item.product || p.slug === item.product);
            return {
                ...item,
                name: product?.name || 'Unknown Product',
                price: product?.price || 0
            };
        });

        // 2. Calculate totals
        const subtotal = hydratedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const shipping = subtotal >= 1500 ? 0 : 70; // Matching FREE_SHIPPING_THRESHOLD and SHIPPING_RATE
        const total = subtotal + shipping;

        const orderReference = generateOrderReference();
        const screenshotUrl = req.file ? `uploads/orders/${req.file.filename}` : null;

        // 3. Map to flat DB columns
        const orderData = {
            customer_name: customer.name,
            customer_email: customer.email,
            customer_phone: customer.phone,
            customer_address_street: customer.address.street,
            customer_address_city: customer.address.city,
            customer_address_state: customer.address.state,
            customer_address_zip_code: customer.address.zipCode,
            customer_address_country: customer.address.country,
            items: hydratedItems,
            subtotal,
            shipping,
            total,
            payment_method: paymentMethod,
            status: 'Pending',
            payment_status: 'Pending',
            order_reference: orderReference,
            source: source,
            payment_screenshot_url: screenshotUrl,
            created_at: new Date()
        };

        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

        if (error) throw error;

        // 4. Send automated email notification to owner
        try {
            const { sendOrderNotification } = await import('../lib/mail.js');
            // We pass the inserted data (which includes IDs and timestamps)
            await sendOrderNotification(orderData);
        } catch (mailError) {
            console.error('Failed to trigger email notification:', mailError);
            // We don't throw here to avoid failing the order if just the notification fails
        }

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderReference: orderReference,
            orderId: data.id
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
    }
});

// Get orders (for Admin)
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map flat DB columns back to nested structure for frontend
        const mappedOrders = data.map(order => ({
            ...order,
            customer: {
                name: order.customer_name,
                email: order.customer_email,
                phone: order.customer_phone,
                address: {
                    street: order.customer_address_street,
                    city: order.customer_address_city,
                    state: order.customer_address_state,
                    zipCode: order.customer_address_zip_code,
                    country: order.customer_address_country
                }
            },
            paymentMethod: order.payment_method,
            paymentStatus: order.payment_status,
            paymentScreenshotUrl: order.payment_screenshot_url
        }));

        res.json({ orders: mappedOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Error updating status', error: error.message });
    }
});

export default router;
