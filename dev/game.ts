/// <reference path="gameObject.ts"/>
/// <reference path="util.ts"/>
/// <reference path="player.ts"/>

class Game {

    //singleton declaration
    private static instance : Game;

    private player : Player;
    private block : Block;
    private GO:Array<gameObject> = new Array<gameObject>(); 

    public score: number = 0;

   private constructor() {
        let container = document.getElementById("container");
        this.GO.push(this.player = new Player(container));
        for(let c = 2000; c<4000; c+=Math.floor(Math.random() * 500) + 200 ){
            console.log("block created");
            this.GO.push(new Block(container, c, -5, this.player));
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }

//singleton call
     public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

//calling gameLoop
    private gameLoop(){
        if(this.score > 0 && this.score < 99){
                document.getElementById("welcome").innerHTML = "Welcome to 0909257" ;
        }
        if(this.score > 100 && this.score < 159){
                document.getElementById("welcome").innerHTML = "Press any key to jump";
        }
        if(this.score > 200 && this.score < 199){
                document.getElementById("welcome").innerHTML = "Good luck and have fun!";
        }
        if(this.score > 239 ){
                document.getElementById("welcome").innerHTML = "";
        }

//Polymorphism
        for (let g of this.GO) {
            if(g instanceof Player){
                g.draw();
            }
            if(g instanceof Block){
                g.draw();
            if(Util.checkCollision(g, this.player)){
                this.player.behaviour = new Died(this.player);
                console.log("endgame");
                for(let o of this.player.observers){
                    o.notify();
                }
            } else {
                this.updateScore();
            }
            if(g.x <= -30){
                Util.removeFromGame(g, this.GO);
                console.log(this.GO.length);
                }  
            }
        }

        if(this.GO.length == 1){
            this.wonGame();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
    

    private updateScore(){
        if(this.player.getDead() == 1){
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score) + ", press f5 to play again";
        } else {
            this.score += 0.1;
            document.getElementById("score").innerHTML = "Score : " + Math.round(this.score);
        }
    }

    public endGame(){

        //Implementation of TweenLite library, calling down score when game is over
        let endDiv = document.getElementById("welcome");
        endDiv.innerHTML = "Game Over<br>Score: "+ Math.round(this.score);
        TweenLite.to(endDiv, 2, { ease: SlowMo.ease.config(0.7, 0.7, false), y: 400});

        this.player.setDead(1);
        this.player.div.classList.add("crashed");
        document.getElementById("plateau").classList.add("animationpaused");
        document.getElementById("sky").classList.add("animationpaused");
    }

    public wonGame(){
        let endDiv = document.getElementById("welcome");
        endDiv.innerHTML = "Well done!<br>Your final score: "+ Math.round(this.score) +"<br> press f5 to restart";
        TweenLite.to(endDiv, 2, { ease: SlowMo.ease.config(0.7, 0.7, false), y: 400});
    }
     
} 


// load using singleton
window.addEventListener("load", function() {
    Game.getInstance();
});