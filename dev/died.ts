/// <reference path="game.ts"/>


class Died implements Behaviour{

    private player:Player;

    constructor(p:Player){
        this.player = p
    }

    draw(){   
            
        //calling the singleton to end the game
       let g : Game = Game.getInstance();
       g.endGame();
    
    }  

    onkeydown(){
        
    }  
}