const NotificationsService = require("../services/notifications.service");

exports.getDiscountNotification = async (req, res, next) => {
    try {
        const notifications = await NotificationsService.getDiscountNotification();
        return res.status(200).json({
            message: 'Notifications fetched successfully',
            notifications, 
        })
    } catch(err) {
        next(err);
    }
}