import { Ship } from "./ship";

function makeCoordinates() {
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let board = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 1; j < 11; j++) {
      board.push([alpha[i], j]);
    }
  }

  return board;
}

function buildBoardInfo() {
  let newBoard = [];
  let coordinates = makeCoordinates();
  for (let i = 0; i < coordinates.length; i++) {
    newBoard[i] = {
      coordinate: coordinates[i],
      guess: false,
      hit: false,
      hasShip: null,
    };
  }

  return newBoard;
}

function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].coordinate[0] === target[0] &&
      arr[i].coordinate[1] === target[1]
    ) {
      return i;
    }
  }
}

function findCoordinate(index) {
  const tempBoard = buildBoardInfo();
  return tempBoard[index].coordinate;
}

function findAlpha(letter) {
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return alpha.indexOf(letter);
}

function generateIndex() {
  return Math.floor(Math.random() * 99);
}

function generateCoordinate() {
  return findCoordinate(generateIndex());
}

function generateAxis() {
  let axis = Math.floor(Math.random() * 2);

  if (axis === 0) {
    return "x";
  } else {
    return "y";
  }
}

function generateShipCoordinates(
  shipSize,
  coordinates = [generateCoordinate()],
  axis = generateAxis(),
) {
  const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let x = null;
  let y = null;

  if (shipSize > 1) {
    if (axis === "x") {
      x = findAlpha(coordinates[coordinates.length - 1][0]) + 1;
      y = coordinates[coordinates.length - 1][1];
    } else if (axis === "y") {
      x = findAlpha(coordinates[coordinates.length - 1][0]);
      y = coordinates[coordinates.length - 1][1] + 1;
    }
    coordinates.push([alpha[x], y]);
    generateShipCoordinates(shipSize - 1, coordinates, axis);
  }
  return coordinates;
}

function avoidOverlap(board, coordinates) {
  const indexes = [];
  coordinates.forEach((coordinate) => {
    indexes.push(findIndex(board, coordinate));
  });

  let validValues = indexes.every((index) => {
    return index !== undefined;
  });

  if (validValues === true) {
    return indexes.every((index) => {
      return board[index].hasShip === null;
    });
  } else {
    return false;
  }
}

export class Gameboard {
  constructor() {
    this.boardInfo = buildBoardInfo();
  }

  placeShip(coordinates) {
    let ship = new Ship(coordinates.length);
    coordinates.forEach((coordinate) => {
      let index = findIndex(this.boardInfo, coordinate);
      return (this.boardInfo[index].hasShip = ship);
    });
  }

  receiveAttack(coordinate) {
    let index = findIndex(this.boardInfo, coordinate);
    if (this.boardInfo[index].hasShip !== null) {
      //Increase Ship hit count, check if ship sunk
      this.boardInfo[index].hasShip.hit();
      this.boardInfo[index].hasShip.isSunk();
      //Update Board info to show index is a hit
      this.boardInfo[index].hit = true;
      return "hit";
    } else {
      //Update Board info to show index is a miss
      this.boardInfo[index].guess = true;
      return "miss";
    }
  }

  isFleetSunk() {
    const ships = this.boardInfo.filter((index) => {
      return index.hasShip !== null;
    });

    return ships.every((ship) => {
      return ship.hasShip.sunkStatus !== false;
    });
  }
}

export { buildBoardInfo, generateShipCoordinates, avoidOverlap, findIndex };
