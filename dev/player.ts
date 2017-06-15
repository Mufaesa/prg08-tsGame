/// <reference path="gameObject.ts"/>

class Player extends gameObject implements Subject{

    observers:Array<Observer> = new Array<Observer>();

    public behaviour: Behaviour;

    public speed: number;
    public div: HTMLElement;
    public x: number;
    public y: number;
    private state: number;
    private deadState: number = 0;

    

    constructor(parent: HTMLElement) {
        super("player", parent, 100, 143)

        this.behaviour = new Running(this);

        this.speed = 0;

        this.height = Enums.Dimensions.playerHeight;
        this.width = Enums.Dimensions.playerWidth;
        
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    }


    private onKeyDown(e: KeyboardEvent): void {
        console.log(e.key);
        this.behaviour.onkeydown(e);
    }


//Getter and setter to end the game
    public setDead(deadState: number){
        this.deadState = deadState;
    }
    public getDead(){
        return this.deadState;
    }


    public draw(): void {
        this.behaviour.draw();

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
  
    }


//Observer functions
    public subscribe(o:Observer){
        this.observers.push(o);
    } 

    public unsubscribe(o:Observer){

    }


}