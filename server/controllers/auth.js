const bcrypt = require('bcrypt');
const crypto = require('crypto');
const getInfoJson = require('../utils/getInfoJson');
const createTokenPair = require('../utils/createToken');
const User = require('../models/user');
const KeyToken = require('../models/keytoken');

exports.signup = async (req, res, next) => {
    try {
        // Check if email already exists
        const checkEmail = await User.findOne({email: req.body.email}).lean();
        if(checkEmail) {
            return res.status(400).json({message: 'Email already exists'});
        }

        // Create new user from request body
        const {name, email, password} = req.body;
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
        console.log(err);
        return res.status(400).json({message: 'Something went wrong'});
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = bcrypt.compareSync(password, user.hashPassword)

        if(!isMatch) {
            return res.status(401).json({message: 'Wrong password'});
        } 

        // Create access token and refresh token from user info
        const payload = getInfoJson({fields: ['_id', 'name', 'email', 'role'], objects: user})
        const {accessToken, refreshToken} = await createTokenPair(payload, process.env.JWT_PUBLIC_KEY, process.env.JWT_PRIVATE_KEY);  
        const existsToken = await KeyToken.findOne({userId: user._id});
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

        res.cookie('refreshToken', refreshToken, {httpOnly: true})
        return res.status(200).json({
            message: 'Login success',
            token_type: 'Bearer',
            accessToken,
            refreshToken,
            name: user.name,
            role: user.role
        });

    } catch(err) {
        console.log(err);
        return res.status(400).json({message: 'Something went wrong'});
    }
}