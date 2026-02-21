import express from 'express';
import multer from 'multer';
import path from 'path';
import { supabase } from '../lib/supabase.js';
import { authMiddleware } from '../lib/authMiddleware.js';

const router = express.Router();

// Memory storage for serverless
const upload = multer({ storage: multer.memoryStorage() });

// Get all products
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ message: 'Product not found' });

        res.json(data);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// Create product (Admin only)
router.post('/', authMiddleware, upload.array('images'), async (req, res) => {
    try {
        const productData = { ...req.body };

        // Handle image uploads to Supabase Storage
        if (req.files && req.files.length > 0) {
            const uploadedUrls = [];
            for (const file of req.files) {
                const fileName = `product-${Date.now()}-${file.originalname}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype,
                        upsert: false
                    });

                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('products')
                        .getPublicUrl(fileName);
                    uploadedUrls.push(publicUrl);
                }
            }
            productData.images = uploadedUrls;
        }

        if (productData.sizes && typeof productData.sizes === 'string') {
            try {
                productData.sizes = JSON.parse(productData.sizes);
            } catch (e) {
                productData.sizes = productData.sizes.split(',').map(s => s.trim());
            }
        }

        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update product (Admin only)
router.put('/:id', authMiddleware, upload.array('images'), async (req, res) => {
    try {
        const productData = { ...req.body };

        // Handle new image uploads if provided
        if (req.files && req.files.length > 0) {
            const uploadedUrls = [];
            for (const file of req.files) {
                const fileName = `product-${Date.now()}-${file.originalname}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype,
                        upsert: false
                    });

                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('products')
                        .getPublicUrl(fileName);
                    uploadedUrls.push(publicUrl);
                }
            }
            // If new images are uploaded, we might want to append or replace. 
            // For now, let's assume we replace or the frontend handles merge.
            productData.images = uploadedUrls;
        }

        if (productData.sizes && typeof productData.sizes === 'string') {
            try {
                productData.sizes = JSON.parse(productData.sizes);
            } catch (e) {
                productData.sizes = productData.sizes.split(',').map(s => s.trim());
            }
        }

        const { data, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Delete product (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export default router;
