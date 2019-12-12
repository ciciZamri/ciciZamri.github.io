class GameObject{
    gameobj;
    speed = 2;
    shouldMove = false;
    newposition = [0, 0];
    aftermoved;

    constructor(sprite){
        this.gameobj = sprite;
    }

    moveto(x, y, callback) {
        console.log("start moving");
        this.newposition[0] = x;
        this.newposition[1] = y;
        this.shouldMove = true;
        this.aftermoved = callback;
    }

    jumpto(x, y){
        this.gameobj.x = x;
        this.gameobj.y = y;
    }
}