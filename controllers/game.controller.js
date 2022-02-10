// Importation des models
const userModel = require('../models/user.model');
const gameModel = require('../models/game.model');

module.exports = {
    /**
     * Affiche la page game avec le pseudo de l'utilisateur
     * @param {*} req Requête HTTP
     * @param {*} res Réponse HTTP
     */
    launchGame: (req, res) => {
        const pseudo = req.body.pseudo;
        res.render('game', {pseudo});
    },
    /**
     * Enregistre la partie en base de données
     * @async Fonction asynchrone
     * @param {*} req Requête HTTP
     * @param {*} res Réponse HTTP
     */
    saveGame: async (req, res) => {
        try {
            // Récupération de l'objet 'user' dans le corps de la requête
            const user = req.body.user;

            // Enregistrement de l'utilisateur en base de données.
            // Nous utilisons findOneAndUpdate pour mettre à jour un utilisateur existant ou créer un utilisateur non existant
            // findOneAndUpdate({filtre}, {objet à mettre à jour}, {options})
            // Dans les options 'upsert' permet de créer une nouvelle entrée si l'utilisateur à mettre à jour n'existe pas.
            // Dans les options 'new' permet de renvoyer en sortie l'utilisateur mis à jour ou nouvellement créé.
            const newUser = await userModel.findOneAndUpdate({pseudo: user.pseudo}, {...user}, {upsert: true, new: true});

            // Récupération de l'objet 'game' dans le corps de la requête et intégration de l'id utilisateur pour lier la partie à l'utilisateur associé.
            const game = new gameModel({...req.body.game, user: newUser._id});
            // Enregistrement de la partie en base de données
            const newGame = await game.save();

            // Réponse
            res.status(200).json({user: newUser, game: newGame});  
               
        } catch (error) {
            // Cas d'erreur. L'erreur est renvoyée dans la réponse
            console.error(error);
            res.status(500).json(error);
        }        
    }
};