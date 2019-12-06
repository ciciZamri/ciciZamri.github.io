const url = "http://localhost:8000";
let isLoaded = false;

let obj1 = new GameObject(`${url}/assets/maincharacter.png`);

obj1.obj.scale.set(0.2, 0.2);
gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    console.log("running");
    obj1.obj.rotation += 0.02;
}
