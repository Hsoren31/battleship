import html from "./index.html";
import "./style.css";
import { Player } from "./game/game";

const gameContainer  = document.querySelector('#game_container')

gameContainer.addEventListener('click', (e) => {
  console.log(e.target)
})