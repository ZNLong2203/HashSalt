const User = require("../models/user")
const KeyToken = require("../models/keytoken")
const jwt = require("jsonwebtoken")

exports.authenticateToken = async (req, res, next) => {
    // Get refresh token from request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Access denied"});
    }

    console.log(req.headers)
    // Verify refresh token
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
        if(err) {
            return res.status(401).json({message: "Access denied"});
        }
        req.user = user;
        next();
    })
}

exports.isAdmin = async (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: "Access denied"})
    }
    next();
}