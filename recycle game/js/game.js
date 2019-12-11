class Scene {
    static gotofield() {
        Player.moveto(app.screen.width, app.screen.height - 200, () => {
            gamestate.currentPage = 'field';
            console.log("go to field");
            app.stage.removeChild(homepage);
            app.stage.addChild(field);
            app.stage.addChild(homebtn);
            app.stage.addChild(character);
            Player.jumpto(0, app.screen.height/2);
            Player.moveto(30, app.screen.height/2, null);
        });
    }

    static gotoshop() {
        Player.moveto(120, 300, ()=>{
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

            Player.moveto(0, app.screen.height/2, ()=>{
                Scene.loadhomepage();
                Player.jumpto(app.screen.width, ypos);
                Player.moveto(app.screen.width-100, ypos, null);
            });
        }
    }

    static loadhomepage(){
        gamestate.currentPage = 'homepage';
        app.stage.addChild(homepage);
        app.stage.addChild(character);

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
        Player.moveto(app.screen.width, 100, () => {
            gamestate.currentPage = 'river';
            app.stage.removeChild(homepage);
            app.stage.addChild(river);
            app.stage.addChild(homebtn);
            app.stage.addChild(character);
            console.log("go to river");
            Player.jumpto(10, app.screen.height/2);
            Player.moveto(30, app.screen.height/2, null);
        });
    }
}

class RubbishManager{
    static cans;
    static papers;
    static bottles;

    
}