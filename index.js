AOS.init({
    duration: 1000
});

const actionButton = document.getElementById("action-btn");

actionButton.addEventListener('click', (e)=>{
    scrollTo(0, window.innerHeight);
});