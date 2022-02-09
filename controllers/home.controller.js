const userModel = require('../models/user.model');
const gameModel = require('../models/game.model');

module.exports = {
    getHomePage: async (req, res) => {
        try {
            const games = await gameModel.find().sort({time: -1}).limit(3).populate('user');
            console.log(games);

            res.render('home', {title: 'Hello world', games});
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
        }
    }
};