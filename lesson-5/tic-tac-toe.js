const rlSync = require('readline-sync');

class Board {
  constructor(size) {
    this.size = size;
    this.gameState = [];
  }
  static PIECES = {
    human: 'X',
    computer: 'O',
    empty: ' '
  };
  initialize() {
    for (let row = 0; row < this.size; row += 1) {
      let rowArr = [];
      for (let col = 0; col < this.size; col += 1) {
        rowArr.push(Board.PIECES.empty);
      }
      this.gameState.push(rowArr);
    }
  }
  display() {
    if (this.gameState.length === 0) console.log("Error: Initialize Board");
    this.gameState.forEach((row, idx) => {
      let line = '';
      row.forEach(piece => {
        line += ` ${piece} |`;
      });
      console.log(line.slice(0, -1));
      if (idx !== this.size - 1) console.log('---+'.repeat(this.size - 1) + '---');
    });
  }
  reset() {
    for (let row = 0; row < this.size; row += 1) {
      for (let col = 0; col < this.size; col += 1) {
        this.gameState[row][col] = Board.PIECES.empty;
      }
    }
  }
  update(move, piece) {
    this.gameState[move[0]][move[1]] = piece;
  }
  // returns 'X' for player win, 'O' for computer win,
  // 'tie' for tie, and ' ', for no winner
  getOutcome() {
    if (this.isFull()) return 'tie';
    return Board.getWinner(this.gameState);
  }
  static getWinner(board) {
    let rightDiag = [];
    let leftDiag = [];
    for (let idx = 0; idx < board.length; idx += 1) {
      // Check rows (idx = row)
      if (Board.isMatching(board[idx])) return board[idx][0];

      // Check cols (idx = col)
      let col = [];
      for (let row = 0; row < board.length; row += 1) {
        col.push(board[row][idx]);
        if (idx === row) rightDiag.push(board[row][idx]);
        if (idx + row === board.length - 1) {
          leftDiag.push(board[row][idx]);
        }
      }
      if (Board.isMatching(col)) return col[0];
    }

    // Check diagonals
    if (Board.isMatching(rightDiag)) return rightDiag[0];
    if (Board.isMatching(leftDiag)) return leftDiag[0];

    return Board.PIECES.empty;
  }
  static isMatching(arr) {
    if (arr[0] === Board.PIECES.empty) return false;
    for (let idx = 1; idx < arr.length; idx += 1) {
      if (arr[idx - 1] !== arr[idx]) return false;
    }
    return true;
  }
  isFull() {
    return this.gameState.every(row => row.every(piece => {
      return piece !== Board.PIECES.empty;
    }));
  }
}

class Player {
  #score;
  constructor(symbol) {
    this.symbol = symbol;
    this.#score = 0;
  }
  incrementScore() {
    this.#score += 1;
  }
  resetScore() {
    this.#score = 0;
  }
  getScore() {
    return this.#score;
  }
}

class Human extends Player {
  constructor(symbol) {
    super(symbol);
  }
  getMove(board) {
    let move;
    do {
      move = rlSync.question(`Where do you want to play your X? Enter a row # and col # (from 1 to ${board.size})\n`);
      move = move.split('')
        .filter(char => !Number.isNaN(parseInt(char, 10)))
        .map(char => parseInt(char, 10));
    } while (!this.validMove(board, move));
    return [move[0] - 1, move[1] - 1];
  }
  validMove(board, move) {
    if (move.length !== 2 ||
        move[0] < 1 || move[0] > board.size ||
        move[1] < 1 || move[1] > board.size ||
        board.gameState[move[0] - 1][move[1] - 1] !== Board.PIECES.empty) {
      console.log("Invalid move.");
      return false;
    }
    return true;
  }
}

class Computer extends Player {
  constructor(symbol) {
    super(symbol);
  }
  getMove(board) {
    let move = this.getWinningMove(board);
    if (move.length !== 0) return move;
    move = this.getDefensiveMove(board);
    if (move.length !== 0) return move;
    return this.getRandomMove(board);
  }
  getWinningMove(board) {
    return this.detectWinningMove(board, this.symbol);
  }
  getDefensiveMove(board) {
    return this.detectWinningMove(board, Board.PIECES.human);
  }
  // eslint-disable-next-line max-lines-per-function
  detectWinningMove(board, piece) {
    let move = [];
    let testBoard = [];
    board.gameState.forEach(row => {
      let testRow = [];
      row.forEach(symbol => {
        testRow.push(symbol);
      });
      testBoard.push(testRow);
    });
    board.gameState.forEach((rowArr, row) => {
      rowArr.forEach((symbol, col) => {
        if (symbol === Board.PIECES.empty) {
          testBoard[row][col] = piece;
          if (Board.getWinner(testBoard) === piece) {
            move = [row, col];
          }
          testBoard[row][col] = Board.PIECES.empty;
        }
      });
    });
    return move;
  }
  getRandomMove(board) {
    let row;
    let col;
    do {
      row = Math.floor(Math.random() * board.size);
      col = Math.floor(Math.random() * board.size);
    } while (board.gameState[row][col] !== Board.PIECES.empty);
    return [row, col];
  }
}

class Game {
  constructor() {
    this.board = null;
    this.human = new Human(Board.PIECES.human);
    this.computer = new Computer(Board.PIECES.computer);
    this.winLimit = 3;
    this.player = this.human;
  }
  displayWelcomeMessage() {
    console.clear();
    console.log(`Welcome to Tic Tac Toe! First to ${this.winLimit} wins!\n`);
  }
  displayRules() {
    console.log(`You go first, then we'll alternate! You are ${this.human.symbol}'s, I am ${this.computer.symbol}'s.\n`);
  }
  gameOver() {
    switch (this.board.getOutcome()) {
      case this.human.symbol:
        this.human.incrementScore();
        this.displayWinner(this.human);
        return true;
      case this.computer.symbol:
        this.computer.incrementScore();
        this.displayWinner(this.computer);
        return true;
      case 'tie':
        this.displayWinner();
        return true;
      default:
        return false;
    }
  }
  matchOver() {
    if (this.human.getScore() === this.winLimit) {
      console.log("Congratulations, you win the match!");
      return true;
    } else if (this.computer.getScore() === this.winLimit) {
      console.log("Sorry, I win this match!");
      return true;
    }
    return false;
  }
  playAgain() {
    let play;
    do {
      play = rlSync.question("Do you want to play again? (y/n)\n").toLowerCase();
    } while (!['y','yes','n','no'].includes(play));
    return play[0] === 'y';
  }
  displayWinner(winner) {
    if (winner === undefined) console.log("It's a tie!");
    else if (winner === this.human) console.log("You win!");
    else console.log("Computer wins.");
    console.log(`The score is Player: ${this.human.getScore()} Computer: ${this.computer.getScore()}`);
  }
  getBoardSize() {
    let boardSize;
    do {
      boardSize = parseInt(rlSync.question("How big of a board do you want? I can handle 3x3 - 9x9 (enter 3 for 3x3, 9 for 9x9, etc.)\n"), 10);
    } while (boardSize < 3 || boardSize > 9);
    return boardSize;
  }
  play() {
    this.displayWelcomeMessage();
    this.board = new Board(this.getBoardSize());
    this.board.initialize();
    this.displayRules();
    while (true) {
      this.board.display();
      this.board.update(this.player.getMove(this.board), this.player.symbol);
      this.player = this.player === this.human ? this.computer : this.human;
      console.clear();
      if (this.gameOver()) {
        this.board.display();
        this.board.reset();
        this.matchOver();
        if (!this.playAgain()) break;
        console.clear();
      }
    }
  }
}

const game = new Game();
game.play();