const express = require('express');
const { userSignupValidation } = require('../middlewares/userValidation');
const User = require('../models/userModel');
const router = express.Router();

router.get('/signup',userSignupValidation,async(req,res)=>{
   const { username , email , password , photo } = req.body ;
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            photo
        })
        
        return res.status(200).json({
            msg : "user is successfully registered ..."
        })
    } catch (e) {
        console.log(`error in user registration : ${e}`);
    }
})

module.exports = router ;