//Game Controller
import { Player } from './player'
export class Controller{
    constructor(){
        this.player1 = new Player();
        this.player2 = new Player();
    }

    //Methods
    //Start Game
        //Both players place their fleet of ships
    setShips(){
        this.player1.placeRandomFleet()
        this.player2.placeRandomFleet()

        this.player1.displayBoards();
    }
    //switch Player Turns

    //Check that both players placed their ships.
        //Start with Player 1
        //Get attack on player 2
        //Update Boards
        //Check for sunken ship
        //Check for end game

        //repeat for player 2
    playRound(coordinate){
        this.player1.giveAttack(this.player2, coordinate);
        this.player2.randomAttack(this.player1);
        this.player1.displayBoards();
    }

    //End Game
        //Seize attacks
        //Declare Winner
}