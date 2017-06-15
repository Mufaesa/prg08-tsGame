class TextBalloon extends gameObject{

    public div:HTMLElement;
    public x:number;
    public y:number;

    constructor(parent: HTMLElement){
        super("textBalloon", parent, 0, -60)

    }

    public draw():void {
        this.x += this.speed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }
}