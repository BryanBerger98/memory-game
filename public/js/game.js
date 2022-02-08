const gameBoard = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14]
];

const gameArea = document.getElementById('gameArea');

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
        card.classList = 'm-1 card';

        // Front of the card
        const cardFront = document.createElement('div');
        cardFront.classList = 'd-flex front rounded';
        cardFront.style.background = cardProperties.color;
        const cardFrontIcon = document.createElement('i');
        cardFrontIcon.classList = ` ${cardProperties.icon} m-auto text-white`;
        cardFrontIcon.style.fontSize = '50px';
        cardFront.append(cardFrontIcon);
        card.append(cardFront);

        // Back of the card
        const cardBack = document.createElement('div');
        cardBack.classList = 'd-flex bg-dark back rounded';
        const cardBackIcon = document.createElement('i');
        cardBackIcon.classList = 'fas fa-code m-auto text-white';
        cardBack.append(cardBackIcon);
        card.append(cardBack);

        htmlLine.append(card);
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

const cards = document.getElementsByClassName('card');

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', ($event) => {
        const hiddenCard = $event.currentTarget.getAttribute('data-hidden');
        if (hiddenCard === 'true' && !previousCard && !currentCard || hiddenCard === 'true' && !previousCard && currentCard || hiddenCard === 'true' && previousCard && !currentCard) {
            onClickCard($event);
        }
    });
}

let previousCard;
let currentCard;
let cardPairsFound = 0;

function onClickCard($event) {
    let card = $event.currentTarget;
    flipCard(card);
    if (!previousCard) {
        previousCard = card;
    } else {
        currentCard = card;
        const match = verifyCards(previousCard.getAttribute('data-number'), currentCard.getAttribute('data-number'));
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

function verifyCards(aCard, bCard) {
    if (aCard === bCard) {
        return true;
    }
    return false;
};

function winGame() {
    if (confirm('Vous avez gagné ! Recommencer ?')) {
        cardPairsFound = 0;
        document.getElementById('cardPairsFound').innerText = cardPairsFound;
        for (var i = 0; i < cards.length; i++) {
            // cards[i].setAttribute('data-hidden', true);
            flipCard(cards[i]);
        }
    }
}

function loseGame() {

}