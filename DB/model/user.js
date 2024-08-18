const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 40,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    department: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others'],
    },
    branch: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40,
    },
    idNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    workingFloor: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    faceData: {
        type: Buffer,
        required: true,
    },
    workingHour: {
        type: Number,
        required: true,
        max: 20,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;