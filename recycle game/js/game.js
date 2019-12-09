class Scene {
    static gotofield() {
        gamestate.currentPage = 'field';
        console.log("go to field");
        app.stage.removeChild(homepage);
        app.stage.addChild(field);
        app.stage.addChild(homebtn);
        app.stage.addChild(character);
    }

    static gotoshop() {
        gamestate.currentPage = 'shop';
        app.stage.removeChild(homepage);
        app.stage.addChild(shop);
        app.stage.addChild(homebtn);
    }

    static gotohomepage() {
        gamestate.currentPage = 'homepage';
        app.stage.addChild(homepage);
        app.stage.addChild(character);

        house.position.set(app.screen.width / 2, 100);

        riverbtn.position.set(app.screen.width - 100, 100);
        riverbtn.interactive = true;
        riverbtn.buttonMode = true;
        // riverbtn.on('pointerdown', Scene.gotoriver);

        fieldbtn.position.set(app.screen.width - 100, 300);
        fieldbtn.interactive = true;
        fieldbtn.buttonMode = true;
        // fieldbtn.on('pointerdown', Scene.gotofield);

        shopbtn.position.set(100, 300);
        shopbtn.interactive = true;
        shopbtn.buttonMode = true;
        // shopbtn.on('pointerdown', Scene.gotoshop);

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
            Player.jumpto(10, 200);
            Player.moveto(30, 200, null);
        });
    }
}