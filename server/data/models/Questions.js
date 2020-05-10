const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    important: {
        type: Boolean,
        required: false
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const QuestionModel = mongoose.model('Questions', QuestionSchema);
module.exports = QuestionModel;