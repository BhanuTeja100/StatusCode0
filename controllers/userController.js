const User = require('../models/user');
const BigPromise = require('../middlewares/BigPromise');
const cloudinary = require('cloudinary');
const cookieToken = require('../utils/cookieToken');

exports.signup = BigPromise(async (req, res, next) => {
    if(!req.files){
        return next(new Error("Photo is required for signup..."));
    }

    const {name, email, phoneNumber, password, confirmPassword} = req.body;

    if(!email || !name || !phoneNumber || !password || !confirmPassword){
        return next(new Error('Name, Email, Phone number and password are required'));
    }

    if(password !== confirmPassword){
        return next(new Error('Password and Confirm Password should be same...'));
    }

    let file = req.files.photo;

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "statuscode",
        width: 150,
        crop:"scale",
    });

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password,
        photo: {
            id: result.public_id,
            secure_url: result.secure_url,
        }
    });

    cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new Error(`Please provide email and password`));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new Error(`Email or password does not match or not exist`));
    }

    const isCorrectPassword = await user.isValidatedPassword(password);

    if(!isCorrectPassword){
        return next(new Error(`Email or password does not match or not exist`));
    }

    cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logout Successfull..."
    });
});