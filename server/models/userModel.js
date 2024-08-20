const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    // You can add other fields like name, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
