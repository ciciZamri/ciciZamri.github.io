let gamestate = {
    score: 0,
    currentPage: 'homepage'
};

let previous = 0;
function gameloop(time) {
    const delta = time - previous;
    previous = time;
    updatePlayer();
    requestAnimationFrame(gameloop);
}

function updatePlayer() {
    if (Player.shouldMove) {
        const x = (Player.player.x - Player.newposition[0]);
        const y = (Player.player.y - Player.newposition[1]);
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        // console.log(x, y, distance);
        if (distance > 0.1) {
            Player.player.x -= (x != 0 ? x / (Math.abs(x)) : 0) * Player.speed;
            Player.player.y -= y / (y == 0 ? 1 : (Math.abs(y))) * (x == 0 || y == 0 ? 1 : (Math.abs(y / x))) * Player.speed;
            //console.log(Player.player.y);
        } else {
            console.log("stop");
            Player.player.x = Player.newposition[0];
            Player.player.y = Player.newposition[1];
            Player.shouldMove = false;
            if (Player.aftermoved != null) Player.aftermoved();
        }
    }
}