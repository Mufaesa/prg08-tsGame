//Abstract class
abstract class gameObject{

    public speed:number;
    public x: number;
    public y:number;
    public div:HTMLElement;

    public height:number;
    public width:number;

    constructor(str:string, parent:HTMLElement, x:number, y:number ){
        this.div = document.createElement(str);
        parent.appendChild(this.div);

        this.x = x;
        this.y = y;
    }
}