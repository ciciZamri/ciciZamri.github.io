class Player{
    static player;
    static speed = 2;
    static shouldMove;
    static newposition = [0, 0];
    static aftermoved;

    static moveto(x, y, callback) {
        console.log("start moving");
        Player.newposition[0] = x;
        Player.newposition[1] = y;
        Player.shouldMove = true;
        this.aftermoved = callback;
    }

    static jumpto(x, y){
        this.player.x = x;
        this.player.y = y;
    }
}