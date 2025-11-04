const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'client'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); 

const User = mongoose.model('User',userSchema);

module.exports = User;