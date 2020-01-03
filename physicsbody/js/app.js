const fpsText = document.querySelector("#fps");
const view = new ViewPort(viewportContainer);
view.createView();
ParticlesManager.createParticles(500, view);

let digit = 0;
let forceStrength = 500;
const pointIndex = [
    [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],
    [2, 4, 7, 9, 12],
    [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12],
    [0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 12],
    [0, 2, 3, 4, 5, 6, 7, 9, 12],
    [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12],
    [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    [0, 1, 2, 4, 7, 9, 12],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12],
];

setInterval(() => {
    digit = (digit + 1) % 10;
    console.log(digit);
    for (let i = 0; i < 13; i++) {
        ParticlesManager.pointforces[i][0] = 0;
    }
    for (let j of pointIndex[digit]) {
        ParticlesManager.pointforces[j][0] = forceStrength * 1000;
        //console.log(ParticlesManager.pointforces[i][0]);
        //console.log(j);
    }
    // for (let i = 0; i < 13; i++) {
    //     console.log(ParticlesManager.pointforces[i][0]);
    // }
}, 8000);

setTimeout(()=>{
    setInterval(()=>{
        for (let i = 0; i < 13; i++) {
            ParticlesManager.pointforces[i][0] = 0;
        }
    }, 8000);
}, 7000);

let previousTime = 0;
function loop(time) {
    let delta = time - previousTime;
    fpsText.innerHTML = `${Math.round(1000 / delta * 100) / 100} fps`;
    previousTime = time;
    for (let p of ParticlesManager.particles) {
        p.update(delta / 1000)
    }
    //ParticlesManager.checkCollision();
    view.render();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
