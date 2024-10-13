import html from "./index.html";
import "./style.css";
import { Player } from "./game/game.js";

const gameContainer  = document.querySelector('#game_container')

function displayBoard(boardInfo, container) {
  for (let i = 0; i < boardInfo.length; i++) {
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

function displayBoards(player){
  const userBoard = document.querySelector("#user_field");
  const targetBoard = document.querySelector("#target_field");

  displayBoard(player.oceanBoard.boardInfo, userBoard);
  displayBoard(player.targetBoard.boardInfo, targetBoard);
}

let userPlayer = new Player();

displayBoards(userPlayer);

gameContainer.addEventListener('click', (e) => {
  console.log(e.target)
})
