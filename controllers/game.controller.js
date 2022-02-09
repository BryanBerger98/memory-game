module.exports = {
    getGamePage: (req, res) => {
        res.render('game');
    },
    launchGame: (req, res) => {
        const pseudo = req.body.pseudo;
        res.render('game', {pseudo});
    },
    saveGame: (req, res) => {
        const game = req.body;
        console.log(game);
        res.status(200).json({message: 'OK'});
    }
};