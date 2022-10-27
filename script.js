//Open and close "pop up" (this is called modal)
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
    document.getElementById("about").src = "./img/question-night.png";
    isDay = 1;
}

function clouds() {
    document.body.style.backgroundImage = "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";
    document.body.style.color = "#b8235a";
    document.body.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 #BC70A4, 0 -1px #BC70A4";
    document.getElementById("dayNight").src = "./img/sun.png";
    document.getElementById("addBook").src = "./img/plusRed.png";
    document.getElementById("about").src = "./img/question-red.png";
    isDay = 2;
}

function day() {
    document.body.style.backgroundImage = "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
    document.body.style.color = "black";
    document.body.style.textShadow = "none";
    document.getElementById("dayNight").src = "./img/weather-night.png";
    document.getElementById("addBook").src = "./img/add.png";
    document.getElementById("about").src = "./img/question-day.png";
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


//right click to add book
window.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    popupScreen.setAttribute('style',"display:flex")  })


//<----------> Code for library Starts Here <-----------> stop HTML47:15 JS 53

//books - main div holding all the books
const books = document.querySelector('.books');

//Library (array of books)
let myLibrary = [{
    title: "Example",
    author: "me",
    pages: 500,
    read: true
}, {
    title: "Example 2",
    author: "you",
    pages: 100,
    read: false,
}
];


function addLocalStorage() {

    myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    saveAndRenderBooks();
}

//Add the book that are in the form 57:20
const addBookForm = document.querySelector("#book-form")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(e.target);
    let newBook = {};
    for(let [name,value] of data) {
        if(name === "book-read") {
            newBook["book-read"] = true;
        }
        else {
            newBook[name] = value || ""
        }
    }

    if(!newBook["book-read"]) {
        newBook["book-read"] = false;
    }

    addBookToLibrary(newBook["book-name"], 
    newBook["book-author"], 
    newBook["book-pages"], 
    newBook["book-read"],);

    addBookForm.reset();
    popupScreen.style.display = "none";


});


function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
    saveAndRenderBooks()
}


//Create elements for each book (helper function to create HTML elements
//with text content and classes)
function createBookElement(el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
}

//read or not function (helper function to create input checkbox for if
//book is read w/ event listener

function createReadElement(bookItem, book) {
    let read = document.createElement("span");
    read.setAttribute("class", "book-read");
    read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("click", (e)=> {
        if(e.target.checked) {
            bookItem.setAttribute("class", "card book read-checked")
            book.read = true;
            saveAndRenderBooks()
        }
        else {
            bookItem.setAttribute("class", "card book read-unchecked");
            book.read = false;
            saveAndRenderBooks();
        }
    })

    if (book.read){
        input.checked = true;
        bookItem.setAttribute("class", "card book read-checked");
    }
    read.appendChild(input);
    return read;

}

//create the edit icon w/ event listener
function createEditIcon(book) {
    const editIcon = document.createElement("img");
    editIcon.src = "./img/pencil-white.png";
    editIcon.setAttribute("class", "edit-icon");
    editIcon.addEventListener("click", (e) => {
        console.log(book);
    });
    return editIcon;
}

function deleteBook(index) {
    myLibrary.splice(index,1)
    saveAndRenderBooks();
    
}

//create divs for each new book (function to create all of the book content
// on the book dom card)
function createBookItem (book, index) {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("id", index);
    bookItem.setAttribute("key", index);
    bookItem.setAttribute("class", "card book");
    bookItem.appendChild(createBookElement('h1', `Title: ${book.title}`, "book-title"));
    bookItem.appendChild(createBookElement('h1', `Author: ${book.author}`, "book-author"));
    bookItem.appendChild(createBookElement('h1', `Pages: ${book.pages}`, "book-pages"));
    bookItem.appendChild(createReadElement(bookItem, book));
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    bookItem.appendChild(createEditIcon(book));
    bookItem.querySelector(".delete").addEventListener("click", () => {
        deleteBook(index);
    })
    books.insertAdjacentElement("afterbegin", bookItem);


}

//book constructor
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.id = Math.floor(Math.random() * 100000);
    this.info = function() {
        return (title + author + pages + read);
    }
}

//render books (function to render all the books)
function renderBooks() {
    books.textContent = "";
    myLibrary.map((book,index) => {
        createBookItem(book,index)
    })
}

function saveAndRenderBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
}

//render on page load
addLocalStorage();