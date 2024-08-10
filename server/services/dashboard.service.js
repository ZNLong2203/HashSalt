const User = require('../models/users.model');
const { Products } = require('../models/products.model');
const Orders = require('../models/orders.model');

class DashboardService {
    async getOverview() {
        try {
            const totalUsers = await User.countDocuments();
            const totalProducts = await Products.countDocuments();
            const totalOrders = await Orders.countDocuments();
            const totalRevenue = await Orders.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$order_total' }
                    }
                }
            ]);

            return { totalUsers, totalProducts, totalOrders, totalRevenue: totalRevenue[0]?.total || 0 }; 
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async getBarChartData(startDate, endDate) {
        try {
            const chartData = await Orders.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                },
                {
                    $unwind: "$order_delivery" // Unwind the array to deal with each element separately
                },
                {
                    $lookup: {
                        from: "carts", 
                        localField: "order_delivery.order_carts",
                        foreignField: "_id",
                        as: "cartDetails"
                    }
                },
                {
                    $unwind: "$cartDetails"
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        total: { $sum: "$cartDetails.cart_total" } 
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        total: 1
                    }
                },
                {
                    $sort: { date: 1 }
                }
            ]);
            
            return chartData;
        } catch (err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new DashboardService();