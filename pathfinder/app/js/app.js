let container = document.querySelector("#scene-container");;
let viewport;

function start() {
    viewport = new ViewPort(container);
    viewport.createView();
    viewport.setNavigator('camera'); //'testnav' or 'camera'
    setNavInitLocation();

    viewport.loadModels('nodess.glb');
    viewport.loadModels('building3.glb');

    let startTime = 0;
    requestAnimationFrame(loop);
    function loop(now) {
        now *= 0.001;
        deltaTime = now - startTime;
        startTime = now;
        viewport.navigator.checkCurrentRotation(deltaTime);
        viewport.navigator.checkCurrentLocation(deltaTime);
        viewport.render();
        requestAnimationFrame(loop);
    }
}

function setNavInitLocation(){
    viewport.navigator.nav.position.x = viewport.navigator.currentLocation[0];
    viewport.navigator.nav.position.y = viewport.navigator.currentLocation[1];
    viewport.navigator.nav.position.z = viewport.navigator.currentLocation[2];

    viewport.navigator.nav.lookAt(mapDetails[1].location[1], mapDetails[1].location[2], mapDetails[1].location[0]);
}

function gotoStartLoc() {
    viewport.navigator.locationIndex = 0;
    const x1 = mapDetails[path_seq[0]].location[1];
    const y1 = mapDetails[path_seq[0]].location[2];
    const z1 = mapDetails[path_seq[0]].location[0];

    viewport.navigator.nav.position.set(x1, y1, z1);
    viewport.navigator.updateCurrentLocation();

    const x2 = mapDetails[path_seq[1]].location[1];
    const y2 = mapDetails[path_seq[1]].location[2];
    const z2 = mapDetails[path_seq[1]].location[0];

    viewport.navigator.nav.lookAt(x2, y2, z2);
    viewport.navigator.initialRotation[1] = viewport.navigator.nav.rotation.y;
    if (viewport.navigator.initialRotation[1] < 0) {
        viewport.navigator.initialRotation[1] = Math.PI * 2 - Math.abs(viewport.navigator.initialRotation[1]);
    }
    if (viewport.navigator.name === 'camera') viewport.navigator.initialRotation[1] += Math.PI;
    viewport.navigator.currentRotation[1] = viewport.navigator.initialRotation[1];
    console.log("init: " + viewport.navigator.initialRotation[1] + " " + viewport.navigator.currentRotation[1]);
}

function gotoEndLoc() { }

function gotoNextLoc() {
    if (viewport.navigator.locationIndex < (path_seq.length - 1)) {
        viewport.navigator.locationIndex += 1;
        viewport.navigator.updateCurrentLocation();
        viewport.navigator.updateCurrentRotation();
    }
    else {
        alert('arrived');
    }
}
function gotoPrevLoc() {
    if (viewport.navigator.locationIndex > 0) {
        viewport.navigator.locationIndex -= 1;
        viewport.navigator.updateCurrentLocation();
        viewport.navigator.updateCurrentRotation();
    }
    else {
        alert('starting point');
    }
}

//start();

// requestAnimationFrame(loop);
// function loop(){
//     //viewport.navigator.nav.rotation.y += 0.007;
//     viewport.navigator.checkCurrentRotation();
//     viewport.navigator.checkCurrentLocation();
//     viewport.render();
//     requestAnimationFrame(loop);
// }