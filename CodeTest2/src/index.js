import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

// Constants to define the size of the game board
const ROWS = 8;
const COLS = 8;
const MINES = 10;

// A 2D array to represent the game board
const board = [];

// An array to keep track of the positions of mines on the board
const mines = [];

// Initialize the board, state, and place mines randomly
for (var row = 0; row < ROWS; row++) {
  board[row] = [];
  for (var col = 0; col < COLS; col++) {
    board[row][col] = 0;
  }
}

for (var i = 0; i < MINES; i++) {
  var row = Math.floor(Math.random() * ROWS);
  var col = Math.floor(Math.random() * COLS);
  if (board[row][col] !== "*") {
    board[row][col] = "*";
    mines.push([row, col]);
  } else {
    i--;
  }
}

// Function to count the number of mines around a cell
function countMines(row, col) {
  let count = 0;
  for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, ROWS - 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, COLS - 1); c++) {
      if (board[r][c] === "*") {
        count++;
      }
    }
  }
  return count;
}

// Populate the board with the number of mines around each cell
for (var i = 0; i < mines.length; i++) {
  var row = mines[i][0];
  var col = mines[i][1];
  for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, ROWS - 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, COLS - 1); c++) {
      if (board[r][c] !== "*") {
        board[r][c]++;
      }
    }
  }
}

// Function to display the game board in the console
function displayBoard() {
  console.log("  " + [...Array(COLS).keys()].join(" "));
  for (let row = 0; row < ROWS; row++) {
    console.log(row + " " + board[row].join(" "));
  }
}

async function readTurn() {
  let row, col;
  let correctInput = false;
  do {
    const rawTurn = await rl.question(
      "Enter your turn, row/col, e.g. 1/2, 3/6, 3/1): "
    );
    const turn = rawTurn.split("/");
    row = parseInt(turn[0]);
    col = parseInt(turn[1]);
    correctInput =
      !isNaN(row) &&
      !isNaN(col) &&
      row >= 0 &&
      row < ROWS &&
      col >= 0 &&
      col < COLS;
    if (!correctInput) {
      console.log("Invalid input, please try again.");
    }
  } while (!correctInput);
  return { row, col };
}

function revealCell(row, col) {}

do {
  // displayBoard();
  const answer = await readTurn();
} while (false);

rl.close();