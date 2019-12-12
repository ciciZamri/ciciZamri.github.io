let app = new PIXI.Application({
    width: 1000,
    height: 500,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);

let url;
let env = 'notlocal';

if (env === 'local') url = "http://localhost:8000";
else url = "https://raw.githubusercontent.com/ciciZamri/cicizamri.github.io/master/recycle%20game";

let assetList = [
    `${url}/assets/maincharacter.png`,
    `${url}/assets/homepagebg.png`,
    `${url}/assets/house.png`,
    `${url}/assets/riverbtn.png`,
    `${url}/assets/fieldbtn.png`,
    `${url}/assets/shopbtn.png`,
    `${url}/assets/riverbg.png`,
    `${url}/assets/fieldbg.png`,
    `${url}/assets/shopbg.png`,
    `${url}/assets/c1l1.png`,
    `${url}/assets/c2l1.png`,
    `${url}/assets/c3l1.png`,
    `${url}/assets/homebtn.png`,
    `${url}/assets/bottle.png`,
    `${url}/assets/can.png`,
    `${url}/assets/paper.png`,
    `${url}/assets/inventorycontainer.png`
];

PIXI.loader.add(assetList).on("progress", (loader, resource) => {
    // console.log("loading: " + resource.url);
    // console.log("progress: " + loader.progress + "%");
}).load(setup);

let player;
let homepagebg;
let house;
let riverbtn;
let fieldbtn;
let shopbtn;
let riverbg;
let fieldbg;
let shopbg;
let c1l1;
let c2l1;
let c3l1;
let homebtn;

const homepage = new PIXI.Container();
const river = new PIXI.Container();
const field = new PIXI.Container();
const shop = new PIXI.Container();

function setup() {
    const playerSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/maincharacter.png`].texture);
    homepagebg = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/homepagebg.png`].texture);
    house = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/house.png`].texture);
    riverbtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/riverbtn.png`].texture);
    fieldbtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/fieldbtn.png`].texture);
    shopbtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/shopbtn.png`].texture);
    riverbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/riverbg.png`].texture);
    fieldbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/fieldbg.png`].texture);
    shopbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/shopbg.png`].texture);
    c1l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/c1l1.png`].texture);
    c2l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/c2l1.png`].texture);
    c3l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/c3l1.png`].texture);
    homebtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/homebtn.png`].texture);
    //inventoryContainer = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/inventorycontainer.png`].texture);

    player = new GameObject(playerSprite);

    //console.log(app.screen.width, app.screen.height);
    homepagebg.scale.set(app.screen.width / homepagebg.width, app.screen.width / homepagebg.width);
    playerSprite.scale.set(0.07, 0.07);
    playerSprite.anchor.set(0.5, 0.5);
    house.scale.set(0.3, 0.3);
    house.anchor.set(0.5, 0.5);
    riverbtn.scale.set(0.3, 0.3);
    riverbtn.anchor.set(0.5, 0.5);
    fieldbtn.scale.set(0.3, 0.3);
    fieldbtn.anchor.set(0.5, 0.5);
    shopbtn.scale.set(0.2, 0.2);
    shopbtn.anchor.set(0.5, 0.5);
    homebtn.scale.set(0.2, 0.2);
    homebtn.anchor.set(0.5, 0.5);
    homebtn.position.set(50, 50);
    riverbg.scale.set(app.screen.width / riverbg.width, app.screen.width / riverbg.width);
    fieldbg.scale.set(app.screen.width / fieldbg.width, app.screen.width / fieldbg.width);
    shopbg.scale.set(app.screen.width / shopbg.width, app.screen.width / shopbg.width);
    c1l1.scale.set(0.15, 0.15);
    c1l1.anchor.set(0.5, 0.5);
    c2l1.scale.set(0.15, 0.15);
    c2l1.anchor.set(0.5, 0.5);
    c3l1.scale.set(0.15, 0.15);
    c3l1.anchor.set(0.5, 0.5);
    player.gameobj.position.set(app.screen.width / 2, 200);
    // Player.newposition[0] = player.gameobj.x;
    // Player.newposition[1] = player.gameobj.y;

    homepage.addChild(homepagebg);
    homepage.addChild(house);
    homepage.addChild(riverbtn);
    homepage.addChild(fieldbtn);
    homepage.addChild(shopbtn);
    homepage.addChild(c1l1);
    homepage.addChild(c2l1);
    homepage.addChild(c3l1);

    river.addChild(riverbg);

    field.addChild(fieldbg);

    shop.addChild(shopbg);

    homebtn.interactive = true;
    homebtn.buttonMode = true;
    homebtn.on('pointerdown', () => {
        Scene.gotohomepage();
    });

    Scene.loadhomepage();
    app.stage.addChild(player.gameobj);

    riverbtn.on('pointerdown', Scene.gotoriver);
    fieldbtn.on('pointerdown', Scene.gotofield);
    shopbtn.on('pointerdown', Scene.gotoshop);
    gameloop();
}