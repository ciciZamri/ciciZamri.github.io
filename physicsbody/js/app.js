const fpsText = document.querySelector("#fps");
const view = new ViewPort(viewportContainer);
view.createView();
ParticlesManager.createParticles(300, view);

let previousTime = 0;
function loop(time) {
    let delta = time - previousTime;
    fpsText.innerHTML = `${Math.round(1000 / delta * 100) / 100} fps`;
    previousTime = time;
    for (let p of ParticlesManager.particles) {
        p.update(delta / 1000)
    }
    ParticlesManager.checkCollision();
    view.render();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
