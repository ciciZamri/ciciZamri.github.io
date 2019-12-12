let scoreText = document.querySelector("#score");
let coinText = document.querySelector("#coin");

let gamestate = {
    score: 0,
    coin: 0,
    currentPage: 'homepage',
    containerCount: 3,
    containerSpace: 5
};

class Scene {
    static gotofield() {
        player.moveto(app.screen.width, app.screen.height - 200, () => {
            gamestate.currentPage = 'field';
            console.log("go to field");
            app.stage.removeChild(homepage);
            app.stage.addChild(field);
            app.stage.addChild(homebtn);
            app.stage.addChild(player.gameobj);
            ItemManager.instantiate(30);
            player.jumpto(0, app.screen.height/2);
            player.moveto(30, app.screen.height/2, null);
        });
    }

    static gotoshop() {
        player.moveto(120, 300, ()=>{
            gamestate.currentPage = 'shop';
            app.stage.removeChild(homepage);
            app.stage.addChild(shop);
            app.stage.addChild(homebtn);
        });
    }

    static gotohomepage() {
        let ypos;
        if(gamestate.currentPage === 'shop'){
            Scene.loadhomepage();
        }
        else{
            if(gamestate.currentPage === 'river') ypos = 100;
            else if(gamestate.currentPage === 'field') ypos = app.screen.height - 200;

            player.moveto(0, app.screen.height/2, ()=>{
                Scene.loadhomepage();
                player.jumpto(app.screen.width, ypos);
                player.moveto(app.screen.width-100, ypos, null);
            });
        }
    }

    static loadhomepage(){
        gamestate.currentPage = 'homepage';
        app.stage.addChild(homepage);
        app.stage.addChild(player.gameobj);

        house.position.set(app.screen.width / 2, 100);

        riverbtn.position.set(app.screen.width - 100, 100);
        riverbtn.interactive = true;
        riverbtn.buttonMode = true;

        fieldbtn.position.set(app.screen.width - 100, 300);
        fieldbtn.interactive = true;
        fieldbtn.buttonMode = true;

        shopbtn.position.set(100, 300);
        shopbtn.interactive = true;
        shopbtn.buttonMode = true;

        c1l1.position.set(app.screen.width / 2 - 150, 200);
        c2l1.position.set(app.screen.width / 2 - 150, 300);
        c3l1.position.set(app.screen.width / 2 - 150, 400);
    }

    static gotoriver() {
        player.moveto(app.screen.width, 100, () => {
            gamestate.currentPage = 'river';
            app.stage.removeChild(homepage);
            app.stage.addChild(river);
            app.stage.addChild(homebtn);
            app.stage.addChild(player.gameobj);
            console.log("go to river");
            player.jumpto(10, app.screen.height/2);
            player.moveto(30, app.screen.height/2, null);
        });
    }
}

class Item extends GameObject{
    type;
    price;

    constructor(sprite, type){
        super(sprite);
        this.type = type;
        //console.log(this.type);
        this.gameobj.interactive = true;
        this.gameobj.buttonMode = true;
        this.assignPrice();
        this.assignEventListener();
    }

    assignPrice(){
        switch(this.type){
            case "paper": this.price = 15; break;
            case "bottle": this.price = 20; break;
            case "can": this.price = 30; break;
        }
    }

    assignEventListener(){
        console.log(this.type, this.price);
        this.gameobj.on('pointerdown', ()=>{
            app.stage.removeChild(this.gameobj);
            gamestate.score += 30;
            updateUI();
            console.log(`${this.type} clicked ${this.gameobj.x} ${this.gameobj.y} ${this.price}`);
        });
    }

    clickedListener(){
        console.log(`${this.type} clicked ${this.gameobj} ${this.gameobj} ${this.price}`);
    }
}

class ItemManager{
    static cans = [];
    static bottles = [];
    static papers = [];
    static rawItems = [];

    static instantiate(count){
        for(let i = 0 ; i<count ; i++){
            const random = generateRandom(0, 2)
            const x = generateRandom(150, app.screen.width-100);
            const y = generateRandom(50, app.screen.height-100);
            switch(random){
                case 0:
                    const canSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/can.png`].texture);
                    canSprite.position.set(x, y);
                    canSprite.scale.set(0.3, 0.3);
                    this.rawItems.push(new Item(canSprite, "can"));
                    //console.log("add can");
                    break;
                case 1:
                    const paperSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/paper.png`].texture);
                    paperSprite.position.set(x, y);
                    paperSprite.scale.set(0.3, 0.3);
                    this.rawItems.push(new Item(paperSprite, "paper"));
                    //console.log("add paper");
                    break;
                case 2:
                    const bottleSprite = new PIXI.Sprite(PIXI.loader.resources[`${url}/assets/bottle.png`].texture);
                    bottleSprite.position.set(x, y);
                    bottleSprite.scale.set(0.3, 0.3);
                    this.rawItems.push(new Item(bottleSprite, "bottle"));
                    //console.log("add bottle");
                    break;
            }
        }
        for(let item of this.rawItems){
            app.stage.addChild(item.gameobj);
        }
    }
}

function generateRandom(from, to){
    return random = Math.floor(Math.random()*(to-from+1))+from;
}

function updateUI(){
    scoreText.innerHTML = `${gamestate.score}`;
    coinText.innerHTML = `${gamestate.coin}`;
}