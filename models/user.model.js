const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [20, 'Username must be at most 20 characters long'],
        lowercase: true,
        unique: true
    },
    
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [10, 'Email must be at least 10 characters long'],

    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [5, 'Password must be at least 6 characters long'],
    }   
})


const user = mongoose.model('user', userSchema);

module.exports = user;