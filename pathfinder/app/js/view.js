class ViewPort {
    container;
    scene;
    renderer;
    light;
    viewController;
    navigator;
    camera;
    testnav;

    constructor(container) {
        this.container = container;
    }

    createView() {
        this.createScene();
        this.createRenderer();
        this.createLights();
        this.createCamera();
        this.createViewControl();
        this.createTestNav();
        this.render();

        this.navigator = new Navigator();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('grey');
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.gammaFactor = 1.2;
        this.renderer.gammaOutput = true;

        this.renderer.physicallyCorrectLights = true;

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
        const far = 100;

        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this.camera.position.set(9.17, -1, 4.84);
    }

    createViewControl() {
        this.viewController = new THREE.OrbitControls(this.camera, this.container);
    }

    loadModels(modelname) {
        const loader = new THREE.GLTFLoader();
        let url;
        if(isLocal) url =  `http://127.0.0.1:8000/frontend/3D_models/${modelname}`;
        else url = `https://raw.githubusercontent.com/ciciZamri/pathfinder/master/frontend/3D_models/${modelname}`;
        const onLoad = (gltf, position, scale) => {
            const model = gltf.scene.children[0];
            model.position.copy(position);
            model.scale.copy(scale);

            this.scene.add(model);
        }
        const modelPosition = new THREE.Vector3(0, -0.55, 0);
        //scale ratio of blender to threejs is 1:100
        const modelScale = new THREE.Vector3(0.01, 0.01, 0.01);
        loader.load(url, gltf => onLoad(gltf, modelPosition, modelScale));
    }

    createTestNav() {
        //test navigator for development purpose only(red box)
        const material = new THREE.MeshStandardMaterial({ color: 'red' });
        const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.8);
        this.testnav = new THREE.Mesh(geometry, material);
        this.scene.add(this.testnav);
    }

    setNavigator(nav) {
        if (nav === 'camera') {
            this.navigator.nav = this.camera;
            this.navigator.name = nav;
        }
        else if (nav === 'testnav') {
            this.navigator.nav = this.testnav;
            this.navigator.name = nav;
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

class Navigator {
    name;
    nav;
    speed;
    locationIndex;
    currentLocation;
    initialDistance;
    currentDistance;

    currentRotation;
    initialRotation;
    rotationDirection;
    isRotating;

    constructor() {
        this.speed = 1.0;
        this.locationIndex = 0;
        this.currentRotation = [0, 0, 0];
        this.initialRotation = [0, 0, 0];
        this.currentDistance = 0;
        this.currentLocation = [mapDetails[path_seq[this.locationIndex]].location[1],
        mapDetails[path_seq[this.locationIndex]].location[2],
        mapDetails[path_seq[this.locationIndex]].location[0]];

        this.rotationDif = 0;
        this.isRotating = true;
        this.initialDistance = {
            x: 0,  //x-component
            y: 0,  //y-component
            z: 0,  //z-component
            d: 0  //magnitude of the vector
        };
    }

    updateCurrentRotation() {
        const dx = this.initialDistance.x;
        const dy = this.initialDistance.y;
        const dz = this.initialDistance.z;

        //console.log(`dx: ${dx} , dy: ${dy}, dz: ${dz}`);

        if (dx === 0) {
            this.currentRotation[1] = Math.PI / 2;
            if (dz > 0) this.rotationDirection = 'c';
            else this.rotationDirection = 'a';
        }
        else if (dz === 0) {
            if (dx > 0) this.currentRotation[1] = Math.PI / 2;
            else this.currentRotation[1] = Math.PI * (3 / 2);
            //this.rotationDirection = 'c';
        }
        else {
            const angle_y = Math.atan(dx / dz);
            console.log("angle y: " + angle_y);

            if (angle_y > 0) {
                if (dz > 0) {
                    this.currentRotation[1] = angle_y;
                    //this.rotationDirection = 'c';
                }
                else {
                    this.currentRotation[1] = Math.PI + angle_y;
                    //this.rotationDirection = 'a';
                }
            }
            else if (angle_y < 0) {
                if (dz > 0) {
                    //this.currentRotation[1] = angle_y;
                    this.currentRotation[1] = Math.PI * 2 - Math.abs(angle_y);
                    //this.rotationDirection = 'c';
                }
                else {
                    console.log("ll");
                    this.currentRotation[1] = Math.PI - Math.abs(angle_y);
                    //this.rotationDirection = 'a';
                }
            }
        }
        //this.currentRotation[1] -= Math.PI / 2;
        // const dif = this.currentRotation[1] - this.initialRotation[1];
        // if (dif > 0 && dif <= Math.PI) {
        //     this.currentRotation[1] = dif;
        //     this.rotationDirection = 'a';
        // }
        // else {
        //     if (dif > 0) this.currentRotation[1] = Math.PI * 2 - this.currentRotation[1];
        //     this.currentRotation[1] = Math.abs(this.currentRotation[1]);
        //     this.rotationDirection = 'c';
        // }
        this.isRotating = true;
        console.log("should rotate: " + this.currentRotation[1]);
        console.log("intial rotation: " + this.initialRotation[1]);
    }

    updateCurrentLocation() {
        //console.log("current location: " + this.nav.position.x + " " + this.nav.position.y + " " + this.nav.position.z);
        //get x, y, z location of next point
        const newx = mapDetails[path_seq[this.locationIndex]].location[1];
        const newy = mapDetails[path_seq[this.locationIndex]].location[2];
        const newz = mapDetails[path_seq[this.locationIndex]].location[0];
        //console.log("new location: " + newx + " " + newy + " " + newz);

        this.initialDistance.x = newx - this.nav.position.x;
        this.initialDistance.y = newy - this.nav.position.y;
        this.initialDistance.z = newz - this.nav.position.z;
        this.initialDistance.d = Math.sqrt((this.initialDistance.x * this.initialDistance.x) +
            (this.initialDistance.y * this.initialDistance.y) +
            (this.initialDistance.z * this.initialDistance.z));

        this.currentLocation[0] = newx;
        this.currentLocation[1] = newy;
        this.currentLocation[2] = newz;

        // const xx = Math.pow(this.currentLocation[0] - this.nav.position.x, 2);
        // const yy = Math.pow(this.currentLocation[1] - this.nav.position.y, 2);
        // const zz = Math.pow(this.currentLocation[2] - this.nav.position.z, 2);
        // this.currentDistance = Math.sqrt(xx + yy + zz);
    }

    //if current location property is different from navigator current location, then update
    checkCurrentLocation(deltaTime) {
        if (!this.isRotating) {
            //calculate the distance between current location to next location
            const xx = Math.pow(this.currentLocation[0] - this.nav.position.x, 2);
            const yy = Math.pow(this.currentLocation[1] - this.nav.position.y, 2);
            const zz = Math.pow(this.currentLocation[2] - this.nav.position.z, 2);
            //keep track how far it move


            //assign new current distance
            this.currentDistance = Math.sqrt(xx + yy + zz);

            if (this.currentDistance > 0.2) {
                this.nav.position.x += this.initialDistance.x * this.speed * deltaTime;
                this.nav.position.y += this.initialDistance.y * this.speed * deltaTime;
                this.nav.position.z += this.initialDistance.z * this.speed * deltaTime;
            }
            else {
                this.nav.position.x = this.currentLocation[0];
                this.nav.position.y = this.currentLocation[1];
                this.nav.position.z = this.currentLocation[2];
            }
        }
    }

    //if current rotation property is different from navigator current rotation, then update
    checkCurrentRotation(deltaTime) {
        const dif = this.currentRotation[1] - this.initialRotation[1];
        if (Math.abs(dif) > 0.05) {
            if (dif > 0) {
                //console.log("pos");
                this.nav.rotateY(0.85 * deltaTime * this.speed);
                this.initialRotation[1] += 0.85 * deltaTime * this.speed;
                // if (this.rotationDirection === 'c') {
                //     this.nav.rotateY(-0.01);
                //     this.currentRotation[1] -= 0.01;
                //     this.initialRotation[1] -= 0.01;
                // }
                // else if (this.rotationDirection === 'a') {
                //     this.nav.rotateY(0.01);
                //     this.currentRotation[1] -= 0.01;
                //     this.initialRotation[1] += 0.01;
                // }
            }
            else if (dif < 0) {
                //console.log("neg");
                this.nav.rotateY(-0.85 * deltaTime * this.speed);
                this.initialRotation[1] -= 0.85 * deltaTime * this.speed;
            }
        }
        else {
            //this.initialRotation[1] = this.currentRotation[1];
            //console.log(this.isRotating);
            this.isRotating = false;
        }
    }

}