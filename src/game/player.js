import {
  Gameboard,
  buildBoardInfo,
  findIndex,
  generateIndex,
} from "./gameboard";

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
  }

  placeFleet(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE) {
    this.oceanBoard.placeShip(coordinateA);
    this.oceanBoard.placeShip(coordinateB);
    this.oceanBoard.placeShip(coordinateC);
    this.oceanBoard.placeShip(coordinateD);
    this.oceanBoard.placeShip(coordinateE);
  }

  placeRandomFleet() {
    this.oceanBoard.placeShipRandomly(5);
    this.oceanBoard.placeShipRandomly(4);
    this.oceanBoard.placeShipRandomly(3);
    this.oceanBoard.placeShipRandomly(3);
    this.oceanBoard.placeShipRandomly(2);
  }

  giveAttack(enemy, coordinate) {
    coordinate = getCoordinateFormatted(coordinate);
    enemy.oceanBoard.receiveAttack(coordinate);
  }

  randomAttack(enemy) {
    let index = generateIndex(0, 99);
    let coordinate = this.oceanBoard.boardInfo[index].coordinate;
    enemy.oceanBoard.receiveAttack(coordinate);
  }
}
