import html from "./index.html";
import "./style.css";
import { Player } from "./game/game";

const targetBoardContainer  = document.querySelector('#target_board');

targetBoardContainer.addEventListener('click', (e) => {
  if(e.target.className.toLowerCase() === 'square'){
    let attack = e.target.dataset.coordinate;
    testing1.giveAttack(testing2, attack)
  }
})