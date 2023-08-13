const mongoose = require('mongoose');
const validator = require('validator');


const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an institute name...'],
        maxlength: [100, 'please provide institute name under 40 chars']
    },
    email: {
        type: String,
        required: [true, 'Please provide an Institute Email...'],
        validate: [validator.isEmail, 'Please provide email in valid format...'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required:[true,'Please provide phone number...'],
    },
    noOfStudents: {
        type: Number,
        required: [true, 'Please provide number of students registered...'],
    },
    noOfStudentsPlaced: {
        type: Number,
        required: [true, 'Please provide number of students Placed...'],
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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Institute', instituteSchema);