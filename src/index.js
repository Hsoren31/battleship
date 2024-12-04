import html from "./index.html";
import "./style.css";
import { Controller } from "./game/game";

const startGameBtn = document.querySelector("#start_game");
const gameContainer = document.querySelector("#game_container");
const placeFleetBtn = document.querySelector("#place_ships");
const targetBoardContainer = document.querySelector("#target_board");

startGameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startGameBtn.style.display = 'none'
  //Set controller
  let controller = new Controller();
  //show the game board
  gameContainer.style.display = "flex";
  controller.player1.displayBoards();

  //Place Fleet of Ships for both players
  placeFleetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    controller.setShips();
    placeFleetBtn.style.display = "none";
  });

  //Attack
  targetBoardContainer.addEventListener("click", (e) => {
    if (e.target.className.toLowerCase() === "square") {
      let attack = e.target.dataset.coordinate;
      controller.playRound(attack)
    }
  });
});
