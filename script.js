// Game settings
const rows = 20;
const columns = 10;
const blockSize = 30;
const speed = 500; // Time interval for block movement in milliseconds

// Tetromino shapes
const tetrominos = [
  [[1, 1, 1, 1]],  // I shape
  [[1, 1], [1, 1]],  // O shape
  [[1, 1, 0], [0, 1, 1]],  // Z shape
  [[0, 1, 1], [1, 1, 0]],  // S shape
  [[1, 1, 1], [0, 1, 0]],  // T shape
  [[1, 1, 1], [0, 0, 1]],  // L shape
  [[1, 1, 1], [1, 0, 0]]   // J shape
];

// Create the game board grid
const grid = [];
for (let row = 0; row < rows; row++) {
  grid[row] = [];
  for (let col = 0; col < columns; col++) {
    grid[row][col] = 0; // 0 represents an empty cell
  }
}

let currentTetromino; // Current falling tetromino
let currentPosition; // Current position of the tetromino
let gameInterval; // Interval ID for the game loop

// Initialize the game
function initGame() {
  currentTetromino = getRandomTetromino();
  currentPosition = { row: 0, col: Math.floor(columns / 2) - 1 };
  drawTetromino();
  gameInterval = setInterval(moveDown, speed);
}

// Generate a random tetromino shape
function getRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[randomIndex];
}

// Draw the current tetromino on the game board
function drawTetromino() {
  const board = document.getElementById('game-board');

  // Draw the current tetromino
  for (let row = 0; row < currentTetromino.length; row++) {
    for (let col = 0; col < currentTetromino[row].length; col++) {
      if (currentTetromino[row][col]) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.top = `${(currentPosition.row + row) * blockSize}px`;
        block.style.left = `${(currentPosition.col + col) * blockSize}px`;
        board.appendChild(block);
        grid[currentPosition.row + row][currentPosition.col + col] = 1;
      }
    }
  }
}







document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementById('start-btn');
  var gameBoard = document.getElementById('game-board');
  var figure = document.createElement('div');

  startButton.addEventListener('click', function() {
    // Remove any existing figures from the game board
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }

    // Set initial position of the figure
    var position = 0;
    figure.style.position = 'absolute'; // Set the position to absolute

    // Function to move the figure down
    function moveDown() {
      // Increment the position
      position+=3;

      // Update the figure position
      figure.style.top = position + 'px';

      // Check if the figure has reached the bottom
      if (position < gameBoard.offsetHeight - figure.offsetHeight) {
        requestAnimationFrame(moveDown); // Continue moving down
      }
    }

    // Start moving the figure down
    requestAnimationFrame(moveDown);

    // Add the figure to the game board
    figure.classList.add('block');
    gameBoard.appendChild(figure);
  });
});
