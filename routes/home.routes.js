// Fichier de routes Home

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/home', homeController.getHomePage); // Route permettant d'afficher la page Home

module.exports = router;