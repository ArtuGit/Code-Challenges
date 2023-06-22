import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Cell } from "./classes/Cell.js";

const rl = readline.createInterface({ input, output });

const testMode = false;

// Constants to define the size of the game board
const ROWS = 8;
const COLS = 8;
const MINES = 10;

// A 2D array to represent the game board
const board = [];

// An array to keep track of the positions of mines on the board
const mines = [];

let finished = false;
let finishMessage = "";

// Initialize the board, state, and place mines randomly
for (var row = 0; row < ROWS; row++) {
  board[row] = [];
  for (var col = 0; col < COLS; col++) {
    board[row][col] = new Cell();
  }
}

for (var i = 0; i < MINES; i++) {
  var row = Math.floor(Math.random() * ROWS);
  var col = Math.floor(Math.random() * COLS);
  if (board[row][col] !== "*") {
    board[row][col] = new Cell(true);
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
      if (board[r][c].value === "*") {
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
      if (board[r][c].value !== "*") {
        board[r][c].value++;
      }
    }
  }
}

// Function to display the game board in the console
function displayBoard() {
  const joiner = testMode ? "  " : " ";
  console.log("  " + [...Array(COLS).keys()].join(joiner));
  for (let row = 0; row < ROWS; row++) {
    let rowString = row + " ";
    for (let col = 0; col < COLS; col++) {
      rowString = rowString + board[row][col].getDisplayValue(testMode) + " ";
    }
    console.log(rowString);
  }
}

async function readTurn() {
  let row, col;
  let correctInput = false;
  do {
    const rawTurn = await rl.question(
      "\nEnter your turn, row/col, e.g. 1/0, 2/6, 3/1): "
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

function revealCell(row, col) {
  const areAllRevealed = () =>
    board
      .flat(Infinity)
      .filter((cell) => !cell.isMine)
      .every((cell) => cell.isRevealed);

  const handled = new Map();
  const revealEmptyCell = (entryRow, entryCol) => {
    const reveal4Directions = (row, col) => {
      const directions = [
        { rowShift: 0, columnShift: 1 },
        { rowShift: 0, columnShift: -1 },
        { rowShift: 1, columnShift: 0 },
        { rowShift: -1, columnShift: 0 },
      ];
      directions.forEach(({ rowShift, columnShift }) => {
        let currentRow = row;
        let currentCol = col;
        while (
          currentRow >= 0 &&
          currentRow < ROWS &&
          currentCol >= 0 &&
          currentCol < COLS &&
          board[currentRow][currentCol].isEmpty
        ) {
          const isHandled = handled.get(
            JSON.stringify({ row: currentRow, col: currentCol })
          );
          if (isHandled === undefined) {
            handled.set(
              JSON.stringify({ row: currentRow, col: currentCol }),
              false
            );
            board[currentRow][currentCol].reveal();
          }
          currentRow = currentRow + rowShift;
          currentCol = currentCol + columnShift;
        }
      });
      handled.set(JSON.stringify({ row, col }), true);
      board[row][col].reveal();
      let nextCell = [...handled].find(([key, value]) => value === false);
      if (nextCell !== undefined) {
        nextCell = JSON.parse(nextCell[0]);
        revealEmptyCell(nextCell.row, nextCell.col);
      }
    };

    reveal4Directions(entryRow, entryCol);
  };

  if (board[row][col].value === "*") {
    finished = true;
    finishMessage = "You lost!";
  }

  if (board[row][col].isEmpty) {
    revealEmptyCell(row, col);
  }

  board[row][col].reveal();

  if (areAllRevealed()) {
    finished = true;
    finishMessage = "You win!";
  }
}

do {
  displayBoard();

  const { row, col } = await readTurn();
  revealCell(row, col);
} while (!finished);

console.log(`\n--- ${finishMessage} ---`);
rl.close();
