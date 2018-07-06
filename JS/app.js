
/* Variables */

var missed = 0;
const startButton = document.querySelector('a.btn__reset');
var qwerty = document.getElementById("qwerty");


var phrases = [
    "Hello There",
    "Fancy meeting you here",
    "Show me the money",
    "You are beautiful",
    "So uncivilised"
];

/* create random number, get phrase to that position in array and split into parts */
function getRandomPhrase(array) {
  return array[Math.round(Math.random() * (array.length - 1))].split('');
}


function displayPhrase(array) {
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.textContent = array[i].toUpperCase();
    document.querySelector('ul').appendChild(li);
    
    if (array[i] != ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
}
   
/* show the letter if it matches in the phrase */
function verifyLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let match = null;
  
  for (let i = 0; i < letters.length; i++) {
    if (button.textContent.toUpperCase() == letters[i].textContent) {
      match = button.textContent;
      letters[i].classList.add('show');
    }
  }
  return match;
}

/* check score and display appropriate overlay screen */
function checkWin() {
  const shownLetters = document.querySelectorAll('.show');
  const letters = document.querySelectorAll('.letter');
  const overlay = document.querySelector('#overlay');
  
  if (shownLetters.length == letters.length) {
    overlay.classList.replace('start', 'win');
    overlay.children[0].textContent = 'You Won!';
    overlay.children[1].textContent = 'Play Again';
    overlay.style.display = '';
  } else if (missed === 5) {
    overlay.classList.replace('start', 'lose');
    overlay.children[0].textContent = 'You Lost!';
    overlay.children[1].textContent = 'Try Again';
    overlay.style.display = '';
  }
}

/* restart game after win or loss */
function replay() {
  location.reload();
}



/* Event listeners */

/* start game or reset game  */
startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start Game') {
    startButton.parentElement.style.display = 'none';
  } else {
    replay();
  }
});
    
/*  listen for keyboard letter clicked and update score */
qwerty.addEventListener('click', (event) => {
  const buttonClicked = event.target;
  
  if (event.target.tagName === 'BUTTON') {
    buttonClicked.className = 'chosen';
    buttonClicked.disabled = true;
    
    const letterFound = verifyLetter(buttonClicked);
    
    if (letterFound === null) {
      missed += 1;
    }
    
    if (missed >= 1 && missed <= 5) {
      const hearts = document.getElementsByTagName('img');
      hearts[missed - 1].src = 'images/lostHeart.png';
    }
  }
  checkWin();
});


/*Initiate Game */

const phraseArray = getRandomPhrase(phrases);
displayPhrase(phraseArray);