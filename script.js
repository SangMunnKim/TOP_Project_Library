const myLibrary = [];
//default book to display
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
// updateDisplay();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const addBook = document.querySelector(".btn");
const closeButton = document.querySelector("dialog button");
const dialog = document.querySelector("dialog");
const submit = document.querySelector("input[type='submit']");
const displayBooks = document.querySelector(".display-books");


addBook.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    let title = document.querySelector("input[name='title']").value;
    let author = document.querySelector("input[name='author']").value;
    let pages = document.querySelector("input[name='pages']").value;
    let read = document.querySelector("input[name='read']").checked;

    if (!title || !author || !pages) return;

    addBookToLibrary(title, author, pages, read);
    dialog.close();
    updateDisplay();
});

function updateDisplay() {
    displayBooks.innerHTML = "";
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>${book.read ? "Yes" : "No"}</p>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        displayBooks.appendChild(card);
    });
}
