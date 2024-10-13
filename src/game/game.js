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

function displayBoard(boardInfo, container) {
  for (let i = 0; i < 100; i++) {
    let square = document.createElement("div");
    square.className = "square";
    square.dataset.coordinate = boardInfo[i].coordinate;

    if(boardInfo[i].hit !== false){
      square.classList.add('square_hit')
    }

    if(boardInfo[i].hasShip !== null){
      square.classList.add('square_ship')
    }

    if(boardInfo[i].guess !== false){
      square.classList.add('square_guess')
    }

    container.appendChild(square);
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
}

class Player {
  constructor() {
    //Player sees their own ships
    this.oceanBoard = new Gameboard();
    //Players sees the hit/miss they've made on the enemy
    this.targetBoard = new Gameboard();
  }

  placeShips(coordinatesA, coordinatesB, coordinatesC, coordinatesD, coordinatesE){
   this.oceanBoard.placeShip(coordinatesA)
   this.oceanBoard.placeShip(coordinatesB)
   this.oceanBoard.placeShip(coordinatesC)
   this.oceanBoard.placeShip(coordinatesD)
   this.oceanBoard.placeShip(coordinatesE)
  }

  giveAttack(enemy, coordinate) {
    let index = findIndex(this.oceanBoard.boardInfo, coordinate);

    if (enemy.oceanBoard.receiveAttack(coordinate) === "hit") {
      this.targetBoard.boardInfo[index].hit = true;
    } else {
      this.targetBoard.boardInfo[index].guess = true;
    }
  }

  displayBoards(){
    const userBoard = document.querySelector("#user_field");
    const targetBoard = document.querySelector("#target_field");
  
    displayBoard(this.oceanBoard.boardInfo, userBoard);
    displayBoard(this.targetBoard.boardInfo, targetBoard);
  }
}

export { Ship, Gameboard, Player };
