const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        require: true
    },
    price: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const OrderItemModel = mongoose.model('OrderItems', OrderItemSchema);
module.exports = OrderItemModel;