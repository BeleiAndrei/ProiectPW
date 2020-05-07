const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProviderModel = mongoose.model('Providers', ProviderSchema);
module.exports = ProviderModel;
