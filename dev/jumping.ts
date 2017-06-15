class Jumping implements Behaviour{

    private player:Player;
    private jumpDirection: number;

    constructor(p:Player){
        this.player = p;
        this.jumpDirection = -18;
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onkeydown(e));
    }

    draw(){
        this.player.x += this.player.speed;
        this.player.y += this.jumpDirection;
        this.jumpDirection += 1;

        if (this.player.y > 140){
            this.player.behaviour = new Running(this.player);
        } 
    }

    onkeydown(e: KeyboardEvent){
     //        this.player.behaviour = new DoubleJumping(this.player);
    }
}