const Notification = require("../models/notifications.model");

class NotificationsService {
    async getDiscountNotification() {
        try {
            const notifications = await Notification.find({
                notification_status: true,
            })
            .sort({ createdAt: -1 })

            return notifications;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new NotificationsService();