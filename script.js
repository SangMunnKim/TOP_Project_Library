const myLibrary = [];
// Default book to display
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Yes");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = this.read === "Yes" ? "No" : "Yes";
};

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function updateDisplay() {
    displayBooks.innerHTML = "";
    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read}</p>
            <button class="toggle-read" data-index="${index}">Toggle Read Status</button>
            <br><br>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        displayBooks.appendChild(card);
    });

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            myLibrary.splice(index, 1); // Remove the book from the array
            updateDisplay(); // Update the display
        });
    });

    // Add event listeners to the toggle read buttons
    const toggleReadButtons = document.querySelectorAll(".toggle-read");
    toggleReadButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            myLibrary[index].toggleRead(); // Toggle the read status of the book
            updateDisplay(); // Update the display
        });
    });
}

const addBook = document.querySelector(".btn");
const closeButton = document.querySelector("dialog button");
const dialog = document.querySelector("dialog");
const submit = document.querySelector("input[type='submit']");
const displayBooks = document.querySelector(".display-books");
const form = document.querySelector("form");

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
    let read = document.querySelector("input[name='read']:checked").value;

    if (!title || !author || !pages) return;

    addBookToLibrary(title, author, pages, read);
    dialog.close();
    updateDisplay();
    form.reset();
});

updateDisplay();