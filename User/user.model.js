const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');

var userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, config.saltRounds)
    next();
});

userSchema.post('save', function (err, doc, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error('Email Already Exists'));
    }
})

module.exports = mongoose.model('Users', userSchema);
