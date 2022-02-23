(function(){
var container1 = document.getElementById('player1');
var container2 = document.getElementById('player2');
var dotPlayer1 = document.getElementById('dotPlayer1');
var dotPlayer2 = document.getElementById('dotPlayer2');
var scorePlayer1 = document.getElementById('scorePlayer1');
var scorePlayer2 = document.getElementById('scorePlayer2');
var rollButton = document.getElementById('rollButton');
var holdButton = document.getElementById('holdButton');
var startButton = document.getElementById('start-btn');
var roundPlayer1 = document.getElementById('roundPlayer1');
var roundPlayer2 = document.getElementById('roundPlayer2');
var scorePlayer1 = document.getElementById('scorePlayer1');
var scorePlayer2 = document.getElementById('scorePlayer2');
var canvas = document.getElementById('canvas');

//Dice Object
var dice ={
	SIZE: 200, //Size of one face on the image
	COLUMNS: 6,
	sourceX:0,
	sourceY:0,
	updateFace(face){
		this.sourceX = ((face-1) % this.COLUMNS) * this.SIZE;
	}
}
//Player class
class Player{
	ROUND =0;
	SCORE =0;
	WIN=false;

	//Methods
	roll(){
		canvas.classList.remove('rotate'); // unset the rotate class
		let RAND = Math.floor(Math.random() * 5) +1;
		dice.updateFace(RAND);
		if(RAND === 1){
			this.ROUND=0;
		}else{
			this.ROUND += RAND;
		}
	}
	hold(){
		this.SCORE += this.ROUND;
		this.ROUND=0;
	}
	testWin(){
		if(this.SCORE >= 100){
			this.SCORE=100;
			this.WIN=true;
		}
	}
}
//Functions
function imageLoaded(){
	window.requestAnimationFrame(imageLoaded, canvas);
	render();
}

function render(){
	drawingSurface.clearRect(0,0,canvas.width,canvas.height);
	drawingSurface.drawImage(image, dice.sourceX,0,200, 200, 0,0,canvas.width, canvas.height);
	canvas.classList.add('rotate'); //Set the rotate class
}

function clickRoll(){
	activePlayer.roll();
	if(activePlayer.ROUND ===0){
		displayRound(); //Reset the round on screen
		nextPlayer();
		displayBg();
	}else{
		activePlayer.testWin();
		if(activePlayer.WIN === true){
			/*gamestate=OVER;*/
		}
		displayRound();
	}
}
function nextPlayer(){
	if(Object.is(activePlayer, player1)){
		activePlayer = player2;
		setClassHide();
	}else{
		activePlayer = player1;
		setClassHide();
	}
}

function displayRound(){
	if(Object.is(activePlayer, player1)){
		roundPlayer1.innerHTML = activePlayer.ROUND;
	}else{
		roundPlayer2.innerHTML = activePlayer.ROUND;
	}
}

function displayBg(){
	if(Object.is(activePlayer, player1)){
		container2.classList.remove("active-player");
		container1.classList.add("active-player");
		dotPlayer2.classList.remove("dot-active");
		dotPlayer1.classList.add("dot-active");
	}else{
		container1.classList.remove("active-player");
		container2.classList.add("active-player");
		dotPlayer2.classList.add("dot-active");
		dotPlayer1.classList.remove("dot-active");
	}
}

function displayScore(){
	if(Object.is(activePlayer, player1)){
		scorePlayer1.innerHTML = activePlayer.SCORE;
	}else {
		scorePlayer2.innerHTML = activePlayer.SCORE;
	}
}

function setClassHide(){ // For mobile-screen only
	if(window.screen.width <=600){
		if(Object.is(activePlayer, player1)){
			container1.classList.remove('hide');
			container2.classList.add('hide');
		}else{
			container1.classList.add('hide');
			container2.classList.remove('hide');
		}
	}else{
		container1.classList.remove('hide');
		container2.classList.remove('hide');
	}
}

// MAIN PROGRAM

var drawingSurface = canvas.getContext('2d'); //Create the drawing Surface

var player1 = new Player(); //Create Players and load Image
var player2 = new Player();
var image= new Image();
var activePlayer = player1; // Player one begin

image.addEventListener('load', imageLoaded); // Optional
image.src = "images/diceImage.png";

//Event listeners
rollButton.addEventListener('click', clickRoll);
holdButton.addEventListener('click', function(){
	activePlayer.hold();
	displayRound();
	displayScore();
	nextPlayer();
	displayBg();
});

startButton.addEventListener('click', function(){
	location.reload();
});








})();