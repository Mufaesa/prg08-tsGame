/// <reference path="gameObject.ts"/>

class Block extends gameObject implements Observer{

    public speed:number;
    public div:HTMLElement;
    public x:number;
    public y:number;
    public balloon: TextBalloon;
            
    constructor(parent:HTMLElement, x: number, speed:number, s:Subject) {
        super("block", parent, x, 240);

        s.subscribe(this);

        this.height = Enums.Dimensions.blockHeight;
        this.width = Enums.Dimensions.blockWidth;

        this.speed = speed;;
   
    }

    //Observer action
    public notify(){
        this.speed = 0;
    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

}