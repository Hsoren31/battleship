import html from "./index.html";
import "./style.css";
import { Player } from "./game/game.js";

function displayBoard(boardInfo, container) {
  for (let i = 0; i < boardInfo.length; i++) {
    let square = document.createElement("div");
    square.className = "square";
    square.dataset.coordinate = boardInfo[i].coordinate;

    container.appendChild(square);
  }
}

const userBoard = document.querySelector("#user_field");
const targetBoard = document.querySelector("#target_field");

let userPlayer = new Player();

displayBoard(userPlayer.oceanBoard.boardInfo, userBoard);
displayBoard(userPlayer.targetBoard.boardInfo, targetBoard);

userBoard.addEventListener("click", (e) => {
  console.log(e.target);
});

targetBoard.addEventListener("click", (e) => {
  console.log(e.target);
});
