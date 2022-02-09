const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');

router.get('/game', gameController.getGamePage);
router.post('/game', gameController.launchGame);
router.post('/game/save', gameController.saveGame);

module.exports = router;