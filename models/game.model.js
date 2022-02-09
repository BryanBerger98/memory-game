
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Number,
    card_pairs_found: Number,
    success: Boolean,
    created_on: {type: Date, default: Date.now}
});

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;