// Importation des dépendances
const http = require('http');
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Récupération des variables d'environnement
const { PORT, MONGODB_URI } = process.env;

// Importation des routes de l'API
const homeRoutes = require('./routes/home.routes');
const gameRoutes = require('./routes/game.routes');

// Initialisation du serveur
const app = express();
const server = http.createServer(app);

// Autorisation CORS. Voir: https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
app.use(cors());

// Mise en place du body parser (permet de déchiffrer le contenu du corps des requêtes)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Initialisation de express-handlebars (le moteur de vues)
app.engine('hbs', expressHbs.engine({
    defaultLayout: 'main', // Fichier 'racine' des vues
    extname: '.hbs', // Extension des fichiers
    layoutsDir: path.join(__dirname, 'views/layouts'), // Chemain d'accès aux fichiers de mise en page
    helpers: require('./helpers/handlebars.helpers') // Helpers (voir documentation de Handlebars)
}));

// Indication au serveur que le moteur de vue est bien 'hbs' (Handlebars)
app.set('view engine', 'hbs');
// Indication au serveur que le dossier où se trouvent les vues s'appelle 'views'
app.set('views', 'views');

// Dossiers à envoyer côté frontend. Le dossier 'fontawesome' qui contient toutes les icônes et le dossier 'public' qui contient le CSS et le JavaScript du frontend.
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-pro/js')));
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des routes de l'API importées plus haut
app.use(homeRoutes);
app.use(gameRoutes);

// Route par défaut => /home
app.use('/', (req, res) => {
    res.redirect('/home');
});


// Connexion à MongoDB
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(error => {
    console.error(error);
    process.exit(1);
})

// Démarrage du serveur
server.listen(PORT, () => {
    console.log(`NodeJS server started on port ${PORT}`);
});