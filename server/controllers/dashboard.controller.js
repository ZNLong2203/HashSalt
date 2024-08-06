const DashboardService = require('../services/dashboard.service');

exports.getOverview = async (req, res, next) => {
    try {
        const { totalUsers, totalProducts, totalOrders, totalRevenue } = await DashboardService.getOverview();
        return res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue
        });
    } catch(err) {
        next(err);
    }
}

