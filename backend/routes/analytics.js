import express from 'express';
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.json({
        metrics: {
            totalRevenue: 0,
            totalOrders: 0,
            averageOrderValue: 0,
            totalProducts: 0,
            lowStockProducts: 0
        },
        topProducts: [],
        charts: {
            dailyRevenue: [],
            categorySales: []
        }
    });
});

export default router;
