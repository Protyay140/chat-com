const zod = require('zod');
const User = require('../models/userModel');

const userSchema = zod.object({
    username: zod.string().min(3, { message: "username must be atleast 5 characters" }),
    email: zod.string().email(),
    password: zod.string().min(5, { message: "password must be atleast 5 characters" }),
})

const userSignupValidation = async (req, res, next) => {
    try {
        const userInfo = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo
        }

        const check = userSchema.safeParse(userInfo);
        console.log(check);
        if (!check.success) {
            const errorMessage = check.error.errors[0].message;
            return res.status(400).json({
                ErrorMsg: errorMessage,
            })
        }

        const checkUser = await User.findOne({
            email : req.body.email,
            password : req.body.password,
        })

        if(checkUser){
            return res.status(400).json({
                msg : "user is already registered ..."
            })
        }

        next();
    } catch (e) {
        console.log(`error in user middleware : ${e}`.red.bold);
    }
}

module.exports = { userSignupValidation };