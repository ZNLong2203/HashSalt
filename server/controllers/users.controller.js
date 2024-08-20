const UserService = require('../services/users.service');

exports.getUserInfo = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const user = await UserService.getUserInfo(userId);

        return res.status(200).json({
            user,
        })
    } catch(err) {
        next(err);
    }
}

exports.updateUserInfo = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userInfo = req.body;

        const user = await UserService.updateUserInfo(userId, userInfo);

        if(!user) {
            return res.status(400).json({
                message: "Update user info failed",
            })
        }
        
        return res.status(200).json({
            message: "Update user info success",
        })
    } catch(err) {
        next(err);
    }
}