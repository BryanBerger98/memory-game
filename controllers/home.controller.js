// Importation de gameModel
const gameModel = require('../models/game.model');

module.exports = {
    /**
     * Fonction permettant l'affichage de la page d'accueil.
     * Cette page doit afficher le tableau des meilleurs scores.
     * @async Fonction asynchrone
     * @param {*} req Requête HTTP
     * @param {*} res Réponse HTTP
     */
    getHomePage: async (req, res) => {
        try {

            // Récupération des 3 parties ayant fait le meilleur temps dans l'ordre croissant et de leur joueur associé. 
            const games = await gameModel.find().sort({time: 1}).limit(3).populate('user').lean(); // .lean() permet de transformer la liste de documents Mongo en objets javascript

            // Conversion du temps, initialement en millisecondes, en {minutes, seconds}
            games.map(game => {
                game.time = msToMS(game.time);
                return game;
            });

            // Réponse: la page 'home' est rendue avec pour contenu le tableau 'games'
            res.render('home', {games});

        } catch (error) {
            // Cas d'erreur. L'erreur est renvoyée dans la réponse
            console.error(error);
            res.status(500).json(error);
        }
    }
};

/**
 * Fonction de conversion des millisecondes en objet donnant les minutes et les secondes
 * @param {Number} ms 
 * @returns {Object}
 */
 function msToMS(ms) {
    // Conversion des millisecondes en secondes
    let seconds = ms / 1000;
    // Récupération des minutes
    const minutes = parseInt( seconds / 60 );
    // Récupération des secondes qui n'ont pas été converties en minutes
    seconds = seconds % 60;

    return {minutes, seconds: seconds.toFixed()}; // 'toFixed' permet, ici, de renvoyer un nombre entier
}