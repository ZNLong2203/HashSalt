const Users = require('../models/users.model');

class UserService {
    async getUserInfo(userId) {
        try {
            const user = await Users.findById({
                _id: userId,
            })
            .select('-hashPassword -__v -createdAt -updatedAt -provider -provider_id')
            .lean();

            return user;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async updateUserInfo(userId, userInfo) {
        try {
            const user = await Users.findOneAndUpdate({
                _id: userId,
            }, {
                ...userInfo,
            }, { new: true});

            return user;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new UserService();