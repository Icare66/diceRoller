(function() {
var background_p1 = document.getElementById("player1");
var background_p2 = document.getElementById("player2");
var dot_p1 = document.getElementById("dot_player1");
var dot_p2 = document.getElementById("dot_player2");
var rollButton = document.getElementById("roll-btn");
var holdButton = document.getElementById("hold-btn");
var startButton = document.getElementById("start-btn");
var ROUND_DIV_P1 = document.getElementById('current_score_player_1');
var ROUND_DIV_P2 = document.getElementById('current_score_player_2');
var SCORE_DIV_P1 = document.getElementById('global_score_player_1');
var SCORE_DIV_P2 = document.getElementById('global_score_player_2');

var canvas = document.getElementById('canvas');
var drawingSurface = canvas.getContext('2d');

var dice ={
	SIZE: 200,
	COLUMNS: 6,
	sourceWidth: 200,
	sourceHeight: 200,
	x:0,
	y:0,
	width: canvas.width,
	height: canvas.height,
	sourceX: 0,
	sourceY:0,
	updateFace(face){
		this.sourceX = ((face-1) % this.COLUMNS) * this.SIZE;
	}
}
class Player{
	ROUND =0;
	score =0;
	win=false;
	roll(){
		canvas.classList.remove('rotate'); // unset the rotate class
		let RAND = Math.floor(Math.random() * 5) +1;
		dice.updateFace(RAND);
		if(RAND === 1){
			this.ROUND=0;
			this.active=false;
		}else{
			this.ROUND += RAND;
		}
	}
	hold(){
		this.score += this.ROUND;
		this.ROUND=0;
	}
	testWin(){
		if(this.score >= 100){
			this.score=100;
			this.win=true;
		}
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
function setClassHide(){
	if(window.screen.width <=700){
		if(Object.is(activePlayer, player1)){
			background_p1.classList.remove('hide');
			background_p2.classList.add('hide');
		}else{
			background_p1.classList.add('hide');
			background_p2.classList.remove('hide');
		}
	}
}
function displayRound(){
	if(Object.is(activePlayer, player1)){
		ROUND_DIV_P1.innerHTML = activePlayer.ROUND;
	}else{
		ROUND_DIV_P2.innerHTML = activePlayer.ROUND;
	}
}
function displayBg(){
	if(Object.is(activePlayer, player1)){
		background_p2.classList.remove("active-player");
		background_p1.classList.add("active-player");
		dot_p2.classList.remove("dot-active");
		dot_p1.classList.add("dot-active");
	}else{
		background_p1.classList.remove("active-player");
		background_p2.classList.add("active-player");
		dot_p2.classList.add("dot-active");
		dot_p1.classList.remove("dot-active");
	}
}
function displayScore(){
	if(Object.is(activePlayer, player1)){
		SCORE_DIV_P1.innerHTML = activePlayer.score;
	}else {
		SCORE_DIV_P2.innerHTML = activePlayer.score;
	}
}
function loadHandler(){update();}
function update(){
	window.requestAnimationFrame(update, canvas);
	render();
}
function render(){
	drawingSurface.clearRect(0,0,canvas.width,canvas.height);
	drawingSurface.drawImage(image, dice.sourceX, dice.sourceY,dice.sourceWidth, dice.sourceHeight, Math.floor(dice.x),Math.floor(dice.y),dice.width, dice.height);
	canvas.classList.add('rotate'); //Set the rotate class
}

// Main program
var player1 = new Player();
var player2 = new Player();
var activePlayer = player1; // Le joueur 1 commence
var image= new Image();

image.addEventListener('load', loadHandler,false); // Chargement de l'image
image.src = "images/diceImage.png";

//Event listeners
rollButton.addEventListener('click', function(){
	activePlayer.roll();
	if(activePlayer.ROUND ===0){
		displayRound();
		nextPlayer();
		displayBg();
	}else{
		activePlayer.testWin();
		if(activePlayer.win === true){
			gamestate=OVER;
		}
		displayRound();
	}
});
holdButton.addEventListener('click', function(){
	activePlayer.hold();
	displayRound();
	displayScore();
	nextPlayer();
	displayBg();
});

})();







