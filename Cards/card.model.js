const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');

var cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId }
});

module.exports = mongoose.model('CardDetails', cardSchema);
