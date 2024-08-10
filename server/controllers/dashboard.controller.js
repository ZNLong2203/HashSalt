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

exports.getBarChartData = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const chartData = await DashboardService.getBarChartData(startDate, endDate);
        return res.status(200).json({
            chartData
        })
    } catch(err) {
        next(err);
    }
}
