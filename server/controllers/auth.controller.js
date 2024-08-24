const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getInfoJson } = require('../utils/getInfo');
const { createTokenPair } = require('../utils/createToken');
const { sendOTP } = require('../configs/nodeMailer.config');
const User = require('../models/users.model');
const KeyToken = require('../models/keytoken.model');
const OTP = require('../models/otp.model');

exports.signup = async (req, res, next) => {
    try {
        const checkEmail = await User.findOne({
            email: req.body.email
        })
        .lean();

        if(checkEmail) {
            return res.status(400).json({message: 'Email already exists'});
        }

        // Create new user from request body
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            hashPassword: hash
        })
        await user.save();

        return res.status(200).json({
            message: 'Signup success',
        });
    } catch(err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = bcrypt.compareSync(password, user.hashPassword)

        if(!isMatch) {
            return res.status(401).json({message: 'Wrong password'});
        } 

        // Create access token and refresh token from user info
        const payload = getInfoJson({fields: ['_id', 'name', 'email', 'role'], objects: user})
        const {accessToken, refreshToken} = await createTokenPair(payload, process.env.JWT_PUBLIC_KEY, process.env.JWT_PRIVATE_KEY);  
        const existsToken = await KeyToken.findOne({
            userId: user._id
        });
        if(existsToken) {
            existsToken.refreshToken = refreshToken;
            await existsToken.save();
        } else {
            const keyToken = new KeyToken({
                userId: user._id,
                refreshToken
            })
            await keyToken.save();
        }
        
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict', secure: true, sameSite: 'strict' });
        return res.status(200).json({
            message: 'Login success',
            token_type: 'Bearer',
            accessToken,
            refreshToken,
            expired: Date.now() + 86400000,
            name: user.name,
            role: user.role
        });

    } catch(err) {
        next(err);
    }
}

exports.logout = async (req, res, next) => {
    try {
        // Get refresh token from cookies and delete it from database
        const refreshToken = req.cookies.refreshToken;
        await KeyToken.deleteOne({
            refreshToken: refreshToken
        });
        res.clearCookie('refreshToken');
        return res.status(200).json({message: 'Logout success'});
    } catch(err) {
        next(err);
    }
}

exports.refreshAccessToken = async (req, res, next) => {
    try {
        // Get refresh token from cookies and find user
        const refreshToken = req.cookies.refreshToken;
        const keyToken = await KeyToken.findOne({
            refreshToken: refreshToken
        });
        if(!keyToken) {
            return res.status(401).json({message: 'Access denied'});
        }

        const user = await User.findOne({
            _id: keyToken.userId
        });
        const payload = getInfoJson({fields: ['_id', 'name', 'email', 'role'], objects: user})
        const {accessToken} = await createTokenPair(payload, process.env.JWT_PUBLIC_KEY, process.env.JWT_PRIVATE_KEY);

        return res.status(200).json({
            message: 'Refresh access token success',
            token_type: 'Bearer',
            accessToken
        })
    } catch(err) {
        next(err);
    }
}

exports.sendOTPVerificationEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email: email,
        })
        .lean();

        const otp = crypto.randomInt(100000, 999999);
        await OTP.create({
            otp: otp,
            userId: user._id
        })
        await sendOTP(email, otp);

        return res.status(200).json({
            message: 'Send OTP success',
        })
    } catch(err) {
        next(err);
    }
}

exports.verifyPasswordOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
    
        const user = await User.findOne({
            email: email,
        })
        .lean();
    
        const checkOTP = await OTP.findOne({
            otp: otp,
            userId: user._id,
        })
        if(!checkOTP) {
            return res.status(400).json({message: 'Invalid OTP'});
        }
    
        return res.status(200).json({
            message: 'Verify OTP success',
        })
    } catch(err) {
        next(err);
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate({
            email: email,
        }, {
            hashPassword: hashPassword,
        }, { new: true })

        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }

        // Delete all OTP of this user
        await OTP.deleteMany({
            userId: user._id
        })

        return res.status(200).json({
            message: 'Change password success',
        })

    } catch(err) {
        next(err);
    }
}