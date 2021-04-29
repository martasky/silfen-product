screensize = window.screen.width;


if (screensize <= 1100){
let burgermenu = 0;
console.log (screensize)
burgerMenu();
function burgerMenu() {
if (burgermenu == 0) {
document.querySelector(".close-burguer").addEventListener("click", displayBurguer);
function displayBurguer () {
    burgermenu = 1
    console.log(burgermenu)
    document.querySelector("header ul:first-of-type").classList.remove("dont-display");
    document.querySelector(".close-burguer img").src = "assets/exit.png";
    document.querySelector("#shop").addEventListener("click", displaySecondDrop);
    document.querySelector("#aboutdrop").addEventListener("click", displaySecondDropAbout);

function displaySecondDropAbout () {
    document.querySelector("ul .dropdown-content-two").classList.remove("dont-display");
};

function displaySecondDrop () {
    document.querySelector("ul .dropdown-content").classList.remove("dont-display");
    document.querySelector("li .drop-two").addEventListener("click", displayThirdDrop);
    document.querySelector("li #bagsdrop").addEventListener("click", displayThirdDropBags);
    function displayThirdDrop () {
        document.querySelector("ul .dropdown-secondary-content").classList.remove("dont-display");
    }
    function displayThirdDropBags () {
        document.querySelector("ul .dropdown-bags").classList.remove("dont-display")
    }}

    document.querySelector(".close-burguer").addEventListener("click", closeMenu);

    function closeMenu () {
        console.log ("burger closed");
        document.querySelector("header ul:first-of-type").classList.add("dont-display");
        document.querySelector(".close-burguer img").src = "assets/burger.png";
        document.querySelector("ul .dropdown-bags").classList.add("dont-display");
        document.querySelector("ul .dropdown-secondary-content").classList.add("dont-display");
        document.querySelector("ul .dropdown-content").classList.add("dont-display");
        document.querySelector("ul .dropdown-content-two").classList.add("dont-display");

        burgermenu = 0
        burgerMenu ()        
    }
    
}
}
}}