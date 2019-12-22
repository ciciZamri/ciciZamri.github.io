class ViewPort {
    container;
    scene;
    renderer;
    light;
    camera;

    constructor(container) {
        this.container = container;
    }

    createView() {
        this.createScene();
        this.createRenderer();
        //this.createLights();
        this.createCamera();
        this.render();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('black');
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.gammaFactor = 1.2;
        this.renderer.gammaOutput = true;

        // this.renderer.physicallyCorrectLights = true;

        this.container.appendChild(this.renderer.domElement);
    }

    createLights() {
        const ambientLight = new THREE.HemisphereLight(
            0xddeeff, // sky color
            0x202020, // ground color
            5, // intensity
        );

        const mainLight = new THREE.DirectionalLight(0xffffff, 5);
        mainLight.position.set(10, 10, 10);

        this.scene.add(ambientLight, mainLight);
    }

    createCamera() {
        const fov = 70; //field of view
        const aspect = this.container.clientWidth / this.container.clientHeight;
        const near = 0.1;
        const far = 10;

        //this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera = new THREE.OrthographicCamera(this.container.clientWidth/-2, this.container.clientWidth/2, this.container.clientHeight/2, this.container.clientHeight/-2, near, far);
        //this.camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, near, far);
        this.camera.zoom = 0.5;
        this.scene.add(this.camera);
        this.camera.position.set(0, 0, 2);
    }

    addObject() {
        const radius = PhysicsBody.radius;
        const segments = 9;
        const geometry = new THREE.CircleBufferGeometry(radius, segments);
        const material = new THREE.MeshBasicMaterial({color: `hsl(${parseInt(Math.random()*359)}, 100%, 50%)`});
        const mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(0, 0, -10);
        this.scene.add(mesh);
        this.render();
        return mesh;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

const viewportContainer = document.querySelector("#scene-container");