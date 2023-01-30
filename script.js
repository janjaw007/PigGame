'use strict';

//select score Element
//select score by getElemntById only the name
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// current score by player
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Select dice Element
const diceEl = document.querySelector('.dice');

//Select Player Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//select btn Element
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//function

//Change current score text function
const selectCurrentScoreText = function (score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};

//Remove palyer active function
const removePlayerWinner = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};

//Switch player fucntion
const switchPlayer = function () {
  //Change current score previous palyer to 0
  selectCurrentScoreText(0);
  currentScore = 0;
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //visual changes (background)
  //check player--1 contain active ?
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  //===== Staring condition =======

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

  //======= end of staring condition=======
};
//-----------------------------------------
//====== implement game logic ========
init();

//click roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate a random roll function
    const dice = Math.trunc(Math.random() * 6 + 1);
    // console.log(dice);
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //*Check* for rolled 1: if true, switch to next palyer
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      //display current score to player
      // current0El.textContent = currentScore; // ** CHANGE LATER **
      selectCurrentScoreText(currentScore);
    } else {
      switchPlayer();
    }
  }
});

//Click hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to total(BIG one)
    scores[activePlayer] += currentScore;
    //Change BIG score on current player on page
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //*Check* scores >= 100 ? Win The game : switch player
    if (scores[activePlayer] >= 100) {
      //WIN the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //Remove the dice picure
      diceEl.classList.add('hidden');

      //
    } else {
      switchPlayer();
    }
  }
});

//Click New game
btnNew.addEventListener('click', init);
