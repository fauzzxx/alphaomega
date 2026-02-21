import express from 'express';
import multer from 'multer';
import path from 'path';
import { supabase } from '../lib/supabase.js';
import { authMiddleware } from '../lib/authMiddleware.js';
import { getSignedUrl } from '../lib/storage.js';

const router = express.Router();

// Use memory storage for serverless environment
const upload = multer({ storage: multer.memoryStorage() });

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
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const uuids = productIds.filter(id => uuidRegex.test(id));
        const slugs = productIds.filter(id => !uuidRegex.test(id));

        let allProducts = [];
        if (uuids.length > 0) {
            const { data: uuidProducts } = await supabase.from('products').select('id, name, price, slug').in('id', uuids);
            if (uuidProducts) allProducts = [...allProducts, ...uuidProducts];
        }
        if (slugs.length > 0) {
            const { data: slugProducts } = await supabase.from('products').select('id, name, price, slug').in('slug', slugs);
            if (slugProducts) allProducts = [...allProducts, ...slugProducts];
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
        const shipping = subtotal >= 1500 ? 0 : 70;
        const total = subtotal + shipping;

        const orderReference = generateOrderReference();

        // 3. Handle screenshot upload to Supabase Storage
        let screenshotUrl = null;
        if (req.file) {
            const fileExt = path.extname(req.file.originalname);
            const fileName = `payment-${Date.now()}${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('orders')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error('Supabase Storage Error:', uploadError);
                // Continue without screenshot if upload fails, or throw error?
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from('orders')
                    .getPublicUrl(fileName);
                screenshotUrl = publicUrl;
            }
        }

        // 4. Map to flat DB columns
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

// Get orders (Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const mappedOrders = await Promise.all(data.map(async (order) => {
            let screenshotUrl = order.payment_screenshot_url;

            // If the URL is just a filename or from a private bucket, sign it
            if (screenshotUrl && !screenshotUrl.startsWith('http')) {
                try {
                    screenshotUrl = await getSignedUrl('orders', screenshotUrl);
                } catch (e) {
                    console.error('Failed to sign URL for order:', order.id);
                }
            }

            return {
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
                paymentScreenshotUrl: screenshotUrl
            };
        }));

        res.json({ orders: mappedOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', authMiddleware, async (req, res) => {
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
