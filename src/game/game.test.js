import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";

/* Ship */
let testShip = new Ship(4)

test("hit increases number of hits", () => {
  testShip.hit();

  expect(testShip).toEqual({ length: 4, numOfHits: 1, sunkStatus: false });
});

test("multiple hits", () => {
  testShip.hit();
  testShip.hit();

  expect(testShip).toEqual({ length: 4, numOfHits: 3, sunkStatus: false });
});

test("Sink ship", () => {
  testShip.hit();

  expect(testShip.isSunk()).toBe(true);
  expect(testShip.sunkStatus).toBe(true)
});

/* Gameboard */
let testGameboard = new Gameboard();
testGameboard.placeShip([
  ["A", 1],
  ["A", 2]
])
testGameboard.placeShip([
  ["H", 10],
  ["I", 10],
  ["J", 10]
])
testGameboard.placeShip([
  ["G", 6],
  ["G", 7],
  ["G", 8]
])
testGameboard.placeShip([
  ["C", 4],
  ["D", 4],
  ["E", 4]
])
testGameboard.placeShip([
  ["J", 3],
  ["J", 4],
  ["J", 5]
])


test("Correctly placing Ships on board", () => {
  expect(testGameboard.boardInfo[92].hasShip).toEqual({
    length: 3,
    numOfHits: 0,
    sunkStatus: false,
  });
  expect(testGameboard.boardInfo[93].hasShip).toEqual({
    length: 3,
    numOfHits: 0,
    sunkStatus: false,
  });
  expect(testGameboard.boardInfo[94].hasShip).toEqual({
    length: 3,
    numOfHits: 0,
    sunkStatus: false,
  });
});

test("Recieve Attack misses", () => {
  testGameboard.receiveAttack(["B", 4])

  expect(testGameboard.boardInfo[13]).toHaveProperty("hit", false);
  expect(testGameboard.boardInfo[13]).toHaveProperty("guess", true);
});

test("Recieve Attack hits && sinks", () => {
  testGameboard.receiveAttack(["H", 10]);
  testGameboard.receiveAttack(["I", 10]);
  testGameboard.receiveAttack(["J", 10]);

  expect(testGameboard.boardInfo[89]).toHaveProperty("hit", true);
  expect(testGameboard.boardInfo[89].hasShip).toHaveProperty("sunkStatus", true);
});

test("Fleet of Ships is not sunk", () => {
  testGameboard.receiveAttack(["A", 1]);
  testGameboard.receiveAttack(["G", 6]);
  testGameboard.receiveAttack(["G", 8]);
  testGameboard.receiveAttack(["D", 4]);
  testGameboard.receiveAttack(["J", 3]);
  testGameboard.receiveAttack(["J", 4]);

  expect(testGameboard.isFleetSunk()).toBe(false);
});

test("Fleet of Ships is sunk", () => {
  testGameboard.receiveAttack(["A", 2]);
  testGameboard.receiveAttack(["G", 7]);
  testGameboard.receiveAttack(["C", 4]);
  testGameboard.receiveAttack(["E", 4]);
  testGameboard.receiveAttack(["J", 5]);

  expect(testGameboard.isFleetSunk()).toBe(true);
});



/* Player */
let testPlayer1 = new Player();
let testPlayer2 = new Player();
testPlayer1.oceanBoard.placeShip([
  ["H", 5],
  ["H", 6],
]);

testPlayer2.oceanBoard.placeShip([["H", 3]]);

test("Give Attack", () => {
  //give attack call recieveAttack on enemy board
  testPlayer1.giveAttack(testPlayer2, ["H", 3]);

  expect(testPlayer2.oceanBoard.boardInfo[72]).toHaveProperty("hit", true);
});

test("Give Attack Misses", () => {
  testPlayer1.giveAttack(testPlayer2, ["H", 4]);

  expect(testPlayer2.oceanBoard.boardInfo[73]).toHaveProperty("guess", true);
});

test("Sink Ship with Attacks", () => {
  testPlayer2.giveAttack(testPlayer1, ["H", 5]);
  testPlayer2.giveAttack(testPlayer1, ["H", 6]);

  expect(testPlayer1.oceanBoard.boardInfo[74].hasShip).toHaveProperty(
    "sunkStatus",
    true,
  );
  expect(testPlayer1.oceanBoard.boardInfo[75].hasShip).toHaveProperty(
    "sunkStatus",
    true,
  );
});

test("Reject attack on previous attack", () => {
  testPlayer2.giveAttack(testPlayer1, ["H", 5]);
  
  expect(testPlayer2.giveAttack(testPlayer1, ["H", 5])).toBe(false)
})