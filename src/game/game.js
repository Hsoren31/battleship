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

class Ship {
  constructor(length) {
    this.length = length;
    this.numOfHits = 0;
    this.sunkStatus = false;
  }

  hit() {
    return (this.numOfHits = this.numOfHits + 1);
  }

  isSunk() {
    if (this.length === this.numOfHits) {
      return (this.sunkStatus = true);
    } else {
      return false;
    }
  }
}

class Gameboard {
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

class Player {
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

  giveAttack(enemy, coordinate) {
    coordinate = getCoordinateFormatted(coordinate);
    let index = findIndex(this.oceanBoard.boardInfo, coordinate);

    if (enemy.oceanBoard.receiveAttack(coordinate) === "hit") {
      this.targetBoard[index].hit = true;
    } else {
      this.targetBoard[index].guess = true;
    }

    this.displayBoards();
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

  placeRandomFleet() {
    function placeCoordinates(board, shipSize) {
      const shipCoordinates = generateShipCoordinates(shipSize);
      if (avoidOverlap(board.boardInfo, shipCoordinates) === true){
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

  displayBoards() {
    const userBoard = document.querySelector("#user_field");
    const targetBoard = document.querySelector("#target_field");

    displayBoard(this.oceanBoard.boardInfo, userBoard);
    displayBoard(this.targetBoard, targetBoard);
  }
}

export { Ship, Gameboard, Player };