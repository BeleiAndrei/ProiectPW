const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    gdpr: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'support']
    }
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
