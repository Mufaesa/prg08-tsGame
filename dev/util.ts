class Util{
    
//static functions

    public static checkCollision(object1:gameObject, object2:gameObject){
        return (object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.height + object1.y > object2.y) 

    }

    /**
     * verwijder een item uit een array, en verwijder meteen het dom element uit de body
     */
    public static removeFromGame(go:gameObject, arr:Array<any>){
        go.div.remove();
        let i:number = arr.indexOf(go);
        if(i != -1) {
            arr.splice(i, 1);
        }
    }


}