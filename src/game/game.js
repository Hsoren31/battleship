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

export { Ship };
