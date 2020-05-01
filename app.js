document.querySelector(".nav-bar-menu-btn").addEventListener('click', (e)=>{
    document.querySelector(".nav-bar-actions").style.transform = "translateX(0)";
});

document.querySelector(".nav-bar-close-btn").addEventListener('click', (e)=>{
    console.log("close");
    document.querySelector(".nav-bar-actions").style.transform = "translateX(200px)";
});

let lastY = window.scrollY;
window.addEventListener('scroll', (e)=>{
    if(window.scrollY > lastY){
        document.querySelector(".nav-bar").style.transform = "translateY(-70px)";
    }
    else{
        document.querySelector(".nav-bar").style.transform = "translateY(0px)";
    }
    lastY = window.scrollY;
});