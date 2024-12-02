import {
  Gameboard,
  buildBoardInfo,
  generateShipCoordinates,
  avoidOverlap,
  findIndex
} from "./gameboard";

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayBoard(boardInfo, container) {
  clearElement(container);
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    square.className = "square";
    square.dataset.coordinate = boardInfo[i].coordinate;

    if (boardInfo[i].hit !== false) {
      square.classList.add("square_hit");
    }

    if (boardInfo[i].hasShip !== null) {
      square.classList.add("square_ship");
    }

    if (boardInfo[i].guess !== false) {
      square.classList.add("square_guess");
    }

    container.appendChild(square);
  }
}

function getCoordinateFormatted(coordinate) {
  let coordinateFull = Array.from(coordinate);
  let coordinateLetter = coordinateFull.shift();
  let coordinateNum = null;
  if (coordinateFull.length === 2) {
    coordinateNum = coordinateFull.pop();
  } else {
    coordinateNum = coordinateFull.slice(-2).join("");
  }

  let coordinateFormatted = [
    coordinateLetter.toString(),
    parseInt(coordinateNum),
  ];
  return coordinateFormatted;
}

export class Player {
  constructor() {
    this.oceanBoard = new Gameboard();
    this.targetBoard = buildBoardInfo();
  }

  placeFleet(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE) {
    this.oceanBoard.placeShip(coordinateA);
    this.oceanBoard.placeShip(coordinateB);
    this.oceanBoard.placeShip(coordinateC);
    this.oceanBoard.placeShip(coordinateD);
    this.oceanBoard.placeShip(coordinateE);
  }

  placeRandomFleet() {
    function placeCoordinates(board, shipSize) {
      const shipCoordinates = generateShipCoordinates(shipSize);
      if (avoidOverlap(board.boardInfo, shipCoordinates) === true) {
        board.placeShip(shipCoordinates);
      } else {
        placeCoordinates(board, shipSize);
      }
    }

    placeCoordinates(this.oceanBoard, 5);
    placeCoordinates(this.oceanBoard, 4);
    placeCoordinates(this.oceanBoard, 3);
    placeCoordinates(this.oceanBoard, 3);
    placeCoordinates(this.oceanBoard, 2);
  }

  giveAttack(enemy, coordinate) {
    coordinate = getCoordinateFormatted(coordinate);
    let index = findIndex(this.oceanBoard.boardInfo, coordinate);

    if (enemy.oceanBoard.receiveAttack(coordinate) === "hit") {
      this.targetBoard[index].hit = true;
    } else {
      this.targetBoard[index].guess = true;
    }
  }

  randomAttack(enemy) {
    let index = generateIndex(0, 99);
    let coordinate = this.oceanBoard[index].coordinate;

    if (enemy.oceanBoard.receiveAttack(coordinate) === "hit") {
      this.targetBoard[index].hit = true;
    } else {
      this.targetBoard[index].guess = true;
    }
  }

  displayBoards() {
    const userBoard = document.querySelector("#user_field");
    const targetBoard = document.querySelector("#target_field");

    displayBoard(this.oceanBoard.boardInfo, userBoard);
    displayBoard(this.targetBoard, targetBoard);
  }
}
