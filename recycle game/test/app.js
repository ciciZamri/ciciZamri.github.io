let character1;
let character2;
const url = "http://localhost:8000";

loader
    .add([
        `${url}/assets/maincharacter.png`,
        `${url}/assets/character2.png`
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);

    console.log("progress: " + loader.progress + "%");
}

function setup() {
    character1 = new Sprite(resources[`${url}/assets/maincharacter.png`].texture);
    character2 = new Sprite(resources[`${url}/assets/character2.png`].texture);

    // character1.x = 50;
    // character2.x = 200;

    character1.position.set(50, 200);
    character2.position.set(100, 100);

    character1.scale.set(0.2, 0.2);
    character2.scale.set(0.2, 0.2);

    character2.anchor.x = 0.5;
    character2.anchor.y = 0.5;

    app.stage.addChild(character1);
    app.stage.addChild(character2);

    gameloop();
}

function gameloop() {
    requestAnimationFrame(gameloop);
    character2.rotation += 0.03;
}