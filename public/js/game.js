let gameBoard = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14]
];

const gameArea = document.getElementById('gameArea');
const cards = document.getElementsByClassName('card');
const userPseudo = document.getElementById('pseudo').innerText;


let remainingTime = 1000 * 60 * 3;
let elapsedTime = 0;
let delay;

let previousCard;
let currentCard;
let cardPairsFound = 0;

generateGameBoard();
startTimer();

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', ($event) => {
        const hiddenCard = $event.currentTarget.getAttribute('data-hidden');
        if (hiddenCard === 'true' && !previousCard && !currentCard || hiddenCard === 'true' && !previousCard && currentCard || hiddenCard === 'true' && previousCard && !currentCard) {
            onClickCard($event);
        }
    });
}

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
    // gameBoard = board;
    gameBoard = [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14]
    ];;
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
    if (remainingTime === 0) {
        remainingTime = 1000 * 60 * 3;
        progress = 0;
    }
    if (remainingTime !== 0) {
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
    document.getElementById('alert-success').style.display = 'block';
    clearInterval(delay);
    const gameData = {
        user: {
            pseudo: userPseudo
        },
        game: {
            time: elapsedTime,
            cardPairsFound: cardPairsFound,
            success: true
        }
    };
    sendRequest('POST', '/game/save', gameData)
    .then(res => {
        console.log(res);

        // cardPairsFound = 0;
        // document.getElementById('cardPairsFound').innerText = cardPairsFound;
        // for (var i = 0; i < cards.length; i++) {
        //     flipCard(cards[i]);
        // }
    })
    .catch(console.error);
}

function loseGame() {
    alert('Vous avez perdu !');
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