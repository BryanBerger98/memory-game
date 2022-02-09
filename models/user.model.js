
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: {type: String, required: true, unique: true, index: true},
    created_on: {type: Date, default: Date.now()}
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;