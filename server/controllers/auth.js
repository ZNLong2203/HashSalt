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
        const result = await user.save();

        // Generate RSA key pair
        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        
        // Create access token and refresh token from user info
        const payload = getInfoJson({fields: ['_id', 'name', 'email', 'role'], objects: result})
        const {accessToken, refreshToken} = await createTokenPair(payload, publicKey, privateKey);  
        const keyToken = new KeyToken({
            userId: result._id,
            publicKey,
            refreshToken
        })

        await keyToken.save();

        return res.status(200).json({message: 'Signup success'});
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
            return res.status(400).json({message: 'Invalid credentials'});
        } else {
            return res.status(200).json({message: 'Login success'});
        }
    } catch(err) {
        console.log(err);
        return res.status(400).json({message: 'Something went wrong'});
    }
}