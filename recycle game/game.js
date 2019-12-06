class GameObject {
    obj;
    asseturl = "66";

    constructor(url) {
        console.log(url);
        this.asseturl = url;
        console.log("url", this.asseturl);
        this.loadTexture(url);
    }

    loadTexture(url) {
        PIXI.loader.add(url).on("progress", (loader, resource) => {
            console.log("loading: " + resource.url);
            console.log("progress: " + loader.progress + "%");
        }).load(() => {
            this.obj = new PIXI.Sprite(PIXI.loader.resources[this.asseturl].texture);
            app.stage.addChild(this.obj);
            isLoaded = true;
        });
    }
}