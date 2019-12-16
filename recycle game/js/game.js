let scoreText = document.querySelector("#score");
let coinText = document.querySelector("#coin");
let paperCountText = document.querySelector("#paper-count");
let bottleCountText = document.querySelector("#bottle-count");
let canCountText = document.querySelector("#can-count");

let gamestate = {
    score: 0,
    coin: 0,
    currentPage: 'homepage',
    containerCapacity: 7,
    paperCount: 0,
    bottleCount: 0,
    canCount: 0
};

class Scene {
    static gotofields() {
        player.moveto(app.screen.width - 310, 350, () => {
            player.moveto(app.screen.width - 315, 180, () => {
                gamestate.currentPage = 'field';
                console.log("go to field");
                app.stage.removeChild(homepage);
                app.stage.addChild(field);
                app.stage.addChild(homebtn);
                app.stage.addChild(player.gameobj);
                ItemManager.instantiate();
                app.stage.addChild(inventoryContainer);
                player.jumpto(0, app.screen.height / 2);
                player.moveto(30, app.screen.height / 2, null);
            });
        });
    }

    static gotofield() {
        player.moveto(app.screen.width - 310, 350, () => {
            player.moveto(app.screen.width - 315, 180, () => {
                app.stage.removeChild(player.gameobj);
                bus.moveto(app.screen.width, 180, () => {
                    gamestate.currentPage = 'field';
                    console.log("go to field");
                    app.stage.removeChild(homepage);
                    app.stage.addChild(field);
                    app.stage.addChild(homebtn);
                    app.stage.addChild(player.gameobj);
                    ItemManager.instantiate();
                    app.stage.addChild(inventoryContainer);
                    player.jumpto(0, app.screen.height / 2);
                    player.moveto(30, app.screen.height / 2, null);
                });

            });
        });
    }

    static gotoshop() {
        if (player.gameobj.x > app.screen.width - 300) {
            player.moveto(app.screen.width - 310, 350, () => {
                player.moveto(app.screen.width - 370, 350, () => {
                    player.moveto(90, 450, () => {
                        gamestate.currentPage = 'shop';
                        app.stage.removeChild(homepage);
                        app.stage.addChild(shop);
                        app.stage.addChild(homebtn);
                    });
                });
            });
        }
        else {
            player.moveto(90, 450, () => {
                gamestate.currentPage = 'shop';
                app.stage.removeChild(homepage);
                app.stage.addChild(shop);
                app.stage.addChild(homebtn);
            });
        }

    }

    static gotohomepage() {
        let ypos;
        if (gamestate.currentPage === 'shop') {
            Scene.loadhomepage();
        }
        else {
            if (gamestate.currentPage === 'river'){
                ypos = 350;
                player.moveto(0, app.screen.height / 2, () => {
                    Scene.loadhomepage();
                    player.jumpto(app.screen.width, ypos);
                    player.moveto(app.screen.width - 100, ypos, null);
                });
            }
            else if (gamestate.currentPage === 'field'){
                ypos = 180;
                bus.jumpto(app.screen.width, 180);
                player.moveto(0, app.screen.height/2, ()=>{
                    Scene.loadhomepage();
                    app.stage.removeChild(player.gameobj);
                    bus.moveto(app.screen.width - 310, ypos, ()=>{
                        player.jumpto(app.screen.width-310, ypos+30);
                        app.stage.addChild(player.gameobj);
                        //player.moveto(app.screen.width - 100, ypos, null);
                    });
                });
            }
        }
    }

    static loadhomepage() {
        gamestate.currentPage = 'homepage';
        app.stage.addChild(homepage);
        app.stage.addChild(player.gameobj);
        app.stage.addChild(inventoryContainer);

        house.position.set(270, 300);

        riverbtn.position.set(app.screen.width - 100, 400);
        riverbtn.interactive = true;
        riverbtn.buttonMode = true;

        shopbtn.position.set(80, 450);
        shopbtn.interactive = true;
        shopbtn.buttonMode = true;

        c1l1.position.set(100, 200);
        c2l1.position.set(200, 180);
        c3l1.position.set(300, 200);
    }

    static gotoriver() {
        player.moveto(app.screen.width - 100, 350, () => {
            gamestate.currentPage = 'river';
            app.stage.removeChild(homepage);
            app.stage.addChild(river);
            app.stage.addChild(homebtn);
            app.stage.addChild(player.gameobj);
            console.log("go to river");
            player.jumpto(10, app.screen.height / 2);
            player.moveto(30, app.screen.height / 2, null);
            app.stage.addChild(inventoryContainer);
        });
    }
}

class Item extends GameObject {
    type;
    price;

    constructor(sprite, type) {
        super(sprite);
        this.type = type;
        this.speed = 10;
        //console.log(this.type);
        this.gameobj.interactive = true;
        this.gameobj.buttonMode = true;
        this.assignPrice();
        this.assignEventListener();
    }

    assignPrice() {
        switch (this.type) {
            case "paper": this.price = 15; break;
            case "bottle": this.price = 20; break;
            case "can": this.price = 30; break;
        }
    }

    assignEventListener() {
        console.log(this.type, this.price);
        this.gameobj.on('pointerdown', () => {
            player.moveto(this.gameobj.x, this.gameobj.y, () => {
                this.moveto(800, 500, () => {
                    app.stage.removeChild(this.gameobj);
                    gamestate.score += 30;
                    switch (this.type) {
                        case "paper": gamestate.paperCount = (gamestate.paperCount < gamestate.containerCapacity ? gamestate.paperCount + 1 : gamestate.paperCount); break;
                        case "bottle": gamestate.bottleCount = (gamestate.bottleCount < gamestate.containerCapacity ? gamestate.bottleCount + 1 : gamestate.bottleCount); break;
                        case "can": gamestate.canCount = (gamestate.canCount < gamestate.containerCapacity ? gamestate.canCount + 1 : gamestate.canCount); break;
                    }
                    updateUI();
                });
            });
            console.log(`${this.type} clicked ${this.gameobj.x} ${this.gameobj.y} ${this.price}`);
        });
    }

    clickedListener() {
        console.log(`${this.type} clicked ${this.gameobj} ${this.gameobj} ${this.price}`);
    }

    updateLocation() {
        if (this.shouldMove) {
            const x = (this.gameobj.x - this.newposition[0]);
            const y = (this.gameobj.y - this.newposition[1]);
            const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

            const xx = Math.abs(x / distance);
            const yy = Math.abs(y / distance);
            //console.log(x, y, distance');
            if (distance > this.speed) {
                const _x = (x != 0 ? (x / (Math.abs(x))) * xx : 0) * this.speed;
                //const _y = y / (y == 0 ? 1 : (Math.abs(y))) * (x == 0 || y == 0 ? 1 : (Math.abs(y / x))) * player.speed;
                const _y = (y != 0 ? (y / (Math.abs(y))) * yy : 0) * this.speed;

                this.gameobj.x -= _x;
                this.gameobj.y -= _y;
                //console.log(x, y, distance, _x, _y);
            } else {
                console.log("stop");
                this.gameobj.x = this.newposition[0];
                this.gameobj.y = this.newposition[1];
                this.shouldMove = false;
                if (this.aftermoved != null) this.aftermoved();
            }
        }
    }
}

class ItemManager {
    static cans = [];
    static bottles = [];
    static papers = [];
    static rawItems = [];

    static initialize(count) {
        for (let i = 0; i < count; i++) {
            const random = generateRandom(0, 2);
            // const x = generateRandom(150, app.screen.width-100);
            // const y = generateRandom(50, app.screen.height-100);
            switch (random) {
                case 0:
                    const canSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/can.png`].texture);
                    //canSprite.position.set(x, y);
                    canSprite.scale.set(0.08, 0.08);
                    canSprite.anchor.set(0.5, 0.5);
                    canSprite.rotation = generateRandom(0, 180);
                    this.rawItems.push(new Item(canSprite, "can"));
                    //console.log("add can");
                    break;
                case 1:
                    const paperSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/paper.png`].texture);
                    //paperSprite.position.set(x, y);
                    paperSprite.scale.set(0.03, 0.03);
                    paperSprite.anchor.set(0.5, 0.5);
                    paperSprite.rotation = generateRandom(0, 180);
                    this.rawItems.push(new Item(paperSprite, "paper"));
                    //console.log("add paper");
                    break;
                case 2:
                    const bottleSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/asset2/bottle.png`].texture);
                    //bottleSprite.position.set(x, y);
                    bottleSprite.scale.set(0.08, 0.08);
                    bottleSprite.anchor.set(0.5, 0.5);
                    bottleSprite.rotation = generateRandom(0, 180);
                    this.rawItems.push(new Item(bottleSprite, "bottle"));
                    //console.log("add bottle");
                    break;
            }
        }
    }

    static instantiate() {
        for (let item of this.rawItems) {
            const x = generateRandom(100, app.screen.width - 100);
            const y = generateRandom(50, app.screen.height - 100);
            item.gameobj.position.set(x, y);
            app.stage.addChild(item.gameobj);
        }
    }
}

function generateRandom(from, to) {
    return random = Math.floor(Math.random() * (to - from + 1)) + from;
}

function updateUI() {
    scoreText.innerHTML = `${gamestate.score}`;
    coinText.innerHTML = `${gamestate.coin}`;
    paperCountText.innerHTML = `${gamestate.paperCount}/${gamestate.containerCapacity}`;
    bottleCountText.innerHTML = `${gamestate.bottleCount}/${gamestate.containerCapacity}`;
    canCountText.innerHTML = `${gamestate.canCount}/${gamestate.containerCapacity}`;
}