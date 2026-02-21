import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json([]);
});

router.post('/', (req, res) => {
    res.status(201).json({ message: 'Banner created (placeholder)' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'Banner deleted (placeholder)' });
});

export default router;
