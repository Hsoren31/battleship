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

function findCoordinate(board, target) {
  return board[target].coordinate;
}

function findAlpha(targetIndex) {
  //Returns the letter of the passed in index
  const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return alpha[targetIndex];
}

function findAlphaIndex(targetLetter) {
  //Returns the index of the passed in letter
  const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return alpha.findIndex((letter) => letter === targetLetter);
}

function generateIndex() {
  return Math.floor(Math.random() * 99);
}

function generateCoordinate() {
  let board = buildBoardInfo();
  let index = generateIndex();
  return findCoordinate(board, index);
}

function generateAxis() {
  return Math.floor(Math.random() * 2);
}

function generateShip(
  size,
  coordinates = [generateCoordinate()],
  axis = generateAxis(),
) {
  /*
  Takes in a size,
  generates a random starting point,
  from there either goes across or down till it fills the ship size
  */
  let x;
  let y;
  if (size > 1) {
    if (axis === 0) {
      //Y Axis
      x = findAlphaIndex(coordinates[coordinates.length - 1][0]) + 1;
      y = coordinates[0][1];
    } else {
      //X Axis
      x = findAlphaIndex(coordinates[0][0]);
      y = coordinates[coordinates.length - 1][1] + 1;
    }
    coordinates.push([findAlpha(x), y]);
    generateShip(size - 1, coordinates, axis);
  }
  return coordinates;
}

function isShipOnBoard(board, coordinates) {
  return coordinates.every((coordinate) => board[coordinate] !== undefined);
}

function avoidOverlap(board, coordinates) {
  return coordinates.every(
    (coordinate) =>
      board[coordinate] !== undefined && board[coordinate].hasShip === null,
  );
}

function checkSurroundings(board, indexes) {
  /* 
  Put surrounding indexes into an array
  Filter out indexes that don't exist on the board
  Then check that those left over indexes don't have a ship
  */
  let surroundings = [];
  if (indexes[1] - indexes[0] === 10) {
    //Y Axis
    indexes.forEach((index) => {
      surroundings.push(index - 1, index + 1);
    });
    surroundings.push(indexes[0] - 10, indexes[indexes.length - 1] + 10);
  } else {
    //X Axis
    indexes.forEach((index) => {
      surroundings.push(index - 10, index + 10);
    });
    surroundings.push(indexes[0] - 1, indexes[indexes.length - 1] + 1);
  }

  surroundings = surroundings.filter((index) => board[index] !== undefined);
  return surroundings.every(
    (surroundingIndex) => board[surroundingIndex].hasShip === null,
  );
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

  placeShipRandomly(size) {
    let ship = generateShip(size);

    let indexes = [];
    ship.forEach((coordinate) => {
      indexes.push(findIndex(this.boardInfo, coordinate));
    });

    let valid = isShipOnBoard(this.boardInfo, indexes);
    let overlap = avoidOverlap(this.boardInfo, indexes);
    let surroundings = checkSurroundings(this.boardInfo, indexes);

    if (!valid || !overlap || !surroundings) {
      this.placeShipRandomly(size);
      return;
    }

    this.placeShip(ship);
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

  clearBoard() {
    this.boardInfo = buildBoardInfo();
  }
}

export { buildBoardInfo, findIndex, generateIndex };
