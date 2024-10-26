let readline = require('readline-sync');
const WIN_CONDITIONS = {
  rock: ['lizard', 'scissors'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
};
const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const SHORT_CHOICES = ['r', 'p', 'sc', 'l', 'sp'];
const PLAY_AGAIN = ['y', 'yes'];
const QUIT = ['n', 'no'];
const MATCH_LIMIT = 5;

// eslint-disable-next-line max-lines-per-function
class Player {
  #score;
  constructor() {
    this.move = null;
    this.moveHistory = {
      playerMoves: [],
      opponentMoves: [],
      outcomes: [],
    };
    this.#score = 0;
  }
  getScore() {
    return this.#score;
  }
  resetScore() {
    this.#score = 0;
  }
  incrementScore() {
    this.#score += 1;
  }
  compare(move) {
    if (WIN_CONDITIONS[this.move].includes(move)) {
      return 'win';
    } else if (WIN_CONDITIONS[move].includes(this.move)) {
      return 'loss';
    }
    return 'tie';
  }
  isWinner() {
    return this.#score === MATCH_LIMIT;
  }
  updateHistory(playerMove, opponentMove, outcome) {
    this.moveHistory.playerMoves.push(playerMove);
    this.moveHistory.opponentMoves.push(opponentMove);
    this.moveHistory.outcomes.push(outcome);
  }
}

// eslint-disable-next-line max-lines-per-function
class Computer extends Player {
  constructor() {
    super();
  }
  choose() {
    //get history of moves, choose randomly if no history
    let opponentMoves = this.moveHistory.opponentMoves;
    if (opponentMoves.length === 0) {
      let randomIndex = Math.floor(Math.random() * CHOICES.length);
      this.move = CHOICES[randomIndex];
      return;
    }
    //get probability of a move given history of moves
    let probabilities = [];
    for (let move of CHOICES) {
      probabilities.push(this.getProbability(move, opponentMoves));
    }
    //computer move = the move that beats the player's most likely move
    this.move = this.getMove(
      this.getOpponentMove(probabilities)
    );
  }
  getOpponentMove(probabilities) {
    return CHOICES[
      probabilities.reduce((maxIdx, prob, idx) => {
        if (prob === probabilities[maxIdx]) {
          return Math.floor(Math.random() * CHOICES.length) === 1
            ? idx : maxIdx;
        }
        return prob > probabilities[maxIdx] ? idx : maxIdx;
      }, 0)
    ];
  }
  getMove(opponentMove) {
    for (let move of Object.keys(WIN_CONDITIONS)) {
      if (WIN_CONDITIONS[move].includes(opponentMove)) {
        return move;
      }
    }
    return null;
  }
  //getProbability gets a player's most likely move given their most
  //often observed response to the last move
  getProbability(move, history) {
    let lastMove = history[history.length - 1];
    let count = 0;
    let total = 0;
    for (let idx = 0; idx < history.length - 1; idx += 1) {
      if (history[idx] === lastMove) {
        count += (history[idx + 1] === move) ? 1 : 0;
        total += 1;
      }
    }
    return (total === 0) ? 1 / CHOICES.length : count / total;
  }
}

class Human extends Player {
  constructor() {
    super();
  }
  choose() {
    let choice;

    while (true) {
      console.log(`Please choose one - ${CHOICES.join(', ')}:`);
      choice = readline.question().toLowerCase();
      if (CHOICES.includes(choice)) break;
      if (SHORT_CHOICES.includes(choice)) {
        choice = CHOICES[SHORT_CHOICES.indexOf(choice)];
        break;
      }
      console.log('Sorry, invalid choice.');
    }

    this.move = choice;
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  displayWelcomeMessage() {
    console.log(`Welcome to ${CHOICES.join(', ')}!`);
    console.log(`First to ${MATCH_LIMIT} wins!`);
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing ${CHOICES.join(', ')}. Goodbye!`);
  }

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
    switch (this.human.compare(this.computer.move)) {
      case "win":
        console.log("You win!");
        break;
      case "loss":
        console.log("Computer wins!");
        break;
      default:
        console.log("It's a tie!");
    }
  }

  updateScore() {
    switch (this.human.compare(this.computer.move)) {
      case "win":
        this.human.incrementScore();
        break;
      case "loss":
        this.computer.incrementScore();
        break;
    }
  }

  resetScore() {
    this.human.resetScore();
    this.computer.resetScore();
  }

  displayScore() {
    console.log(`The score is Player: ${this.human.getScore()} to Computer: ${this.computer.getScore()}`);
  }

  isMatchWon() {
    return this.human.isWinner() || this.computer.isWinner();
  }

  displayMatchWinner() {
    if (this.human.isWinner()) {
      console.log("Congratulations, you win the match!");
    } else {
      console.log("Sorry, the computer wins this one!");
    }
  }

  playAgain() {
    let answer;
    while (true) {
      console.log('Would you like to play again? (y/n)');
      answer = readline.question().toLowerCase();
      if (PLAY_AGAIN.includes(answer)) return true;
      if (QUIT.includes(answer)) return false;
      console.log('Please enter yes/y or no/n');
    }
  }

  // eslint-disable-next-line max-lines-per-function
  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.computer.updateHistory(
        this.computer.move,
        this.human.move,
        this.computer.compare(this.human.move)
      );
      this.updateScore();
      this.displayWinner();
      this.displayScore();
      if (this.isMatchWon()) {
        this.displayMatchWinner();
        if (!this.playAgain()) break;
        this.resetScore();
        this.displayScore();
      }
    }
    this.displayGoodbyeMessage();
  }
}

let game = new RPSGame();
game.play();