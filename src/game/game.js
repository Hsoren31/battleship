//Game Controller
import { Player } from "./player";

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayBoard(boardInfo, container, hide = false) {
  clearElement(container);
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    square.className = "square";
    square.dataset.coordinate = boardInfo[i].coordinate;

    if (boardInfo[i].hit !== false) {
      square.classList.add("square_hit");
    }

    if (boardInfo[i].guess !== false) {
      square.classList.add("square_guess");
    }

    if (!hide) {
      if (boardInfo[i].hasShip !== null) {
        square.classList.add("square_ship");
        if (boardInfo[i].hasShip.sunkStatus !== false) {
          square.classList.add("ship_sunk");
        }
      }
    } else {
      if (
        boardInfo[i].hasShip !== null &&
        boardInfo[i].hasShip.sunkStatus !== false
      ) {
        square.classList.add("ship_sunk");
      }
    }

    container.appendChild(square);
  }
}

export class Controller {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
  }

  //Methods
  //Start Game
  //Both players place their fleet of ships
  setShips() {
    this.player1.oceanBoard.clearBoard();
    this.player2.oceanBoard.clearBoard();
    this.player1.placeRandomFleet();
    this.player2.placeRandomFleet();

    this.displayBoards();
  }
  //switch Player Turns

  //Check that both players placed their ships.
  //Start with Player 1
  //Get attack on player 2
  //Update Boards
  //Check for sunken ship
  //Check for end game

  //repeat for player 2
  playRound(coordinate) {
    if(this.player1.giveAttack(this.player2, coordinate) === false) {
      alert('You already attacked here. Try another coordinate.')
      return;
    }
    this.player2.randomAttack(this.player1);
    this.displayBoards();

    if (this.player1.oceanBoard.isFleetSunk()) {
      this.endGame("Player 2");
    }
    if (this.player2.oceanBoard.isFleetSunk()) {
      this.endGame("Player 1");
    }
  }

  displayBoards() {
    const userBoard = document.querySelector("#user_field");
    const targetBoard = document.querySelector("#target_field");

    displayBoard(this.player1.oceanBoard.boardInfo, userBoard);
    displayBoard(this.player2.oceanBoard.boardInfo, targetBoard, true);
  }

  endGame(winner) {
    const messageModal = document.querySelector("#end_game_msg");
    const message = document.querySelector(".win_message");

    messageModal.showModal();
    message.textContent = `${winner} won!`;
  }
}
