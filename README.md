# Memory Game

Technologies principales utilisées:
- MongoDB (Hébergement sur Mongo Atlas)
- NodeJS

## Installation

Cloner le projet:
```bash
git clone git@github.com:BryanBerger98/memory-game.git
```
Se rendre dans le projet
```bash
cd memory-game
```
Installer les dépendences
```bash
npm install
```
Configurer les variables d'environnement dans le fichier `.env`:
```dosini
PORT= #PORT OF NODE JS APPLICATION
MONGODB_URI= #URI OF YOUR MONGO DB SERVER
```
Démarrer le serveur:
```bash
node index.js
```

## Documentation

### Dépendences

Liste des dépendences utilisées:
- **express**: Framework Node JS. Gestion du serveur et des routes de l'API.
- **cors**: Gestion de la politique de CORS.
- **dotenv**: Gestion des variables d'environnement.
- **express-handlebars**: Moteur de vues. Gère l'affichage des vues HTML et le contenu conditionnel et dynamique.
- **fontawesome**: Librairie d'icônes.
- **mongoose**: Librairie ODM. Gère la communication avec MongoDB.

### Architecture

L'architecture de l'application est en MVC.

- **models**: Contient les modèles de données. C'est à dire la structure des éléments à enregistrer en base de données. Permet de communiquer avec cette dernière.
- **views**: Contient les vues HTML
- **controllers**: Contient la logique backend des différentes parties de l'application.
- **routes**: Contient les routes de l'API backend
- **public**: Contient les ressources frontend (HTML, CSS, images)
- **helpers**: Contient des éléments de configuration spécifiques (comme des helpers Handlebars personnalisés)