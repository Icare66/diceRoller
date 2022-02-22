//Players
var background_p1 = document.getElementById("player1");
var background_p2 = document.getElementById("player2");
var dot_p1 = document.getElementById("dot_player1");
var dot_p2 = document.getElementById("dot_player2");

for(var i=0;i<100;i++){
	var rand = Math.floor(Math.random() * 6) +1;

}


var rollButton = document.getElementById("roll-btn");
var holdButton = document.getElementById("hold-btn");
var startButton = document.getElementById("start-btn");
var ROUND_DIV_P1 = document.getElementById('current_score_player_1');
var ROUND_DIV_P2 = document.getElementById('current_score_player_2');
var SCORE_DIV_P1 = document.getElementById('global_score_player_1');
var SCORE_DIV_P2 = document.getElementById('global_score_player_2');
var diceContainer = document.getElementById('dice-container');
var faces = new Array();
//Dice
var face1 = document.getElementById('face1');
var face2 = document.getElementById('face2');
var face3 = document.getElementById('face3');
var face4 = document.getElementById('face4');
var face5 = document.getElementById('face5');
var face6 = document.getElementById('face6');

/*faces.push(document.getElementById('face1'),document.getElementById('face2'),document.getElementById('face3'),
	document.getElementById('face4'),document.getElementById('face5'),document.getElementById('face6'));*/

class Player{
	ROUND =0;
	score =0;
	win=false;

	resetDice(){
		face1.className="face";
		face2.className="face";
		face3.className="face";
		face4.className="face";
		face5.className="face";
		face6.className="face";
	}
	roll(){

/*		face1.classList.remove('visible');
		face2.classList.remove('visible');
		face3.classList.remove('visible');
		face4.classList.remove('visible');
		face5.classList.remove('visible');
		face6.classList.remove('visible');

		face1.className="face";
		face2.className="face";
		face3.className="face";
		face4.className="face";
		face5.className="face";
		face6.className="face";*/

		this.resetDice();

		let RAND = Math.floor(Math.random() * 5) +1;

		switch(RAND){
			case 1:
				face1.className = "face visible";
				break;
			case 2:
				face2.className = "face visible";
				break;
			case 3:
				face3.className = "face visible";
				break;
			case 4:
				face4.className = "face visible";
				break;
			case 5:
				face5.className = "face visible";
				break;
			case 6:
				face6.className = "face visible";
				break;
		}




/*		let RAND = Math.floor(Math.random() * 5) +1;

		faces.forEach(function(face){
			face.classList.remove('visible');
		});
		faces[RAND].classList.add('visible');*/

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

var player1 = new Player();
var player2 = new Player();
activePlayer = player1;

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


function nextPlayer(){
	if(Object.is(activePlayer, player1)){
		activePlayer = player2;
	}else{
		activePlayer = player1;
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

