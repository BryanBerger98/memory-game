let gameBoard = [ // Plateau de jeu par défaut (14 paires de cartes)
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14]
];

const userPseudo = document.getElementById('pseudo').innerText; // Récupération du pseudo de l'utilisateur dans le titre
const gameArea = document.getElementById('gameArea'); // Élément HTML dont l'id est 'gameArea' | Zone de jeu
const alertSuccess = document.getElementById('alertSuccess'); // Élément HTML dont l'id est 'alertSuccess' | Message de réussite
const alertFail = document.getElementById('alertFail'); // Élément HTML dont l'id est 'alertFail' | Message d'échec
const restartButton = document.getElementById('restartButton'); // Élément HTML dont l'id est 'restartButton' | Bouton de remise à zéro
restartButton.addEventListener('click', restartGame); // On écoute l'événement 'click' sur le bouton de remise à zéro. Celui-ci déclanche la fonction 'restartGame'

let remainingTime = 1000 * 60 * 3; // Temps restant par défaut
let elapsedTime = 0; // Temps écoulé
let timer; // Horloge calculant le temps qui s'écoule

let previousCard; // Première carte sélectionnée
let currentCard; // Seconde carte sélectionné
let cardPairsFound = 0; // Nombre de paires de cartes trouvées
let gameOver = false; // Boolean indiquant si le jeu est terminé ou non

// Au chargement de la page, on génère un nouveau plateau de jeu et on lance l'horloge
generateGameBoard();
startTimer();

/**
 * Fonction déclenchée par un click sur une carte
 * @param {*} $event => permet de récupérer l'élément HTML correspondant à la carte
 */
function onClickCard($event) {
    let card = $event.currentTarget; // Carte sélectionnée
    flipCard(card); // On retourne la carte

    // S'il n'y a pas de première carte sélectionnée alors cela signifie qu'il s'agit de celle sur laquelle nous venons de cliquer
    if (!previousCard) { 
        previousCard = card;

    // Sinon, il s'agit de la seconde carte
    } else {
        currentCard = card;

        // Le numéro des cartes est stocké dans un attribut 'data-number'. Nous récupérons ces numéros pour vérifier s'il sont identiques
        const previousCardNumber = previousCard.getAttribute('data-number'); 
        const currentCardNumber = currentCard.getAttribute('data-number');

        // Si les numéros sont identiques alors on retourne 'true' (ce sont les mêmes), sinon 'false' (elles sont différentes)
        const match = previousCardNumber === currentCardNumber ? true : false;
        
        if (!match) { // Si les cartes sont différents

            // On laisse les cartes retournées pendant 2,5 secondes pour permettre au joueur de les mémoriser
            setTimeout(() => {
                // On masque les cartes
                flipCard(previousCard);
                flipCard(currentCard);
                // On remet les variables de sélection des cartes à zéro, on "désélectionne" les cartes
                previousCard = null;
                currentCard = null;
            }, 2500);
        
        } else { // Sinon (si les cartes sont identiques)
            // On incrémente la variable 'cardPairsFound' pour dire que le joueur a trouvé une nouvelle paire
            cardPairsFound++;
            // On met à jour l'affichage des paires trouvées dans le HTML
            document.getElementById('cardPairsFound').innerText = cardPairsFound;
            // On remet les variables de sélection des cartes à zéro, on "désélectionne" les cartes
            previousCard = null;
            currentCard = null;

            // Si le joueur a atteint les 14 paires trouvées (nombre de paires au total sur le plateau), le jeu est gagné !
            if (cardPairsFound === 14) {
                winGame();
            }
        }
    }
}

/**
 * Permet de retourner les cartes (d'un sens comme dans l'autre)
 * i. L'attribut 'data-hidden' appliqué sur les cartes permet de les définir comme masquées ou non dans le HTML. Cela facilite l'identification des cartes masquées ou dévoilées.
 * @param {*} card => Élément HTML correspondant à une carte
 */
function flipCard(card) {
    // Cache la carte
    if (card.style.transform == "rotateY(180deg)") {
        card.setAttribute('data-hidden', true);
        card.style.transform = "rotateY(0deg)";
    }
    // Dévoile la carte
    else {
        card.setAttribute('data-hidden', false);
        card.style.transform = "rotateY(180deg)";
    }
}

/**
 * Fonction de génération du plateau de jeu
 */
function generateGameBoard() {
    // Remise à zéro du contenu HTML de la zone de jeu
    gameArea.innerHTML = '';

    // Tableau initial des paires. On identifie les cartes par des nombres
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Boucle permettant de mélanger le tableau.
    for (let i = 0; i < values.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = values[i];
        values[i] = values[j];
        values[j] = temp;
    }

    // Le tableau est divisé en tronçons de 7 cartes pour faciliter l'affichage. (Comme on a 28 cartes, cela nous donne 4 tronçons de 7)
    const board = splitArray(values, 7);
    // Le tableau des paires est prêt. Nous l'appliquons au plateau de jeu.
    gameBoard = board;
    
    // Boucle permettant l'affichage du plateau et des cartes
    for (let i = 0; i < gameBoard.length; i++) {

        // Cette constante représente une ligne de 7 cartes
        const gameBoardLine = gameBoard[i];
        // 'htmlLine' est la <div> HTML dans laquelle nous disposons les 7 cartes
        const htmlLine = document.createElement('div');
        // Nous utilisons {display: flex} pour afficher les cartes côte à côte
        htmlLine.className = 'd-flex';
        // Nous appliquons la ligne à la zone de jeu
        gameArea.append(htmlLine);

        // Boucle (au sein d'une ligne) permettant d'afficher chaque carte sur la ligne.
        for (let j = 0; j < gameBoardLine.length; j++) {
            // Numéro de la carte
            const cardNumber = gameBoardLine[j];
            // Récupérations des propriété de la carte (sa couleur, son icône) selon son numéro
            const cardProperties = this.getCardProperties(cardNumber);
    
            // --- BLOCK CARTE ---
            const card = document.createElement('div');
            card.setAttribute('data-number', cardNumber); // L'attribut 'data-number' donne le numéro de la carte à la balise HTML
            card.setAttribute('data-hidden', true); // L'attribut 'data-hidden' indique sur la balise si la carte est masquée ou non
            card.classList = 'card'; // La class CSS 'card' applique des propriétés de style à la carte (voir game.css)
    
            // --- AVANT DE LA CARTE (Face dévoilée) ---
            const cardFront = document.createElement('div');
            cardFront.classList = 'd-flex front'; // La class CSS 'front' applique des propriétés de style à l'avant carte (voir game.css)
            cardFront.style.background = cardProperties.color; // La couleur issue des propriétés récupérées plus tôt est appliquée
            const cardFrontIcon = document.createElement('i'); // Un élément HTML 'i' (icon) est créé pour insérer l'icône
            cardFrontIcon.classList = ` ${cardProperties.icon} m-auto text-white`; // L'icône issue des propriétés récupérées plus tôt est appliquée
            cardFrontIcon.style.fontSize = '50px';
            cardFront.append(cardFrontIcon); // On intègre l'icône à l'avant de la carte
            card.append(cardFront); // L'avant de la carte est intégré à la carte elle-même
    
            // --- ARRIÈRE DE LA CARTE (Face cachée) ---
            const cardBack = document.createElement('div');
            cardBack.classList = 'd-flex bg-dark back'; // La class CSS 'back' applique des propriétés de style à l'arrière carte (voir game.css)
            const cardBackIcon = document.createElement('i'); // Un élément HTML 'i' (icon) est créé pour insérer ajouter une icône sur la face arrière de la carte (un peu comme une marque)
            cardBackIcon.classList = 'fas fa-code m-auto text-white'; // Les class CSS de l'icône en question sont 'fas fa-code'
            cardBack.append(cardBackIcon); // On intègre l'icône à l'arrière de la carte
            card.append(cardBack); // L'arrière de la carte est intégré à la carte elle-même
    
            htmlLine.append(card); // La carte est intégrée à la ligne
        }
    }

    // Tous les éléments HTML disposant de la class 'card' sont appelés ici (cela nous permettra d'être en écoute sur l'événement 'click' sur chacun d'entre eux)
    const cards = document.getElementsByClassName('card');

    // Comme 'cards' est un tableau, nous faisons une boucle pour "écouter" chacun des éléments de ce tableau
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', ($event) => { // On ajoute un écouteur d'événement 'click'
            // On récupère l'état de divulgation de la carte d'après son attribut HTML 'data-hidden'
            const hiddenCard = $event.currentTarget.getAttribute('data-hidden');

            // Si le jeu n'est pas terminé, on peut cliquer sur la carte
            if (!gameOver) {
                // Si la carte est cachée, nous pouvons cliquer dessus (inutile de cliquer sur une carte déjà retournée)
                if (hiddenCard === 'true') {
                    // Si la carte sur laquelle nous venons de cliquer n'est pas déjà sélectionnée et qu'il manque une carte à sélectionner, nous pouvons cliquer dessus
                    if (!previousCard && !currentCard || !previousCard && currentCard || previousCard && !currentCard) {
                        onClickCard($event);
                    }
                }
            }
        });
    }
}

/**
 * Fonction permettant de créer des tronçons d'un tableau
 * @param {Array} myArray tableau à diviser en tronçons
 * @param {Number} chunkSize Taille des tronçons
 * @returns {Array} splittedArray => Tableau contenant les tronçons
 */
function splitArray(myArray, chunkSize){
    const arrayLength = myArray.length;
    const splittedArray = [];
    
    for (let i = 0; i < arrayLength; i += chunkSize) {
        myChunk = myArray.slice(i, i+chunkSize);
        splittedArray.push(myChunk);
    }
    return splittedArray;
}


/**
 * Fonction permettant de démarrer l'horloge
 * i. La fonction 'setInterval' permet d'éxécuter le code qu'elle contient à chaque interval de temps défini. Ici, toutes les 10 millisecondes (ms).
 * Pourquoi 10 ms ? Pour donner un aspect "fluide" à la barre de progression affichée sur la vue. Plus la fréquence de mise à jour de la barre de progression est élevée, moins son évolution aura l'air sacadé.
 * i. 'setInterval' est placé dans une variable 'timer'. Cette variable contient l'identifiant du 'setInterval' ce qui nous permettra de l'arrêter (l'horloge) par la suite.
 */
function startTimer() {
    timer = setInterval(() => {

        // Si le temps écoulé atteint le temps maximum défini, la partie est perdue
        if (elapsedTime === remainingTime) {

            // Arrêt de l'horloge
            clearInterval(timer);
            // Appel de la fonction indiquant la perte du jeu
            loseGame();
            return; // Le return permet de mettre fin à l'éxécution de la fonction en cours sans passer à la suite.
        }

        // Si le temps écoulé n'a pas atteint le temps maximum défni

        // On ajoute 10 ms au temps écoulé
        elapsedTime += 10;
        // Calcul du temps écoulé en pourcentage
        const progressPercentage = (elapsedTime / remainingTime) * 100;
        // Mise à jour de la barre de progression dans le HTML
        document.getElementById('bar').style.width = `${progressPercentage}%`;
    }, 10);
}

/**
 * Permet de récupérer, d'après le numéro de la carte passé en argument, l'icône et la couleur à afficher sur la carte en question
 * @param {Number} value 
 * @returns {Object} iconProperties => Contient l'icône et la couleur à afficher sur la carte
 */
function getCardProperties(value) {
    let iconProperties = {
        icon: '',
        color: ''
    }
    switch (value) {
        case 1:
            iconProperties = {
                icon: 'fab fa-angular',
                color: '#b52e31'
            };
            break;
        case 2:
            iconProperties = {
                icon: 'fab fa-css3-alt',
                color: '#2965f1'
            };
            break;
        case 3:
            iconProperties = {
                icon: 'fab fa-git-alt',
                color: '#fc6d26'
            };
            break;
        case 4:
            iconProperties = {
                icon: 'fab fa-html5',
                color: '#F16529'
            };
            break;
        case 5:
            iconProperties = {
                icon: 'fab fa-java',
                color: '#5382a1'
            };
            break;
        case 6:
            iconProperties = {
                icon: 'fab fa-js',
                color: '#f7df1e'
            };
            break;
        case 7:
            iconProperties = {
                icon: 'fab fa-node-js',
                color: '#6cc24a'
            };
            break;
        case 8:
            iconProperties = {
                icon: 'fab fa-npm',
                color: '#cb3837'
            };
            break;
        case 9:
            iconProperties = {
                icon: 'fab fa-python',
                color: '#ffde57'
            };
            break;
        case 10:
            iconProperties = {
                icon: 'fab fa-react',
                color: '#00d8ff'
            };
            break;
        case 11:
            iconProperties = {
                icon: 'fab fa-vuejs',
                color: '#42b883'
            };
            break;
        case 12:
            iconProperties = {
                icon: 'fab fa-sass',
                color: '#CD6799'
            };
            break;
        case 13:
            iconProperties = {
                icon: 'fab fa-wordpress',
                color: '#0087be'
            };
            break;
        case 14:
            iconProperties = {
                icon: 'fab fa-php',
                color: '#8892be'
            };
            break;
        default:
            console.log('Image assignment: Invalid value');
            break;
    }
    return iconProperties;
}

/**
 * Fonction exécutant le processus de gain du jeu
 */
function winGame() {
    // Arrêt de l'horloge
    clearInterval(timer);

    // Fin du jeu
    gameOver = true;

    // Récupération du temps écoulé pendant le jeu sous la forme {minutes, seconds} pour l'affichage
    const time = msToMS(elapsedTime);

    // Création de l'objet 'gameData' à envoyer au backend pour enregistrement en base de données
    const gameData = {
        user: {
            pseudo: userPseudo
        },
        game: {
            time: elapsedTime,
            card_pairs_found: cardPairsFound,
            success: true
        }
    };

    // Envoi d'une requête POST permettant l'enregistrement des données du jeu
    sendRequest('POST', '/game/save', gameData)
    .then(res => {
        // Affichage du message de réussite et du bouton permettant de relancer le jeu
        alertSuccess.innerText = `Vous avez gagné en ${time.minutes ? time.minutes + 'minutes et' : ''} ${time.seconds} secondes !`;
        alertSuccess.style.display = 'block';
        restartButton.style.display = 'block';
    })
    .catch(console.error);
}

/**
 * Fonction permettant d'exécuter le processus de perte du jeu
 */
function loseGame() {
    // Arrêt de l'horloge
    clearInterval(timer);

    // Fin du jeu
    gameOver = true
    
    // Création de l'objet 'gameData' à envoyer au backend pour enregistrement en base de données
    const gameData = {
        user: {
            pseudo: userPseudo
        },
        game: {
            time: elapsedTime,
            card_pairs_found: cardPairsFound,
            success: false
        }
    };

    // Envoi d'une requête POST permettant l'enregistrement des données du jeu
    sendRequest('POST', '/game/save', gameData)
    .then(res => {

        // Affichage du message d'échec et du bouton permettant de relancer le jeu
        alertFail.style.display = 'block';
        restartButton.style.display = 'block';
    })
    .catch(console.error);
}

/**
 * Fonction permettant d'envoyer une requête HTTP à l'API backend (notamment pour enregistrer les informations du jeu en base de données)
 * @param {String} method // Méthode de la requête: GET | POST 
 * @param {String} path // URL de l'API à appeler
 * @param {Object} body // Corps de la requête, données à envoyer
 * @returns {Promise} // La fonction est une Promise. Cela permet de gérer l'exécution de la requête de manière asynchrone. Voir: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
function sendRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open(method, path, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() { // En écoute sur les changement d'état de la requête (en cours, terminé, etc.)
            
            // Si le 'readyState' est à 4, cela signifi que la requête est achevée

            // 'status' = 200: Tout s'est bien passé, nous pouvons récupérer la réponse
            if(http.readyState == 4 && http.status == 200) {
                resolve(http.response);
            }

            // 'status' = 500: Il y a eu une erreur !
            if (http.readyState === 4 && http.status === 500) {
                reject(http.response);
            }
        }
        http.send(JSON.stringify(body)); // Envoi de la requête contenant les données à transmettre au back sous la forme d'un objet JSON "stringifié" (transformé en chaîne de caractères)
    });
}

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

/**
 * Fonction de remise à zéro du jeu
 */
function restartGame() {
    // Le jeu n'est plus terminé
    gameOver = false;
    // Le temps écoulé est remis à zéro
    elapsedTime = 0;
    // Les paires trouvées sont remises à zéro
    cardPairsFound = 0;

    // Les messages de réussite ou d'échec ainsi que le bouton de "restart" sont masqués
    alertSuccess.style.display = 'none';
    alertFail.style.display = 'none';
    restartButton.style.display = 'none';

    // Un nouveau plateau est généré
    generateGameBoard();
    // L'horloge redémarre
    startTimer();
}

