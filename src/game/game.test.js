import { Ship } from "./game.js";

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
