// Daniel Gould
// A game to familiarize yourself with
// the different temperature systems
const input = document.querySelector('.guess-input');
const submit = document.querySelector('.guess-button');
const givenOm = document.querySelector('.given');

// guess validation
const guessInput = document.querySelector('.guess-input');
guessInput.addEventListener('input', function validateGuessInput() {
  const maxLength = 3;
  if (this.value.length > this.maxLength) {
    this.value = this.value.slice(0, maxLength);
  }
});

const incrementors = document.querySelectorAll('.increment');
incrementors.forEach(incrementor => {
  incrementor.addEventListener('click', function increment() {
    let incrementorValue = parseInt(incrementor.innerHTML);
    let guessValue = parseInt(guessInput.value) || 0;
    guessInput.value = guessValue + incrementorValue;
  })
});

// scorekeeping
const streak = document.querySelector('#streak');
const best = document.querySelector('#best');
let streakScore = 0;
let bestScore = window.localStorage.getItem('best') || 0;
best.innerHTML = bestScore;

function incrementStreak () {
  streakScore += 1;
  streak.innerHTML = streakScore;
  console.log(bestScore);
  if (streakScore > bestScore) {
    bestScore = streakScore;
    window.localStorage.setItem('best', bestScore);
    best.innerHTML = bestScore;
  }
  console.log(best);
}

function endStreak () {
  streakScore = 0;
  streak.innerHTML = streakScore;
}



let given = randTemp("C") // degC
givenOm.innerHTML = given;
let state = 0; // no guess

function randTemp(scale) {
  if (scale === "C") {
    return Math.floor(Math.random() * 75 - 32);
  }
}

function degreeDifference (given, conversionFn, guess) {
  return -(given - conversionFn(guess));
}


function cToF (c) {
  return c * 9/5 + 32;
}

function fToC (f) {
  return (f - 32) * 5/9;
}


// results
var count = 0;
function cycleState() {
  const feedback = document.querySelector('.feedback');
  if (count === 0) {
    feedback.innerHTML = evaluateGuess();
    submit.innerHTML = "try again";
    count += 1;
  } else {
    feedback.innerHTML = "guess the temp!";
    input.value = '';
    submit.innerHTML = "guess";
    count -= 1;
    given = randTemp("C");
    givenOm.innerHTML = `${given}`;
  }
}

function evaluateGuess() {
  const guess = input.value;
  // * 10 / 10 for XX.X formatting
  const convertedGuess = Math.round(fToC(guess) * 10)/10;
  const convertedGiven = Math.round(cToF(given) * 10)/10;
  const distance = Math.abs(Math.round(guess-convertedGiven));
  let evalString;
  if (distance < 2) {
    evalString = `spot on! ${given}&deg;C = ${convertedGiven}&deg;F`;
    incrementStreak();
  } else if (distance < 10) {
    evalString = `close. ${given}&deg;C = ${convertedGiven}&deg;F`;
    endStreak();
  } else {
    evalString = `keep trying. ${given}&deg;C = ${convertedGiven}&deg;F`;
    endStreak();
  }

  return evalString;
}

input.addEventListener('keyup', key => {
  if (key.keyCode === 13) cycleState()
});
submit.addEventListener('click', cycleState);



