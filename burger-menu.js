
burgerMenu();

function burgerMenu() {

document.querySelector(".close-burguer").addEventListener("click", displayBurguer);
function displayBurguer () {
    document.querySelector(".close-burguer img").src = "assets/exit.png";
    document.querySelector("header ul:first-of-type").classList.remove("dont-display");
    document.querySelector(".close-burguer").addEventListener("click", closeMenu);}


document.querySelector("#shop").addEventListener("click", displaySecondDrop);
document.querySelector("#aboutdrop").addEventListener("click", displaySecondDropAbout);


function displaySecondDropAbout () {
    document.querySelector("ul .dropdown-content-two").classList.remove("dont-display");
    document.querySelector("#aboutdrop").addEventListener("click", hideDropAbout);
};

function displaySecondDrop () {
    document.querySelector("#shop").removeEventListener("click", displaySecondDrop);
    document.querySelector("ul .dropdown-content").classList.remove("dont-display");
    document.querySelector("li .drop-two").addEventListener("click", displayThirdDrop);
    document.querySelector("li #bagsdrop").addEventListener("click", displayThirdDropBags);
    document.querySelector("#shop").addEventListener("click", hideDropShop);

    function displayThirdDrop () {
        document.querySelector("ul .dropdown-secondary-content").classList.remove("dont-display");
        document.querySelector("li .drop-two").removeEventListener("click", displayThirdDrop);
        document.querySelector("li .drop-two").addEventListener("click", hideDropCollections);
    }
    function displayThirdDropBags () {
        document.querySelector("ul .dropdown-bags").classList.remove("dont-display");
        document.querySelector("li #bagsdrop").removeEventListener("click", displayThirdDropBags);
        document.querySelector("li #bagsdrop").addEventListener("click", hideDropBags);
    }}

    function hideDropShop () {
        document.querySelector("ul .dropdown-content").classList.add("dont-display");
        burgerMenu();
    }
    function hideDropAbout () {
        document.querySelector("ul .dropdown-content-two").classList.add("dont-display");
        burgerMenu();
    }
    function hideDropCollections () {
        document.querySelector("ul .dropdown-secondary-content").classList.add("dont-display");
        displaySecondDrop();
    }

    function hideDropBags () {
        document.querySelector("ul .dropdown-bags").classList.add("dont-display");
        displaySecondDrop();
    }

    function closeMenu () {
        document.querySelector("header ul:first-of-type").classList.add("dont-display");
        document.querySelector(".close-burguer img").src = "assets/burger.png";
        document.querySelector("ul .dropdown-bags").classList.add("dont-display");
        document.querySelector("ul .dropdown-secondary-content").classList.add("dont-display");
        document.querySelector("ul .dropdown-content").classList.add("dont-display");
        document.querySelector("ul .dropdown-content-two").classList.add("dont-display");
        burgerMenu ()        
    }
    
}


/* To adjust the position of the top menu when scrolling */

window.onscroll = function() {moveMenu()};

const header = document.querySelector("header");
const sticky = header.offsetTop;

function moveMenu () {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
    }
    else {
        header.classList.remove("sitcky")
    }
}

/* For the search  */


const form = document.querySelector("#searchbar form");
document.querySelector("button").addEventListener("click", submitSearch);

function submitSearch() {
    const q = form.elements.query.value;
    const url = "https://kea21-4d62.restdb.io/rest/silfenproducts?q={}&filter=" + q;
    document.querySelector("#searchbar button a").href = "search.html?q=" + q;

}