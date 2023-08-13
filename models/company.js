const mongoose = require('mongoose');
const validator = require('validator');


const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Please provide an company name...'],
        maxlength: [40, 'please provide company name under 40 chars']
    },
    recruiterName: {
        type: String,
        required: [true, 'Please provide an recruiter name...'],
        maxlength: [40, 'please provide recruiter name under 40 chars']
    },
    email: {
        type: String,
        required: [true, 'Please provide an company Email...'],
        validate: [validator.isEmail, 'Please provide email in valid format...'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required:[true,'Please provide contact number...'],
    },
    posts: {
        type: Number,
        required: [true, 'Please provide number of posts...'],
    },
    package: {
        type: Number,
        required: [true, 'Please provide package of company...'],
    },
    role: {
        type: String,
        required: [true, 'Please provide role of job...'],
    },
    logo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    institute: {
        type: mongoose.Schema.ObjectId,
        ref: 'Institute',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Company', companySchema);