import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        // Simple auth check against admin email/password from .env
        // In a real app, this would use Supabase Auth or a secure hash check
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.json({
                success: true,
                message: 'Login successful',
                user: { email, role: 'admin' }
            });
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
