const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    produc_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ReviewModel = mongoose.model('Reviews', ReviewSchema);
module.exports = ReviewModel;