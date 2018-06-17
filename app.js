// GAME VALUES
let min = 1, // change for different MIN value
	max = 10, // change for different MAX value
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// UI ELEMENTS
const game = document.getElementById('game'),
	  minNum = document.querySelector('.min-num'),
	  maxNum = document.querySelector('.max-num');
	  guessBtn = document.getElementById('guess-btn'),
	  guessInput = document.getElementById('guess-input'),
	  message = document.querySelector('.message'),

// ASSIGN UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// BUTTON LISTENER
guessBtn.addEventListener('click', playGame)

// MAIN GAME
function playGame(){
// VALIDATE
	let guess = Number(guessInput.value);
	if(isNaN(guess) || guess < min || guess > max){
		return setMessage(`Please enter a number between ${min} and ${max}`, "red");
	}

// CHECK IF WON
	if(guess === winningNum){ // ON RIGHT GUESS
		gameOver(true, `${guess} is correct!`)
	} else if (guessesLeft > 1){ // ON A WRONG GUESS
		guessesLeft--;
		guessInput.style.borderColor = "red";
		setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`, "red");
		guessInput.value = '';
	} else { // ON A WRONG GUESS, WHEN THERE IS NO CHANCES LEFT
		gameOver(false, `Game over, you lost! The correct answer is ${winningNum}`)
	}
}

// SET MESSAGE
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}

// ON GAME OVER
function gameOver(won, msg) {
	let color;
	(won === true) ? color = "green" : color = "red" 
	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	setMessage(msg, color);	
	playAgain();
}

// CREATE PLAY AGAIN BUTTON
function playAgain(){
	guessBtn.value = "Play Again!";
	guessBtn.addEventListener('click', function(e){
	    window.location.reload();
	});
}

// GETTIN WINNING NUMBER
function getRandomNum(min, max){
	return Math.floor(Math.random() * (max-min + 1) + min);
}
