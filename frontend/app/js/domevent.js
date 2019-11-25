// for app element
let restartBtn = document.querySelector("#restart-button");
let nextBtn = document.querySelector("#next-button");
let previousBtn = document.querySelector("#previous-button");

 // for select location element
let frominput = document.querySelector("#from-location");
let toinput = document.querySelector("#to-location");
let findBtn = document.querySelector("#find-btn");

let suggestion = document.querySelector("#suggestion");
let suggestionList = ["ll", "kl", "jk"];

frominput.addEventListener("keyup", findSuggestion);
frominput.addEventListener("click", (e)=>{
    suggestion.style.top = `${frominput.offsetTop + frominput.offsetHeight + 8}px`;
    suggestion.style.display = "block";
})

toinput.addEventListener("keyup", findSuggestion);
toinput.addEventListener("click", (e)=>{
    suggestion.style.top = `${toinput.offsetTop + toinput.offsetHeight + 8}px`;
    suggestion.style.display = "block";
});

findBtn.addEventListener('click', findPath);

restartBtn.addEventListener('click', gotoStartLoc);
previousBtn.addEventListener('click', gotoPrevLoc);
nextBtn.addEventListener('click', gotoNextLoc);

function findSuggestion(e){
    console.log(suggestionList);
    suggestionList.splice(0, suggestionList.length);
}

function findPath(e){
    const fromLocation = parseInt(frominput.value);
    const toLocation = parseInt(toinput.value);
    path_seq = g.getShortestPath(fromLocation, toLocation);
    alert(path_seq);
    gotoStartLoc();
}

window.addEventListener('resize', () => {
    viewport.camera.aspect = container.clientWidth / container.clientHeight;
    viewport.camera.updateProjectionMatrix();
    viewport.renderer.setSize(container.clientWidth, container.clientHeight);
});