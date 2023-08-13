const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an name...'],
        maxlength: [40, 'please provide name under 40 chars']
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email...'],
        validate: [validator.isEmail, 'Please provide email in valid format...'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required:[true,'Please provide phone number...'],
        maxlength: [10, 'Please provide valid phone number which contain 10 numbers'],
        minlength: [10, 'Please provide valid phone number which contain 10 numbers'],
    },
    password: {
        type: String,
        required: [true, 'Please provide an password...'],
        minlength: [6, 'Password should contain min 6 chars'],
        select: false
    },
    role: {
        type: String,
        default: 'student'  // hr manager student
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encrypt password before save - HOOKS
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// validating the password
userSchema.methods.isValidatedPassword = async function(userSendPassword) {
    return await bcrypt.compare(userSendPassword, this.password);
};

// get JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRY}
    );
}

// get forgotpassword token
userSchema.methods.getForgotPasswordToken = function(){
    const forgotToken = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return forgotToken;
}


module.exports = mongoose.model('User', userSchema);