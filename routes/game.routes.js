// Fichier de routes Game

const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');

router.post('/game', gameController.launchGame); // Router pemettant de lancer le jeu
router.post('/game/save', gameController.saveGame); // Route permettant de sauvegarder une partie

module.exports = router;