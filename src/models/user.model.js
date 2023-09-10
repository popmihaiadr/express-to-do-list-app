const { required } = require('@hapi/joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        enum: ['VIEWER', 'WRITER'],
        default: 'VIEWER',
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

