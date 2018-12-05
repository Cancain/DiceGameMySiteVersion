import {Player} from "./Player.js";
import {PlayerImages} from "./ImageHandler.js";
import {ScoreHandler} from "./ScoreHandler.js";
import {Computer} from "./Computer.js";

//DOM components
var rollBtn = document.getElementById("rollBtn");
var scoreBtn = document.getElementById("scoreRollBtn");
var newGameBtn = document.getElementById("newGameBtn");

var keep1btn = document.getElementById("keep1btn");
var keep2btn = document.getElementById("keep2btn");
var keep3btn = document.getElementById("keep3btn");
var keep4btn = document.getElementById("keep4btn");
var keep5btn = document.getElementById("keep5btn");

var playerScoreLabel = document.getElementById("labelPlayerScore");
var playerScoreComment = document.getElementById("labelPlayerScoreComment");
var playerTotScorelabel = 
document.getElementById("labelPlayerTotscore");
var compScoreLabel = document.getElementById("labelComputerScore");
var compScoreComment = document.getElementById("labelComputerScoreComment")
var roundLabel = document.getElementById("roundLabel");
var computerTotScoreLabel = document.getElementById("labelComputerTotscore");

//Script Variables
let round = 1;

//
//An object with functions for hiding and showing the "keep" buttons
//
var keepButtons = {
    hide : function(){
        keep1btn.hidden = true;
        keep2btn.hidden = true;
        keep3btn.hidden = true;
        keep4btn.hidden = true;
        keep5btn.hidden = true;
    },
    show : function() {
        keep1btn.hidden = false;
        keep2btn.hidden = false;
        keep3btn.hidden = false;
        keep4btn.hidden = false;
        keep5btn.hidden = false;        

    }
}

//Script flow starts here
let player = new Player("Dowie");
let playerImages = new PlayerImages();
let computer = new Computer("Computer");
keepButtons.hide()
scoreBtn.hidden = true;
roundLabel.textContent = `Round: ${round}`;

rollBtn.addEventListener("click", function(){
    scoreBtn.hidden = false;
    scoreBtn.disabled = false;    
    playerScoreComment.textContent = "";
    roundLabel.textContent = `Round: ${round}`;

    if (player.reRolls > 0) {
        setupNewRound();
    }

    if (player.reRolls == 0){
        rollBtn.disabled = true;
        keepButtons.hide();
    }
});

function setupNewRound() {
    rollPlayerDices();
    updatePlayerImages();
    keepButtons.show();
    ResetCompInfo();
    resetPlayerKeptDices();
    player.reRolls--;
    rollBtn.textContent = `Roll Dices (${player.reRolls})`;
    playerScoreLabel.textContent = "";
}

function ResetCompInfo() {
    playerImages.clearComputerImages();
    compScoreLabel.textContent = "";
    compScoreComment.textContent = "";
}

//
//Rolls all the players dices
//that are not marked for keeping
//
function rollPlayerDices(){
    if (!player.dice1Keep) player.dice1.roll();
    if (!player.dice2Keep) player.dice2.roll();
    if (!player.dice3Keep) player.dice3.roll();
    if (!player.dice4Keep) player.dice4.roll();
    if (!player.dice5Keep) player.dice5.roll();  
}

function rollComputerDices(){
    if(!computer.dice1Keep) computer.dice1.roll();
    if(!computer.dice2Keep) computer.dice2.roll();
    if(!computer.dice3Keep) computer.dice3.roll();
    if(!computer.dice4Keep) computer.dice4.roll();
    if(!computer.dice5Keep) computer.dice5.roll();
}

//
//Puts the players dices and if they should be kept in an array
//then sends the two arrays to the imagehandler class 
//to be shown on screen
//
function updatePlayerImages(){
    let playerDices = makePlayerDiceArray()

    let playerKeep = [
        player.dice1Keep,
        player.dice2Keep,
        player.dice3Keep,
        player.dice4Keep,
        player.dice5Keep,
    ]

    playerImages.update(playerDices, playerKeep, playerImages.playerImages);
}

function updateComputerImages(){
    let computerDices = makeComputerDiceArray()

    let ComputerKeep = [
        computer.dice1Keep,
        computer.dice2Keep,
        computer.dice3Keep,
        computer.dice4Keep,
        computer.dice5Keep,
    ]

    playerImages.update(computerDices, ComputerKeep, playerImages.ComputerImages);

}

//
//Makes an array of the players Dices 
//to be able to loop through
//
function makePlayerDiceArray(){
    let diceArray = [
        player.dice1.value,
        player.dice2.value,
        player.dice3.value,
        player.dice4.value,
        player.dice5.value
    ]
    return diceArray;
    
}

function makeComputerDiceArray(){
    let diceArray = [
        computer.dice1.value,
        computer.dice2.value,
        computer.dice3.value,
        computer.dice4.value,
        computer.dice5.value
    ]
    return diceArray;
}

newGameBtn.addEventListener("click", function(){
    resetGame();    
})

//
//Resets everything needed to start a new game
//
function resetGame(){
    playerImages.clear();
    keepButtons.hide();
    resetPlayerKeptDices();
    player.reRolls = 3;
    rollBtn.disabled = false;
    rollBtn.hidden = false;
    rollBtn.textContent = "Roll Dices";
    playerScoreLabel.textContent = "";
    playerScoreComment.textContent = "";
    scoreBtn.hidden = true;
    player.totalScore = 0;
    playerTotScorelabel.textContent = "";
    round = 1;
    roundLabel.textContent = "";
    resetComputerKeptDices();
    computer.totalScore = 0;
    computerTotScoreLabel.textContent = "";
    compScoreLabel.textContent = "";
    compScoreComment.textContent = "";
}

//
//restores all kept dices to none
//
function resetPlayerKeptDices(){
    player.dice1Keep = false;
    player.dice2Keep = false;
    player.dice3Keep = false;
    player.dice4Keep = false;
    player.dice5Keep = false;
}

function resetComputerKeptDices(){
    computer.dice1Keep = false;
    computer.dice2Keep = false;
    computer.dice3Keep = false;
    computer.dice4Keep = false;
    computer.dice5Keep = false;
}

keep1btn.addEventListener("click", function(){
    player.dice1Keep = true;
    keep1btn.hidden = true;
});

keep2btn.addEventListener("click", function(){
    player.dice2Keep = true;
    keep2btn.hidden = true;
});

keep3btn.addEventListener("click", function(){
    player.dice3Keep = true;
    keep3btn.hidden = true;    
});

keep4btn.addEventListener("click", function(){
    player.dice4Keep = true;
    keep4btn.hidden = true;
});

keep5btn.addEventListener("click", function(){
    player.dice5Keep = true;
    keep5btn.hidden = true;
});

scoreBtn.addEventListener("click", function(){
    checkForEnd();
    handlePlayerScore(); 
    scoreBtn.disabled = true;
    newRound();       
});

function handlePlayerScore() {
    let playerScoreHandler = new ScoreHandler();
    playerScoreHandler.diceArray = makePlayerDiceArray();
    playerScoreHandler.calculateScore();
    playerScoreLabel.textContent =
        `You score: ${playerScoreHandler.score}`;
    playerScoreComment.textContent = playerScoreHandler.message;
    playerScoreHandler.message = "";

    player.totalScore += playerScoreHandler.score;
}

function newRound(){
    beginCompTurn();
    resetPlayerKeptDices();
    keepButtons.hide();
    rollBtn.disabled = false;
    rollBtn.textContent = "Next round";
    player.reRolls = 3;
    playerTotScorelabel.textContent = `Total score: 
    ${player.totalScore}`;
    round++;
    playerScoreLabel.hidden = false;
    playerScoreComment.hidden = false;
    compScoreLabel.hidden = false;
    playerScoreLabel.hidden = false;
    compScoreComment.hidden = false;
}

function checkForEnd(){
    if (round <= 12) {
        return false
    }
    else{
        endGame();
    }
}

function endGame() {
    rollBtn.hidden = true;
    scoreBtn.hidden = true;
    roundLabel.textContent = "Game Over";
    hideEverything();
    let winningMessage = makeWinningMessage()
    alert(winningMessage);

}

function beginCompTurn(){
    while (computer.reRolls > 0) {
        rollComputerDices();
        computer.reRolls--;    
        updateComputerImages();
        computer.decideKeptDices();
        console.log("dice1 kept: " + computer.dice1Keep);
        console.log("dice2 kept: " + computer.dice2Keep);
        console.log("dice3 kept: " + computer.dice3Keep);
        console.log("dice4 kept: " + computer.dice4Keep);
        console.log("dice5 kept: " + computer.dice5Keep);
    }
    resetComputerKeptDices();
    handleComputerScore();
    computer.reRolls = 3;
}

function handleComputerScore(){
    let computerScoreHandler = new ScoreHandler();
    computerScoreHandler.diceArray = makeComputerDiceArray();
    computerScoreHandler.calculateScore();
    compScoreLabel.textContent =
        `Computer score: ${computerScoreHandler.score}`;
    compScoreComment.textContent = computerScoreHandler.message;
    computerScoreHandler.message = "";
    computer.totalScore += computerScoreHandler.score;
    computerTotScoreLabel.textContent = 
    `Total score: ${computer.totalScore}`;
}

function hideEverything(){
    playerScoreLabel.hidden = true;
    playerScoreComment.hidden = true;
    compScoreLabel.hidden = true;
    playerScoreLabel.hidden = true;
    compScoreComment.hidden = true;
    playerImages.clearComputerImages();
}

function makeWinningMessage(){
    if (player.totalScore > computer.totalScore) {
        return `YOU WIN! ${player.totalScore} to ${computer.totalScore}`
    } else if(player.totalScore === computer.totalScore){
        return `You are tied at ${player.totalScore}`
    } else {
        return `Sorry, you lost ${computer.totalScore} to ${player.totalScore}`
    }
}






