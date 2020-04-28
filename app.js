document.querySelector(".nav-bar-menu-btn").addEventListener('click', (e)=>{
    document.querySelector(".nav-bar-actions").style.transform = "translateX(0)";
});

document.querySelector(".nav-bar-close-btn").addEventListener('click', (e)=>{
    console.log("close");
    document.querySelector(".nav-bar-actions").style.transform = "translateX(150px)";
});