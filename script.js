'use strict';
//  This is another way to select element by id
// const score0El = document.getElementById('score--0');
// const score1El = document.getElementById('score--1');

// if we want to select an id by querySelector we have to use the # simple

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions Variables
let scores;
let currentScore;
let activePlayer;
let playing;

// Starting Conditions function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// Running the starting Conditions function
init();
// Switch player with background style function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle() 	Toggles between tokens in the list ('player--active').
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 Disply dice
    diceEl.classList.remove('hidden');
    // this is how we manipulate the src by javascript to choose which image to display
    diceEl.src = `dice-${dice}.png`;

    //3 Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Pressing Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //  1. Add current score to active player's score
    // so here we used the array to target the current player by index
    // scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

//  New Game Button
btnNew.addEventListener('click', init);
