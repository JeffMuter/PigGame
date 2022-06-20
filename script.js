'use strict';

//Selectors for Elements
const playerElem0 = document.querySelector('.player--0');
const playerElem1 = document.querySelector('.player--1');
const scoreElem0 = document.querySelector('#score--0');
const scoreElem1 = document.querySelector('#score--1');
const currentElem0 = document.querySelector('#current--0');
const currentElem1 = document.querySelector('#current--1');

const diceElem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold');

scoreElem0.textContent = 0;
scoreElem1.textContent = 0;
diceElem.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerElem0.classList.toggle('player--active');
    playerElem1.classList.toggle('player--active');
}

const playerSelector = document.querySelector(`.player--${activePlayer}`);

//Dice roll functionality, broken into 3 steps.
btnRoll.addEventListener('click', function () {
    if (playing) {
    // 1. generate random dice 
        const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
        diceElem.classList.remove('hidden');
        diceElem.src = `dice-${dice}.png`;
    // 3a. check if rolling a 1, if yes, add score to currentScore of activePlayer, or switch player
        if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
    //3b. switch player & reset scores & determine active player
            switchPlayer();
        }
    }
})

//hold score button is pressed, broken into steps
btnHold.addEventListener('click', function() {
    if (playing) {
        //1. add currentScore to active player's total score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. check if score is @100 & if true, finish game, if false, switch player
        if (scores[activePlayer] >= 5) {
            playing = false;
            diceElem.classList.add('hidden');
            playerSelector.classList.add('player--winner');
            playerSelector.classList.remove('player--active');
        } else {
        switchPlayer();
        }
    }
})

//new game button functionality
btnNew.addEventListener('click', function() {
    playerSelector.classList.remove('player--winner');
    playing = true;
    scoreElem0.textContent = 0;
    scoreElem1.textContent = 0;
    currentElem0.textContent = 0;
    currentElem1.textContent = 0;
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    playerElem0.classList.remove('player--active');
    playerElem1.classList.remove('player--active')
    playerElem0.classList.add('player--active');
})