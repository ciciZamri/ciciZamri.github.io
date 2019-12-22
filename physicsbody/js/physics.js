class PhysicsBody {
    obj;
    static radius = 10;
    velocityX;
    velocityY;
    accelerationX;
    accelerationY;
    isCollide;

    constructor(mesh, startX, startY) {
        this.obj = mesh;
        this.obj.position.x = startX;
        this.obj.position.y = startY;
        this.velocityX = Math.random() * 60 - 30;
        this.velocityY = Math.random() * 60 - 30;
        this.accelerationY = ParticlesManager.gravity;
        this.isCollide = false;
    }

    updatePosition(delta) {
        this.obj.position.x += this.velocityX * delta * 10;
        this.obj.position.y += this.velocityY * delta * 10;
        if (this.obj.position.x + PhysicsBody.radius > (viewportContainer.clientWidth / 2)) {
            this.velocityX = -1 * (Math.abs(this.velocityX));
            this.obj.position.x = (viewportContainer.clientWidth / 2) - PhysicsBody.radius;
        }
        if (this.obj.position.x - PhysicsBody.radius < (viewportContainer.clientWidth / -2)) {
            this.velocityX = Math.abs(this.velocityX);
            this.obj.position.x = (viewportContainer.clientWidth / -2) + PhysicsBody.radius;
        }
        if (this.obj.position.y + PhysicsBody.radius > (viewportContainer.clientHeight / 2)) {
            this.velocityY = -1 * (Math.abs(this.velocityY));
            this.obj.position.y = (viewportContainer.clientHeight / 2) - PhysicsBody.radius;
        }
        if (this.obj.position.y - PhysicsBody.radius < (viewportContainer.clientHeight / -2)) {
            this.velocityY = Math.abs(this.velocityY);
            this.obj.position.y = (viewportContainer.clientHeight / -2) + PhysicsBody.radius;
        }
    }

    updateVelocity(delta) {
        this.velocityY += this.accelerationY * delta * 10;
    }

    update(delta) {
        this.updatePosition(delta);
        this.updateVelocity(delta);
    }
}

class ParticlesManager {
    static gravity = -9.8;
    static particles = [];

    static createParticles(count, view) {
        for (let i = 0; i < count; i++) {
            const particle = view.addObject();
            ParticlesManager.particles.push(new PhysicsBody(particle, PhysicsBody.radius, Math.random() * viewportContainer.clientWidth - viewportContainer.clientWidth / 2, Math.random() * viewportContainer.clientHeight - viewportContainer.clientHeigt / 2));
        }
    }

    static checkCollision() {
        for (let i = 0; i < ParticlesManager.particles.length; i++) {
            for (let j = i + 1; j < ParticlesManager.particles.length; j++) {
                const xx = Math.pow(ParticlesManager.particles[i].obj.position.x - ParticlesManager.particles[j].obj.position.x, 2);
                const yy = Math.pow(ParticlesManager.particles[i].obj.position.y - ParticlesManager.particles[j].obj.position.y, 2);
                const distance = Math.sqrt(xx + yy);

                if (distance < PhysicsBody.radius * 2) {
                    if (!ParticlesManager.particles[i].isCollide && !ParticlesManager.particles[j].isCollide) {
                        ParticlesManager.particles[i].isCollide = ParticlesManager.particles[j].isCollide = true;
                        const tempx = ParticlesManager.particles[i].velocityX;
                        ParticlesManager.particles[i].velocityX = ParticlesManager.particles[j].velocityX;
                        ParticlesManager.particles[j].velocityX = tempx;

                        const tempy = ParticlesManager.particles[i].velocityY;
                        ParticlesManager.particles[i].velocityY = ParticlesManager.particles[j].velocityY;
                        ParticlesManager.particles[j].velocityY = tempy;
                    }
                }
                else if (distance > PhysicsBody.radius * 2) {
                    ParticlesManager.particles[i].isCollide = ParticlesManager.particles[j].isCollide = false;
                }
            }
        }
    }
}
