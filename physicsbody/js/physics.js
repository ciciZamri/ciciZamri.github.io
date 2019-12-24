const viewportContainer = document.querySelector("#scene-container");
let width = viewportContainer.clientWidth;
let height = viewportContainer.clientHeight;

class PhysicsBody {
    obj;
    static radius = 2;
    velocityX;
    velocityY;
    accelerationX;
    accelerationY;
    damping;

    constructor(mesh, startX, startY) {
        this.obj = mesh;
        this.obj.position.x = startX;
        this.obj.position.y = startY;
        this.velocityX = Math.random() * 5 - 2.5;
        this.velocityY = Math.random() * 5 - 2.5;
        this.accelerationY = 0;
        this.accelerationX = 0;
        this.damping = 0.3;
    }

    updatePosition(delta) {
        this.obj.position.x += this.velocityX * delta * 10;
        this.obj.position.y += this.velocityY * delta * 10;
        if (this.obj.position.x + PhysicsBody.radius > (width / 2)) {
            this.velocityX = -(this.damping) * (Math.abs(this.velocityX));
            this.obj.position.x = (width / 2) - PhysicsBody.radius;
        }
        if (this.obj.position.x - PhysicsBody.radius < (width / -2)) {
            this.velocityX = (this.damping)*Math.abs(this.velocityX);
            this.obj.position.x = (width / -2) + PhysicsBody.radius;
        }
        if (this.obj.position.y + PhysicsBody.radius > (height / 2)) {
            this.velocityY = -(this.damping) * (Math.abs(this.velocityY));
            this.obj.position.y = (height / 2) - PhysicsBody.radius;
        }
        if (this.obj.position.y - PhysicsBody.radius < (height / -2)) {
            this.velocityY = (this.damping)*Math.abs(this.velocityY);
            this.obj.position.y = (height / -2) + PhysicsBody.radius;
        }
    }

    updateVelocity(delta) {
        this.velocityX += this.accelerationX * delta * 10;
        this.velocityY += this.accelerationY * delta * 10;
        if (ParticlesManager.applygravity) {
            this.velocityY += (-9.8 * delta);
        }
    }

    updateAcceleration() {
        for (let point of ParticlesManager.pointforces) {
            const dx = point[1] - this.obj.position.x;
            const dy = point[2] - this.obj.position.y;
            if (Math.abs(dx) < 25 && Math.abs(dy) < 25) {
                this.velocityX = 0;
                this.velocityY = 0;
            }
            else {
                this.accelerationX = (point[0] / ((dx * dx) + (dy * dy))) * (Math.cos(Math.atan(dy / dx))) * (Math.abs(dx) / dx);
                this.accelerationY = (point[0] / ((dx * dx) + (dy * dy))) * (Math.sin(Math.atan(dy / dx))) * (Math.abs(dy) / dy);
            }
            //console.log(dx, dy, this.accelerationX);
        }
    }

    update(delta) {
        this.updatePosition(delta);
        this.updateVelocity(delta);
        this.updateAcceleration();
    }
}

class ParticlesManager {
    static applygravity = true;
    static particles = [];
    static strength = 90000;
    static pointforces = [[this.strength, 0, 0], [this.strength, 0, 60], [this.strength, 0, -60]];

    static createParticles(count, view) {
        for (let i = 0; i < count; i++) {
            const particle = view.addObject();
            ParticlesManager.particles.push(new PhysicsBody(particle, Math.random() * width - width / 2, Math.random()*(height/-5)-400));
        }
    }

    static checkCollision() {
        for (let i = 0; i < ParticlesManager.particles.length; i++) {
            for (let j = i + 1; j < ParticlesManager.particles.length; j++) {
                const xx = Math.pow(ParticlesManager.particles[i].obj.position.x - ParticlesManager.particles[j].obj.position.x, 2);
                const yy = Math.pow(ParticlesManager.particles[i].obj.position.y - ParticlesManager.particles[j].obj.position.y, 2);
                const distance = Math.sqrt(xx + yy);

                if (distance < PhysicsBody.radius * 2) {
                    ParticlesManager.particles[i].isCollide = ParticlesManager.particles[j].isCollide = true;
                    const tempx = ParticlesManager.particles[i].velocityX;
                    ParticlesManager.particles[i].velocityX = ParticlesManager.particles[j].velocityX;
                    ParticlesManager.particles[j].velocityX = tempx;

                    const tempy = ParticlesManager.particles[i].velocityY;
                    ParticlesManager.particles[i].velocityY = ParticlesManager.particles[j].velocityY;
                    ParticlesManager.particles[j].velocityY = tempy;
                }

            }
        }
    }
}
