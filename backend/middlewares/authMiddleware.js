const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({ _id: decoded.userId }).select("-password");
            // console.log(req.user);
            next();
        } catch (error) {
            console.log(`error in authmiddleware : ${e}`);
        }
    } else {
        console.log('not authorized');
    }
}

module.exports = { authMiddleware };