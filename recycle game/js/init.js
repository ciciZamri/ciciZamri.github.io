let app = new PIXI.Application({
    width: 1000,
    height: 550,
    antialias: true,
    resolution: 1,
});

document.body.appendChild(app.view);

let url;
let env = 'local';

if (env === 'local') url = "http://localhost:8000";
else url = "https://raw.githubusercontent.com/ciciZamri/cicizamri.github.io/master/recycle%20game";

let assetList = [
    `${url}/assets/maincharacter.png`,
    `${url}/asset2/homepagebg.png`,
    `${url}/asset2/house.png`,
    `${url}/asset2/riverbtn.png`,
    //`${url}/asset2/bus.png`,
    `${url}/asset2/bus.png`,
    `${url}/asset2/shopbtn.png`,
    `${url}/asset2/riverbg.jpg`,
    `${url}/asset2/fieldbg.png`,
    `${url}/asset2/shopbg.jpg`,
    `${url}/asset2/c1l1.png`,
    `${url}/asset2/c2l1.png`,
    `${url}/asset2/c3l1.png`,
    `${url}/asset2/homebtn.png`,
    `${url}/asset2/bottle.png`,
    `${url}/asset2/can.png`,
    `${url}/asset2/paper.png`,
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
let bus;
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
let inventoryContainer = new PIXI.Container();

function setup() {
    const playerSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/maincharacter.png`].texture);
    homepagebg = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/homepagebg.png`].texture);
    house = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/house.png`].texture);
    riverbtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/riverbtn.png`].texture);
    bus = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/bus.png`].texture);
    shopbtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/shopbtn.png`].texture);
    riverbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/riverbg.jpg`].texture);
    fieldbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/fieldbg.png`].texture);
    shopbg = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/shopbg.jpg`].texture);
    c1l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/c1l1.png`].texture);
    c2l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/c2l1.png`].texture);
    c3l1 = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/c3l1.png`].texture);
    homebtn = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/homebtn.png`].texture);
    //inventoryContainer = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/inventorycontainer.png`].texture);

    player = new GameObject(playerSprite);

    //console.log(app.screen.width, app.screen.height);
    homepagebg.scale.set(app.screen.width / homepagebg.width, app.screen.width / homepagebg.width);
    playerSprite.scale.set(0.07, 0.07);
    playerSprite.anchor.set(0.5, 0.5);
    house.scale.set(0.5, 0.5);
    house.anchor.set(0.5, 0.5);
    riverbtn.scale.set(0.9, 0.9);
    riverbtn.anchor.set(0.5, 0.5);
    bus.scale.set(0.3, 0.3);
    bus.anchor.set(0.5, 0.5);
    shopbtn.scale.set(0.3, 0.3);
    shopbtn.anchor.set(0.5, 0.5);
    homebtn.scale.set(0.2, 0.2);
    homebtn.anchor.set(0.5, 0.5);
    homebtn.position.set(50, 50);
    riverbg.scale.set(app.screen.width / riverbg.width, app.screen.width / riverbg.width);
    fieldbg.scale.set(app.screen.width / fieldbg.width, app.screen.width / fieldbg.width);
    shopbg.scale.set(app.screen.width / shopbg.width, app.screen.width / shopbg.width);
    c1l1.scale.set(0.2, 0.2);
    c1l1.anchor.set(0.5, 0.5);
    c2l1.scale.set(0.25, 0.25);
    c2l1.anchor.set(0.5, 0.5);
    c3l1.scale.set(0.17, 0.17);
    c3l1.anchor.set(0.5, 0.5);
    player.gameobj.position.set(400, 350);
    // Player.newposition[0] = player.gameobj.x;
    // Player.newposition[1] = player.gameobj.y;

    homepage.addChild(homepagebg);
    homepage.addChild(house);
    homepage.addChild(riverbtn);
    homepage.addChild(bus);
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

    for(let i = 1 ; i<=3 ; i++){
        let s;
        let con = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/inventorycontainer.png`].texture);
        con.scale.set(0.35, 0.35);
        con.anchor.set(0.5, 0.5);
        con.position.set(1000-i*con.width, 550-50);
        if(i === 1){
            bottleCountText.style.left = `${(1000-i*con.width)}px`;
            s = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/bottle.png`].texture);
            s.scale.set(0.07, 0.07);
        }
        else if(i === 2){
            canCountText.style.left = `${(1000-i*con.width)}px`;
            s = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/can.png`].texture);
            s.scale.set(0.08, 0.08);
        }
        else{
            paperCountText.style.left = `${(1000-i*con.width)}px`;
            s = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/paper.png`].texture);
            s.scale.set(0.03, 0.03);
        }
        s.position.set(1000-i*con.width-20, 550-75);
        inventoryContainer.addChild(con);
        inventoryContainer.addChild(s);
    }
    app.stage.addChild(inventoryContainer);
    app.stage.addChild(player.gameobj);

    riverbtn.on('pointerdown', Scene.gotoriver);
    bus.on('pointerdown', Scene.gotofield);
    shopbtn.on('pointerdown', Scene.gotoshop);
    ItemManager.initialize(30);
    gameloop();
}