const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        enum: ["cart", "completed"],
        required: true
    },
    totalPrice: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const OrderModel = mongoose.model('Orders', OrderSchema);
module.exports = OrderModel;