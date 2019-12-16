const fps = document.querySelector("#fps");

let previous = 0;
function gameloop(time) {
    const delta = time - previous;
    previous = time;
    fps.innerHTML = `${((1/delta)*1000).toFixed(3)}`;
    updatePlayer();
    for(let i of ItemManager.rawItems){
        i.updateLocation();
    }
    for(let j of coins){
        j.updateLocation();
    }
    bus.updateLocation();
    requestAnimationFrame(gameloop);
}

function updatePlayer() {
    if (player.shouldMove) {
        const x = (player.gameobj.x - player.newposition[0]);
        const y = (player.gameobj.y - player.newposition[1]);
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        const xx = Math.abs(x/distance);
        const yy = Math.abs(y/distance);
        //console.log(x, y, distance');
        if (distance > player.speed) {
            const _x = (x != 0 ? (x / (Math.abs(x)))*xx : 0) * player.speed;
            //const _y = y / (y == 0 ? 1 : (Math.abs(y))) * (x == 0 || y == 0 ? 1 : (Math.abs(y / x))) * player.speed;
            const _y = (y != 0 ? (y / (Math.abs(y)))*yy : 0) * player.speed;
            
            player.gameobj.x -= _x;
            player.gameobj.y -= _y;
            //console.log(x, y, distance, _x, _y);
        } else {
            console.log("stop");
            player.gameobj.x = player.newposition[0];
            player.gameobj.y = player.newposition[1];
            player.shouldMove = false;
            if (player.aftermoved != null) player.aftermoved();
        }
    }
}