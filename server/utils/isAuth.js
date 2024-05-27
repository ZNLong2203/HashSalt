const User = require("../models/user")
const KeyToken = require("../models/keytoken")
const jwt = require("jsonwebtoken")

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Access denied"});
    }

    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, User) => {
        if(err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.User = User;
        next();
    });
}

module.exports = {
    authenticateToken
}