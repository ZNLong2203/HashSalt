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
        } catch (err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new DashboardService();