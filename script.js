//Open and close "pop up"
const popupScreen = document.querySelector(".fullscreen-container");
const buttonElement = document.querySelector('.addBook');
const closePopUpElement = document.querySelector('#close-page');

buttonElement.addEventListener('click', ()=>{
    popupScreen.setAttribute('style',"display:flex")  
    });

closePopUpElement.addEventListener('click', ()=>{
        popupScreen.setAttribute('style',"display: none")
    });

document.addEventListener("click", (e) => {
        if (e.target == popupScreen) {
          popupScreen.style.display = "none";
        }
      });

        
//Toggle day/night/cloud mode
const dayNight = document.querySelector(".dayNight");
dayNight.addEventListener("click", changeColor);

let isDay = 0;

function night() {
    document.body.style.backgroundImage = "linear-gradient(to right, #434343 0%, black 100%)";
    document.body.style.color = "#00A170";
    document.getElementById("dayNight").src = "./img/sunAndClouds.png";
    document.getElementById("addBook").src = "./img/plusGreen.png";
    isDay = 1;
}

function clouds() {
    document.body.style.backgroundImage = "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";
    document.body.style.color = "#b8235a";
    document.getElementById("dayNight").src = "./img/sun.png";
    document.getElementById("addBook").src = "./img/plusRed.png";
    isDay = 2;
}

function day() {
    document.body.style.backgroundImage = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
    document.body.style.color = "black";
    document.getElementById("dayNight").src = "./img/weather-night.png";
    document.getElementById("addBook").src = "./img/add.png";
    isDay = 0;
}

function changeColor() {
    console.log("Color Changed");

    if (isDay === 0) {
        return night();
    }

    if (isDay === 1) {
        return clouds();
    }

    if (isDay === 2) {
        return day();
    }
    
}


//Code for library

//Library
let myLibrary = [];

//book constructor
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        return (title + author + pages + read);
    }
}
