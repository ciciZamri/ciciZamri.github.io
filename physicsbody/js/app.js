const fpsText = document.querySelector("#fps");
let view = new ViewPort(viewportContainer);
view.createView();
let l = [];
for (let i = 0; i < 40; i++) {
    const o = view.addObject();
    l.push(new PhysicsBody(o, PhysicsBody.radius, Math.random() * 100, Math.random() * 100));
}

let previousTime = 0;
function loop(time) {
    let delta = time - previousTime;
    fpsText.innerHTML = `${Math.round(1000 / delta * 100) / 100} fps`;
    previousTime = time;
    for (let p of l) {
        p.update(delta / 1000)
    }
    view.render();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function checkCollision(){
    for(let i = 0 ; i<l.length ; i++){
        for(let j = i+1 ; j<l.length ; j++){
            const xx = Math.pow(l[i].obj.position.x - l[j].obj.position.x, 2);
            const yy = Math.pow(l[i].obj.position.y - l[j].obj.position.y, 2);
            const distance = Math.sqrt(xx+yy);
            if(distance < PhysicsBody.radius*2){
            }
        }
    }
}