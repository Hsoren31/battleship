import { Ship, Gameboard } from "./game.js";

/* Ship */

test("hit increases number of hits", () => {
  let testing = new Ship(1);
  testing.hit();

  expect(testing).toEqual({ length: 1, numOfHits: 1, sunkStatus: false });
});

test("multiple hits", () => {
  let testing = new Ship(1);
  testing.hit();
  testing.hit();
  testing.hit();

  expect(testing).toEqual({ length: 1, numOfHits: 3, sunkStatus: false });
});

test("Sink ship", () => {
  let testing = new Ship(3);
  testing.hit();
  testing.hit();
  testing.hit();

  expect(testing.isSunk()).toBe(true);
});

/* Gameboard */
test("Correctly placing Ships on board", () => {
  let gameboard = new Gameboard();
  gameboard.placeShip([
    ["A", 2],
    ["B", 2],
  ]);

  expect(gameboard.oceanInfo[1]).toEqual({
    guess: false,
    hit: false,
    shipExist: { length: 2, numOfHits: 0, sunkStatus: false },
  });
  expect(gameboard.oceanInfo[11]).toEqual({
    guess: false,
    hit: false,
    shipExist: { length: 2, numOfHits: 0, sunkStatus: false },
  });
});

test("Recieve Attack misses", () => {
  let gameboard = new Gameboard();
  gameboard.receiveAttack(["A", 4]);

  expect(gameboard.oceanInfo[3]).toEqual({
    guess: true,
    hit: false,
    shipExist: null,
  });
});

test("Recieve Attack hits && sinks", () => {
  let gameboard = new Gameboard();
  gameboard.placeShip([["B", 4]]);
  gameboard.receiveAttack(["B", 4]);

  expect(gameboard.oceanInfo[13]).toEqual({
    guess: false,
    hit: true,
    shipExist: { length: 1, numOfHits: 1, sunkStatus: true },
  });
});
