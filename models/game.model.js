// Model MongoDB de l'objet Game

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user: { // Contient l'id de l'utilisateur associé
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Number,
    card_pairs_found: Number,
    success: Boolean,
    created_on: {type: Date, default: Date.now} // Date par défaut: maintenant
});

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;