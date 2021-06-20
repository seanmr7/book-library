let myLibrary = [];
let libraryContainer = document.getElementById("library")
let addForm = document.getElementById("Add-book-form");
let addBookButton = document.getElementById("new-book");
let displayLibraryButton = document.getElementById("display-books")

function Book(author, title, pageNumber, read) {
  this.author = author;
  this.title = title;
  this.pageNumber = pageNumber;
  this.read = read;
}

// Add new book to library array when addForm is submitted
function addBookToLibray(event) {
  event.preventDefault();
  author = document.getElementById("author").value;
  title = document.getElementById("title").value;
  pageNumber = document.getElementById("pageNumber").value;
  read = document.getElementById("read").checked;

  newBook = new Book(author, title, pageNumber, read);
  myLibrary.push(newBook);
  //addForm.style.display = "none";
  addForm.reset();
  showLibrary();
  //libraryContainer.style.display = "flex";
}
addForm.addEventListener("submit", addBookToLibray);

// Display add book form when clicking "Add a Book" button
function showAddBookForm() {
  if (libraryContainer.style.display == "flex") {
    libraryContainer.style.display = "none";
  }
  if (addForm.style.display == "none") {
    addForm.style.display = "block";
  } else { addForm.style.display = "none" }
}
addBookButton.addEventListener("click", showAddBookForm);

// Display library when clicking "Show Library" button
function showLibrary() {
  // Reset Library container
  libraryContainer.innerHTML = '';

  if (addForm.style.display == "block") {
    addForm.style.display = "none";
  }
  if (libraryContainer.style.display == "none") {
    libraryContainer.style.display = "flex";
  } else { libraryContainer.style.display = "none" }

  myLibrary.forEach(function (book, index) {
    const bookContainer = document.createElement("div");
    bookContainer.className = "book";
    bookContainer.setAttribute("data-book-index", index)
     // Create DOM elements for title, author, pageCount, label, and checkbox
    const title = document.createElement("H1");
    title.innerText = book.title;
  
    const author = document.createElement("H2");
    author.innerText = `By: ${book.author}`;
  
    const pageCount = document.createElement("p");
    pageCount.innerText = `Pages: ${book.pageNumber}`;
  
    const label = document.createElement("label");
    label.innerText = `Read: `;
    
    var readCheckbox = document.createElement("INPUT");
    readCheckbox.setAttribute("type", "checkbox");
    if (book.read === true) {
      readCheckbox.checked = true;
    } else {
      readCheckbox.checked = false;
    }
  
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pageCount);
    bookContainer.appendChild(label);
    bookContainer.appendChild(readCheckbox);
    libraryContainer.appendChild(bookContainer);
  })
}

displayLibraryButton.addEventListener("click", showLibrary);

let LOTR = new Book("JRR Tolkien", "Lord of the Rings", "355", true);
let HarryPotter = new Book("JK Rowling", "Harry Potter", "309", true);
let theGiver = new Book("Lois Lowry", "The Giver", "150", false);

myLibrary.push(LOTR, HarryPotter, theGiver)