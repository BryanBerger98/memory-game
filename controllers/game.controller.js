const userModel = require('../models/user.model');
const gameModel = require('../models/game.model');

module.exports = {
    getGamePage: (req, res) => {
        res.render('game');
    },
    launchGame: async (req, res) => {
        const pseudo = req.body.pseudo;
        res.render('game', {pseudo});
    },
    saveGame: async (req, res) => {
        try {
            const user = req.body.user;            
            const newUser = await userModel.findOneAndUpdate({pseudo: user.pseudo}, {...user}, {upsert: true, new: true});
            const game = new gameModel({...req.body.game, user: newUser._id});
            const newGame = await game.save();
            res.status(200).json({user: newUser, game: newGame});     
        } catch (error) {
            res.status(500).json({error});
        }        
    }
};