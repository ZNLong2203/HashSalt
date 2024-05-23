const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            hashPassword: hash
        })
        const result = await user.save();
        return res.status(200).json({message: 'Signup success'});
    } catch(err) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compareSync(password, user.hashPassword)

        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        } else {
            return res.status(200).json({message: 'Login success'});
        }
    } catch(err) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}