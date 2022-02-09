const userModel = require('../models/user.model');
const gameModel = require('../models/game.model');

module.exports = {
    getHomePage: async (req, res) => {
        try {
            const games = await gameModel.find().sort({time: 1}).limit(3).populate('user').lean();
            games.map(game => {
                game.time = msToMS(game.time);
                return game;
            })
            res.render('home', {games});
        } catch (error) {
            console.error(error);
            res.status(500).json({error});
        }
    }
};

function msToMS(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 3- Extract minutes:
    const minutes = parseInt( seconds / 60 );
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return {minutes, seconds: seconds.toFixed()};
}