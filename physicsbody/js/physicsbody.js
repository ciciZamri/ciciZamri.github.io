class PhysicsBody{
    obj;
    static radius = 30;
    velocityX ;
    velocityY;

    constructor(mesh, startX, startY){
        this.obj = mesh;
        this.obj.position.x = startX;
        this.obj.position.y = startY;
        this.velocityX = Math.random()*80-40;
        this.velocityY = Math.random()*80-40;
    }

    update(delta){
        this.obj.position.x += this.velocityX*delta*10;
        this.obj.position.y += this.velocityY*delta*10;
        if(this.obj.position.x+PhysicsBody.radius > (viewportContainer.clientWidth/2) || this.obj.position.x-PhysicsBody.radius < (viewportContainer.clientWidth/-2)){
            this.velocityX *= -1;
        }
        if(this.obj.position.y+PhysicsBody.radius > (viewportContainer.clientHeight/2) || this.obj.position.y-PhysicsBody.radius < (viewportContainer.clientHeight/-2)){
            this.velocityY *= -1;
        }
    }
}