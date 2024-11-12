const board = document.querySelector('.board');
const cells = document.querySelectorAll('[data-cell]');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let xScore = 0;
let oScore = 0;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle Click Event for Cells
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    cell.innerText = currentClass;
    cell.classList.add(currentClass);

    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function endGame(draw, winner = '') {
    if (draw) {
        winnerMessage.innerText = 'It\'s a Draw!';
    } else {
        winnerMessage.innerText = `Player ${winner} Wins!`;
        updateScore(winner);
    }
    showPopup();
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        playerXScore.innerText = `X: ${xScore}`;
    } else if (winner === 'O') {
        oScore++;
        playerOScore.innerText = `O: ${oScore}`;
    }
}

function showPopup() {
    winnerPopup.classList.add('show');
}

function restartGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerPopup.classList.remove('show');
}

restartButton.addEventListener('click', restartGame);
