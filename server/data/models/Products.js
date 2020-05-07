const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: false
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Providers',
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.model('Products', ProductSchema);
module.exports = ProductModel;
