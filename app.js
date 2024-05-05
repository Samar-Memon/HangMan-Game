const wordList = [
    {
        word: 'painting',
        hint: 'It is an artistic thing'
    },
    {
        word: 'car',
        hint: 'A powered Vehicle with four Tyres'
    },
    {
        word: 'bike',
        hint: 'A powered Vehicle with two Tyres'
    },
    {
        word: 'rikshaw',
        hint: 'A powered Vehicle with three Tyres'
    },
    {
        word: 'bicycle',
        hint: 'A human-powered Vehicle with two Tyres'
    },
    {
        word: 'saylani',
        hint: 'Pakistani famous Walfare trust'
    },
    {
        word: 'mountain',
        hint: 'A large natural elevation of the Earth surface'
    },
    {
        word: 'piano',
        hint: 'A musical instrument with Buttons'
    },
    {
        word: 'biryani',
        hint: 'Pakistani famous food'
    },
    {
        word: 'pakola',
        hint: 'Pakistani famous ColdDrink brand'
    },
    {
        word: 'camera',
        hint: 'A device used to capture and record images or videos'
    },
    {
        word: 'coffee',
        hint: 'A popular caffeinated beverge made from roasted coffee beans'
    },
    {
        word: 'sunset',
        hint: 'The daily disappearance of the Sun below the horizon'
    },
    {
        word: 'diesel',
        hint: 'The most Important thing of every Vehicle'
    },
    {
        word: 'diamond',
        hint: 'A precious gemstone known for its brilliance and hardness'
    },
];


const clickMp3 = new Audio('click.mp3');
const oopsMp3 = new Audio('oops.mp3');
const winMp3 = new Audio('winning.mp3');

const keyBoard = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');
const guessesText = document.querySelector('.guesses-text b');
const hangmanImage = document.querySelector('.hangman-box img');
const playAgain = document.querySelectorAll('.play-again');


let currentWord, correctLetters = [], wrongGuess = 0;
let extraLetter,extraIndex;

const maxGuess = 6;

const images = ['images/hangman-0.svg', 'images/hangman-1.svg', 'images/hangman-2.svg','images/hangman-3.svg', 'images/hangman-4.svg','images/hangman-5.svg', 'images/hangman-6.svg',];


const randomWord = () => {
    const randomListOfObject = wordList[Math.floor(Math.random() * wordList.length)];

    currentWord = randomListOfObject.word;

    document.querySelector('.hint-text b').innerText = randomListOfObject.hint;

    wordDisplay.innerHTML = randomListOfObject.word.split('').map(() => `<li class="letter"></li>`).join('');

}
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                extraLetter = letter;
                extraIndex = index;
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        });
    }else{
        wrongGuess++;
        hangmanImage.src = images[wrongGuess];
        guessesText.innerHTML = `${wrongGuess} / 6`;
        if(wrongGuess === maxGuess){
            function displayGameOver() {
            document.querySelector('.game-model').style.display = 'flex';
            document.querySelector('.game-model .content b').innerText = `${currentWord}`
            oopsMp3.play()
            }
            setTimeout(displayGameOver, 500)
        }
    }
    button.addEventListener('click', clickMp3.play())
    button.disabled = true;
    button.style.background = '#5e62ba8b';
    button.style.cursor = 'no-drop';

    if(correctLetters.length === currentWord.length){
        document.querySelector('.game-win').style.display = 'flex';
        document.querySelector('.game-win .content b').innerText = `${currentWord}`
        winMp3.play()
    }

}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyBoard.appendChild(button);
    button.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)))
};

function againGame() {
    location.reload();
}

playAgain.forEach(e => {
    e.addEventListener('click', againGame)
})

randomWord();