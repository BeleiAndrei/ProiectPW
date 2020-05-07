const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions',
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

const AnswerModel = mongoose.model('Answers', AnswerSchema);
module.exports = AnswerModel;