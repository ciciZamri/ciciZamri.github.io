document.querySelector(".nav-bar-menu-btn").addEventListener('click', (e)=>{
    document.querySelector(".nav-bar-actions").style.transform = "translateX(0)";
});

document.querySelector(".nav-bar-close-btn").addEventListener('click', (e)=>{
    console.log("close");
    document.querySelector(".nav-bar-actions").style.transform = "translateX(100vw)";
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

// let current = 0;

// function rebuild(){
//     if(current === 0){
//         document.querySelector(".n-before").style.display = "none";
//         document.querySelector(".application-container").style.transform = "translateX(100vw)";
//         document.querySelector(".n-next").style.display = "block";
//         document.querySelector(".design-container").style.transform = "translateX(0vw)";
//     }else{
//         document.querySelector(".n-before").style.display = "block";
//         document.querySelector(".application-container").style.transform = "translateX(0vw)";
//         document.querySelector(".n-next").style.display = "none";
//         document.querySelector(".design-container").style.transform = "translateX(-100vw)";
//     }
// }
document.querySelector(".design-btn").addEventListener('click', (e)=>{
    document.querySelector(".design-container").style.display = "block";
    document.querySelector(".application-container").style.display = "none";
    document.querySelector(".application-btn").style.opacity = "0.5";
    document.querySelector(".design-btn").style.opacity = "1.0";
    document.querySelector(".application-btn").style.fontWeight = "100";
    document.querySelector(".design-btn").style.fontWeight = "600";
});
document.querySelector(".application-btn").addEventListener('click', (e)=>{
    document.querySelector(".design-container").style.display = "none";
    document.querySelector(".application-container").style.display = "block";
    document.querySelector(".application-btn").style.opacity = "1.0";
    document.querySelector(".design-btn").style.opacity = "0.5";
    document.querySelector(".application-btn").style.fontWeight = "600";
    document.querySelector(".design-btn").style.fontWeight = "100";
});
