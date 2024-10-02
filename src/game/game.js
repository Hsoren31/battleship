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

function makeGrid() {
  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  let board = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 1; j < 11; j++) {
      board.push([alpha[i], j]);
    }
  }

  return board;
}

function buildBoardInfo(board) {
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard[i] = {
      guess: false,
      hit: false,
      shipExist: null,
    };
  }

  return newBoard;
}

function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === target[0] && arr[i][1] === target[1]) {
      return i;
    }
  }
}

class Gameboard {
  constructor() {
    this.oceanGrid = makeGrid();
    this.oceanInfo = buildBoardInfo(this.oceanGrid);
  }

  placeShip(coordinates) {
    let ship = new Ship(coordinates.length);
    coordinates.forEach((coordinate) => {
      let index = findIndex(this.oceanGrid, coordinate);
      return (this.oceanInfo[index].shipExist = ship);
    });
  }

  receiveAttack(coordinate) {
    let index = findIndex(this.oceanGrid, coordinate);
    if (this.oceanInfo[index].shipExist !== null) {
      //Increase Ship hit count, check if ship sunk
      this.oceanInfo[index].shipExist.hit();
      this.oceanInfo[index].shipExist.isSunk();
      //Update Board info to show index is a hit
      this.oceanInfo[index].hit = true;
      return ('hit');
    } else {
      //Update Board info to show index is a miss
      this.oceanInfo[index].guess = true
      return ('miss');
    }
  }
}

class Player {
  constructor(){
    //Player sees their own ships 
    this.oceanBoard = new Gameboard();
    //Players sees the hit/miss they've made on the enemy
    this.targetBoard = new Gameboard();
  }

  giveAttack(enemy, coordinate){
    let index = findIndex(this.oceanBoard.oceanGrid, coordinate);

    if(enemy.oceanBoard.receiveAttack(coordinate) === 'hit'){
      this.targetBoard.oceanInfo[index].hit = true;
    } else {
      this.targetBoard.oceanInfo[index].guess = true;
    }
  }
}

export { Ship, Gameboard, Player };