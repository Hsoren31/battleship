import html from "./index.html";
import "./style.css";
import { Controller } from "./game/game";

const header = document.querySelector("header");
const startGameBtn = document.querySelector("#start_game");
const gameInstructionsBtn = document.querySelector("#game_instructions");
const instructionsModal = document.querySelector(".instructions");
const closeModal = document.querySelector(".close");
const gameContainer = document.querySelector("#game_container");
const placeFleetBtn = document.querySelector("#place_ships");
const contineGameBtn = document.querySelector("#continue_game");
const targetBoardContainer = document.querySelector("#target_board");

const messageModal = document.querySelector("#end_game_msg");
const restartGame = document.querySelector("#restart_game");

gameInstructionsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  instructionsModal.showModal();
});

startGameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  header.removeAttribute("id", "start_page");
  startGameBtn.style.display = "none";
  contineGameBtn.style.display = "none";
  let ready = false;

  //Set controller
  let controller = new Controller();
  //show the game board
  gameContainer.style.display = "grid";
  controller.displayBoards();

  //Place Fleet of Ships for both players
  placeFleetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    controller.setShips();
    contineGameBtn.style.display = "block";
  });

  contineGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    placeFleetBtn.style.display = "none";
    contineGameBtn.style.display = "none";
    ready = true;
  });
  //Attack
  targetBoardContainer.addEventListener("click", (e) => {
    if (!ready) return;
    if (e.target.classList[0].toLowerCase() === "square") {
      let attack = e.target.dataset.coordinate;
      controller.playRound(attack);
    }
  });
});

restartGame.addEventListener("click", () => {
  window.location.reload();
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  instructionsModal.close();
  messageModal.close();
});
