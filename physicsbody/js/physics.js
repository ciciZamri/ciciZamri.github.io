class PhysicsBody{
    obj;
    static radius = 5;
    velocityX ;
    velocityY;
    accelerationX;
    accelerationY;

    constructor(mesh, startX, startY){
        this.obj = mesh;
        this.obj.position.x = startX;
        this.obj.position.y = startY;
        this.velocityX = Math.random()*60-30;
        this.velocityY = Math.random()*60-30;
        this.accelerationY = PhysicsManager.gravity;
    }

    updatePosition(delta){
        this.obj.position.x += this.velocityX*delta*10;
        this.obj.position.y += this.velocityY*delta*10;
        if(this.obj.position.x+PhysicsBody.radius > (viewportContainer.clientWidth/2)){
            this.velocityX = -1*(Math.abs(this.velocityX));
            this.obj.position.x = (viewportContainer.clientWidth/2)-PhysicsBody.radius;
        }
        if(this.obj.position.x-PhysicsBody.radius < (viewportContainer.clientWidth/-2)){
            this.velocityX = Math.abs(this.velocityX);
            this.obj.position.x = (viewportContainer.clientWidth/-2)+PhysicsBody.radius;
        }
        if(this.obj.position.y+PhysicsBody.radius > (viewportContainer.clientHeight/2)){
            this.velocityY = -1*(Math.abs(this.velocityX));
            this.obj.position.y = (viewportContainer.clientHeight/2)-PhysicsBody.radius;
        }
        if(this.obj.position.y-PhysicsBody.radius < (viewportContainer.clientHeight/-2)){
            this.velocityY = Math.abs(this.velocityY);
            this.obj.position.y = (viewportContainer.clientHeight/-2)+PhysicsBody.radius;
        }
    }

    updateVelocity(delta){
        this.velocityY += this.accelerationY*delta*10;
    }

    update(delta){
        this.updatePosition(delta);
        this.updateVelocity(delta);
    }
}

class PhysicsManager{
    static gravity = -9.8;
}