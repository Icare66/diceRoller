//Display
var container1 = document.getElementById('player1');
var container2 = document.getElementById('player2');
var dotPlayer1 = document.getElementById('dotPlayer1');
var dotPlayer2 = document.getElementById('dotPlayer2');
var scorePlayer1 = document.getElementById('scorePlayer1');
var scorePlayer2 = document.getElementById('scorePlayer2');
var loadingScreen = document.getElementById('loadingScreen');
var roundPlayer1 = document.getElementById('roundPlayer1');
var roundPlayer2 = document.getElementById('roundPlayer2');
var scorePlayer1 = document.getElementById('scorePlayer1');
var scorePlayer2 = document.getElementById('scorePlayer2');
var winBox = document.getElementById('winBox');

//Buttons
var rollButton = document.getElementById('rollButton');
var holdButton = document.getElementById('holdButton');
var restartButton = document.getElementById('start-btn');


//Audio
var rollSound = document.getElementById('rollSound');
var holdSound = document.getElementById('holdSound');
var winSound = document.getElementById('winSound');
var loseSound = document.getElementById('loseSound');


//Create canvas element and context
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Load assets -- image and sound
var assetsLoaded=0;
var assetsToLoad = 5;

var image = new Image();
image.addEventListener('load', loadAssets);
image.src = "images/diceImage.png";

rollSound.addEventListener("canplaythrough", loadAssets);
rollSound.load();
holdSound.addEventListener("canplaythrough", loadAssets);
holdSound.load();
winSound.addEventListener("canplaythrough", loadAssets);
winSound.load();
loseSound.addEventListener("canplaythrough", loadAssets);
loseSound.load();

//Game variable
var scoreToWin=100;
var LOADING=0;
var PLAYING=1;
var OVER=2;
var gameState = LOADING;

//Class player
class Player{
	ROUND =0;
	SCORE =0;
	WIN=false;

	//Methods
	roll(){
		rollSound.currentTime =0;
		rollSound.play();
		let RAND = Math.floor(Math.random() * 6) +1;
		dice.updateFace(RAND);
		if(RAND === 1){
			this.ROUND=0;
			loseSound.currentTime =0;
			loseSound.volume = 0.2;
			loseSound.play();
		}else{
			this.ROUND += RAND;
		}
	}
	hold(){
		holdSound.currentTime =0;
		holdSound.play();
		this.SCORE += this.ROUND;
		if(this.SCORE >= scoreToWin){
			this.SCORE = scoreToWin;
			this.WIN = true;
		}
		this.ROUND=0;
	}
}

//Dice Object
var dice ={
	SIZE: 200,
	COLUMNS: 6,
	sourceX:0,
	updateFace(face){
		this.sourceX = ((face-1) % this.COLUMNS) * this.SIZE;
	}
}

//Create Players
var player1 = new Player(); 
var player2 = new Player();
var activePlayer = player1;

//Limit ROll and Hold callback
function debounceButton(button){
	button.style.pointerEvents = "none";
	setTimeout(function(){
		button.style.pointerEvents = "all";
	},800);
}

//Roll Function
function roll(){
	debounceButton(rollButton);
	canvas.classList.remove('rotate'); // unset the rotate class
	activePlayer.roll();
	if(activePlayer.ROUND ===0){
		displayScore();
		nextPlayer();
		displayActive();
	}else{
		displayScore();
	}
}
//Hold Function
function hold(){
	debounceButton(holdButton);
	activePlayer.hold();
	displayScore();
	nextPlayer();
	displayActive();	
}

//restart function
function restart(){
	gameState= LOADING;
	history.go(0);
}

//Start game Loop
gameLoop();

function gameLoop(){
	let request = requestAnimationFrame(gameLoop, canvas);
	switch (gameState) {
		case LOADING:
			loadingScreen.classList.add('loading-screen');
			break;
		case PLAYING:
			loadingScreen.style.display = "none";
			render();
			break;
		case OVER:
			cancelAnimationFrame(request);
			endGame();
			break;
		default:
			console.log('loading assets...');
			break;
	}
	if(player1.WIN || player2.WIN){
		gameState = OVER;
	}
}

//Game start when assets are loaded
function loadAssets(){
	assetsLoaded++;
	if(assetsLoaded === 5){ //check if all 5 assets are loaded
		image.removeEventListener('load',loadAssets);
		rollSound.removeEventListener("canplaythrough", loadAssets);
		holdSound.removeEventListener("canplaythrough", loadAssets);
		winSound.removeEventListener("canplaythrough", loadAssets);
		loseSound.removeEventListener("canplaythrough", loadAssets);
		setTimeout(function(){gameState = PLAYING;},700);
	}else{
		gameState=LOADING;
	}
}

//Swap players
function nextPlayer(){
	if(Object.is(activePlayer, player1)){
		activePlayer = player2;
		setClassHide();
	}else{
		activePlayer = player1;
		setClassHide();
	}
}

//Display score on screen
function displayScore(){
	if(Object.is(activePlayer, player1)){
		roundPlayer1.innerHTML = activePlayer.ROUND;
		scorePlayer1.innerHTML = activePlayer.SCORE
	}else{
		roundPlayer2.innerHTML = activePlayer.ROUND;
		scorePlayer2.innerHTML = activePlayer.SCORE;
	}
}

//Display CSS active class on active player
function displayActive(){
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

//Swap screen for MOBILE ONLY
function setClassHide(){
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

//Call winner's display function and disable buttons
function endGame(){
	rollButton.onclick = null;
	holdButton.onclick = null;

	if(player1.WIN === true){
		displayWinner("1");
	}else{
		displayWinner('2');
	}
}

//Create a DIV and display the winner
function displayWinner(winner){
	winSound.currentTime =0;
	winSound.volume = 0.3;
	winSound.play();
	var winBox = document.createElement('div');
	var content = document.createTextNode(`Le joueur ${winner} a gagné !`);
	winBox.appendChild(content);
	var mainContainer = document.getElementById('main');
	document.body.insertBefore(winBox, mainContainer);
	winBox.classList.add('win-box');
	/*mainContainer.classList.add('blurred');*/
}

//Rendering the context
function render(){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.drawImage(image, dice.sourceX,0,200, 200, 0,0,canvas.width, canvas.height);
	canvas.classList.add('rotate'); //Set the rotate class
}

