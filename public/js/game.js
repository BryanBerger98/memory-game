let gameBoard = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14]
];

const userPseudo = document.getElementById('pseudo').innerText;
const gameArea = document.getElementById('gameArea');
const alertSuccess = document.getElementById('alertSuccess');
const alertFail = document.getElementById('alertFail');
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

let remainingTime = 1000 * 60 * 3;
let elapsedTime = 0;
let delay;

let previousCard;
let currentCard;
let cardPairsFound = 0;
let gameOver = false;

generateGameBoard();
startTimer();



function onClickCard($event) {
    let card = $event.currentTarget;
    flipCard(card);
    if (!previousCard) {
        previousCard = card;
    } else {
        currentCard = card;
        const match = previousCard.getAttribute('data-number') === currentCard.getAttribute('data-number') ? true : false;
        if (!match) {
            setTimeout(() => {
                flipCard(previousCard);
                flipCard(currentCard);
                previousCard = null;
                currentCard = null;
            }, 2500);
        } else {
            cardPairsFound++;
            document.getElementById('cardPairsFound').innerText = cardPairsFound;
            previousCard = null;
            currentCard = null;
            if (cardPairsFound === 14) {
                winGame();
            }
        }
    }
}

function flipCard(card) {
    if (card.style.transform == "rotateY(180deg)") { // HIDE
        card.setAttribute('data-hidden', true);
        card.style.transform = "rotateY(0deg)";
    }
    else { // SHOW
        card.setAttribute('data-hidden', false);
        card.style.transform = "rotateY(180deg)";
    }
}

function generateGameBoard() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    for (let i = 0; i < values.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = values[i];
        values[i] = values[j];
        values[j] = temp;
    }
    const board = splitArray(values, 7);
    gameBoard = board;
    gameArea.innerHTML = '';
    for (let i = 0; i < gameBoard.length; i++) {
        const gameBoardLine = gameBoard[i];
        const htmlLine = document.createElement('div');
        htmlLine.className = 'd-flex'
        gameArea.append(htmlLine);
        for (let j = 0; j < gameBoardLine.length; j++) {
            const cardNumber = gameBoardLine[j];
            const cardProperties = this.getCardProperties(cardNumber);
    
            // Card
            const card = document.createElement('div');
            card.setAttribute('data-number', cardNumber);
            card.setAttribute('data-hidden', true);
            card.classList = 'card';
    
            // Front of the card
            const cardFront = document.createElement('div');
            cardFront.classList = 'd-flex front';
            cardFront.style.background = cardProperties.color;
            const cardFrontIcon = document.createElement('i');
            cardFrontIcon.classList = ` ${cardProperties.icon} m-auto text-white`;
            cardFrontIcon.style.fontSize = '50px';
            cardFront.append(cardFrontIcon);
            card.append(cardFront);
    
            // Back of the card
            const cardBack = document.createElement('div');
            cardBack.classList = 'd-flex bg-dark back';
            const cardBackIcon = document.createElement('i');
            cardBackIcon.classList = 'fas fa-code m-auto text-white';
            cardBack.append(cardBackIcon);
            card.append(cardBack);
    
            htmlLine.append(card);
        }
    }
    const cards = document.getElementsByClassName('card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', ($event) => {
            const hiddenCard = $event.currentTarget.getAttribute('data-hidden');
            if (!gameOver) {
                if (hiddenCard === 'true' && !previousCard && !currentCard || hiddenCard === 'true' && !previousCard && currentCard || hiddenCard === 'true' && previousCard && !currentCard) {
                    onClickCard($event);
                }
            }
        });
    }
}

function splitArray(myArray, chunkSize){
    const arrayLength = myArray.length;
    const tempArray = [];
    
    for (let i = 0; i < arrayLength; i += chunkSize) {
        myChunk = myArray.slice(i, i+chunkSize);
        tempArray.push(myChunk);
    }
    return tempArray;
}

function startTimer() {
    delay = setInterval(() => {
        if (elapsedTime === remainingTime) {
            clearInterval(delay);
            loseGame();
            return;
        }
        elapsedTime += 10;
        const progressPercentage = (elapsedTime / remainingTime) * 100;
        document.getElementById('bar').style.width = `${progressPercentage}%`;
    }, 10);
}

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

function winGame() {
    clearInterval(delay);
    gameOver = true;
    const time = msToMS(elapsedTime);
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
    sendRequest('POST', '/game/save', gameData)
    .then(res => {
        alertSuccess.innerText = `Vous avez gagné en ${time.minutes ? time.minutes + 'minutes et' : ''} ${time.seconds} secondes !`;
        alertSuccess.style.display = 'block';
        restartButton.style.display = 'block';
    })
    .catch(console.error);
}

function loseGame() {
    clearInterval(delay);
    gameOver = true
    const time = msToMS(elapsedTime);
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
    sendRequest('POST', '/game/save', gameData)
    .then(res => {
        alertFail.style.display = 'block';
        restartButton.style.display = 'block';
    })
    .catch(console.error);
}

function sendRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open(method, path, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                resolve(http.response);
            }
            if (http.readyState === 4 && http.status === 500) {
                reject(http.response);
            }
        }
        http.send(JSON.stringify(body));
    });
}

function msToMS(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 3- Extract minutes:
    const minutes = parseInt( seconds / 60 );
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return {minutes, seconds};
}

function restartGame() {
    gameOver = false;
    elapsedTime = 0;
    cardPairsFound = 0;
    alertSuccess.style.display = 'none';
    alertFail.style.display = 'none';
    restartButton.style.display = 'none';
    generateGameBoard();
    startTimer();
}

