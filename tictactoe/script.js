// Select elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('new-game');
const bgColorPicker = document.getElementById('bg-color');
const playerXScoreElement = document.getElementById('player-x-score');
const playerOScoreElement = document.getElementById('player-o-score');

// Variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Functions
function handleCellClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (gameBoard[index] !== '' || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
  if (isGameActive) switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      statusText.textContent = `Player ${currentPlayer} Wins!`;

      updateScore(currentPlayer);
      highlightWinningCells([a, b, c]);
      return;
    }
  }

  if (!gameBoard.includes('')) {
    isGameActive = false;
    statusText.textContent = "It's a Draw!";
  }
}

function updateScore(winner) {
  if (winner === 'X') {
    playerXScore++;
    playerXScoreElement.textContent = playerXScore;
  } else if (winner === 'O') {
    playerOScore++;
    playerOScoreElement.textContent = playerOScore;
  }
}

function highlightWinningCells(cells) {
  cells.forEach(index => {
    document.querySelectorAll('.cell')[index].classList.add('win');
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  statusText.textContent = 'Player X\'s Turn';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
}

function resetScores() {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreElement.textContent = playerXScore;
  playerOScoreElement.textContent = playerOScore;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', () => {
  resetGame();
  resetScores();
});
bgColorPicker.addEventListener('input', event => {
  document.body.style.backgroundColor = event.target.value;
});
