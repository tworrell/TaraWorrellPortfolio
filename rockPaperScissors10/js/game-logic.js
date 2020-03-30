// Logic for game -Tara Worrell
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

let playerOneWins;
let playerTwoWins;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
    if (!moveOneType || !moveOneValue || !moveTwoType || !moveTwoValue || !moveThreeType || !moveThreeValue) {
        return;
    }
    if (!isValidMoveType(moveOneType) || !isValidMoveType(moveTwoType) || !isValidMoveType(moveThreeType)) {
        return;
    }
    if (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)) {
        return;
    }
    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
    }
    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
}

function isValidMoveType(moveType) {
    return (moveType === 'rock') ||
           (moveType === 'paper') ||
           (moveType === 'scissors');
  }
  
function isValidMoveValue(moveValue) {
     return (moveValue >= 1) && (moveValue <= 99);
  }

function getRoundWinner(rounds) {
    switch (rounds) {
        case 1:
            return moveWinner(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
            break;
        case 2:
            return moveWinner(playerOneMoveTwoType, playerOneMoveTwoValue,  playerTwoMoveTwoType, playerTwoMoveTwoValue);
            break;
        case 3:
            return moveWinner(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
        default:
            break;
    }
}

function moveWinner(playerOneMoveType, playerOneMoveValue, playerTwoMoveType, playerTwoMoveValue) {
    if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType || !playerTwoMoveValue) {
        return null;
    }
    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else if (playerOneMoveType < playerTwoMoveType) {
            return 'Player Two';
        } else {
            return 'Tie';
        }
    }
    if (playerOneMoveType === 'rock') {
        if (playerTwoMoveType === 'scissors') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper') {
        if (playerTwoMoveType === 'rock') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else {
        if (playerTwoMoveType === 'paper') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    }
}

function getGameWinner() {
    if (!playerOneMoveOneType || !playerOneMoveTwoType || !playerOneMoveThreeType || !playerOneMoveOneValue || !playerOneMoveTwoValue || !playerOneMoveThreeValue || !playerTwoMoveOneType || !playerTwoMoveTwoType || !playerTwoMoveThreeType || !playerTwoMoveOneValue || !playerTwoMoveTwoValue || !playerTwoMoveThreeValue) {
        return null;
    }
    playerOneWins = 0;
    playerTwoWins = 0;

    const firstRoundWinner = getRoundWinner(1);
    const secondRoundWinner = getRoundWinner(2);
    const thirdRoundWinner = getRoundWinner(3);

    addWin(firstRoundWinner);
    addWin(secondRoundWinner);
    addWin(thirdRoundWinner);
    if (playerOneWins > playerTwoWins) {
        return 'Player One';
    } else if (playerOneWins < playerTwoWins) {
        return 'Player Two';
    } else {
        return 'Tie';
    }
}

function addWin(winner) {
    if (winner === 'Player One') {
        playerOneWins = (playerOneWins + 1) || 1;
    } else if (winner === 'Player Two') {
        playerTwoWins = (playerTwoWins + 1) || 1;
    }
}

function setComputerMoves() {
    const moves = ['rock', 'paper', 'scissors'];
    const moveOneType = moves[Math.floor(Math.random() * 3)];
    const moveTwoType = moves[Math.floor(Math.random() * 3)];
    const moveThreeType = moves[Math.floor(Math.random() * 3)];
    const moveOneValue = Math.floor(Math.random() * 96) + 1;
    const moveTwoValue = Math.floor(Math.random() * (97 - moveOneValue)) + 1;
    const moveThreeValue = 99 - moveOneValue - moveTwoValue;
    setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue);
  }