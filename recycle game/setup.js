let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({
    width: 1000,
    height: 500,
    antialias: true,
    resolution: 1,
});
document.body.appendChild(app.view);