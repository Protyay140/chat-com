const express = require('express');
const { userSignupValidation, userLoginValidation } = require('../middlewares/userValidation');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/signup', userSignupValidation, async (req, res) => {
    const { username, email, password, picture } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            picture
        })

        const token = jwt.sign({ userId : newUser._id}, process.env.JWT_SECRET);

        res.status(200).json({
            msg: "user is successfully registered ...",
            token: token,

        })

    } catch (e) {
        console.log(`error in user registration : ${e}`);
    }
})

router.post('/login', userLoginValidation, async (req, res) => {
    const { email, password } = req.body;
    try {
        const loginUser = await User.findOne({
            email: email,
            password: password,
        })

        const token = jwt.sign({userId : loginUser._id}, process.env.JWT_SECRET);
        return res.status(200).json({
            msg: "user is successfully logged in ...",
            token: token
        })
    } catch (e) {
        console.log('error is login : ', e);
    }
})

router.get('/me',authMiddleware, (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        MyAccount : req.user
    })
})

router.get('/',authMiddleware,async(req,res)=>{
    const keyword = req.query.search ? {
        $or : [
            {username : {$regex : req.query.search , $options : "i"}},
            {email : {$regex : req.query.search , $options : "i"}}
        ],
    } : {};

    try {
        const users = await User.find(keyword).find({_id : {$ne : req.user._id}});
        return res.status(200).json({
            users
        })
    } catch (e) {
        console.log('error in search : ',e);
    }
})

module.exports = router;