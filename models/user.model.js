// Model MongoDB de l'objet User

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    pseudo: {type: String, required: true, unique: true, index: true}, // Requis, unique, indexé
    created_on: {type: Date, default: Date.now()} // Date par défaut: maintenant
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;