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

  // Remove previous tetromino from the board
  const previousTetromino = document.querySelectorAll('.block');
  previousTetromino.forEach(block => block.remove());

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

// Move the tetromino down
function moveDown() {
  if (isValidMove(1, 0)) {
    clearTetromino();
    currentPosition.row++;
    drawTetromino();
  } else {
    lockTetromino();
    clearLines();
    currentTetromino = getRandomTetromino();
    currentPosition = { row: 0, col: Math.floor(columns / 2) - 1 };
    drawTetromino();
  }
}

// Move the tetromino left
function moveLeft() {
  if (isValidMove(0, -1)) {
    clearTetromino();
    currentPosition.col--;
    drawTetromino();
  }
}

// Move the tetromino right
function moveRight() {
  if (isValidMove(0, 1)) {
    clearTetromino();
    currentPosition.col++;
    drawTetromino();
  }
}

// Rotate the tetromino
function rotate() {
  const rotatedTetromino = rotateMatrix(currentTetromino);
  if (isValidMove(0, 0, rotatedTetromino)) {
    clearTetromino();
    currentTetromino = rotatedTetromino;
    drawTetromino();
  }
}

// Check if the current move is valid
function isValidMove(rowOffset, colOffset, tetromino = currentTetromino) {
  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (tetromino[row][col]) {
        const newRow = currentPosition.row + row + rowOffset;
        const newCol = currentPosition.col + col + colOffset;
        if (
          newRow >= rows ||
          newCol < 0 ||
          newCol >= columns ||
          grid[newRow][newCol]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

// Lock the tetromino in place
function lockTetromino() {
  for (let row = 0; row < currentTetromino.length; row++) {
    for (let col = 0; col < currentTetromino[row].length; col++) {
      if (currentTetromino[row][col]) {
        grid[currentPosition.row + row][currentPosition.col + col] = 1;
      }
    }
  }
}

// Clear the tetromino from the game board
function clearTetromino() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => block.remove());
}

// Clear filled lines
function clearLines() {
  for (let row = rows - 1; row >= 0; row--) {
    if (grid[row].every(cell => cell)) {
      grid.splice(row, 1);
      grid.unshift(Array(columns).fill(0));
    }
  }
}

// Rotate a matrix (90 degrees clockwise)
function rotateMatrix(matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const rotatedMatrix = [];
  for (let col = 0; col < numCols; col++) {
    const newRow = [];
    for (let row = numRows - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }
    rotatedMatrix.push(newRow);
  }
  return rotatedMatrix;
}

// Button event handlers
document.getElementById('start-btn').addEventListener('click', () => {
  if (!gameInterval) {
    initGame();
  }
});

document.getElementById('pause-btn').addEventListener('click', () => {
  clearInterval(gameInterval);
  gameInterval = null;
});

document.getElementById('resume-btn').addEventListener('click', () => {
  if (!gameInterval) {
    gameInterval = setInterval(moveDown, speed);
  }
});

document.getElementById('left-btn').addEventListener('click', () => {
  moveLeft();
});

document.getElementById('right-btn').addEventListener('click', () => {
  moveRight();
});

document.getElementById('rotate-btn').addEventListener('click', () => {
  rotate();
});

// Start the game
initGame();
