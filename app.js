let myLibrary = [1, 2, 3 ,4];
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
  addBookToDocument(newBook);
  addForm.style.display = "none";
  addForm.reset();
  libraryContainer.style.display = "flex";
}
addForm.addEventListener("submit", addBookToLibray);

// Add new book to HTML document
function addBookToDocument(newBook) {
  const bookContainer = document.createElement("div");
  bookContainer.className = "book";

  const title = document.createElement("H1");
  const author = document.createElement("H2");
  const pageCount = document.createElement("p");
  
  const label = document.createElement("label");
  const labelText = document.createTextNode("Read: ");
  label.appendChild(labelText);
  
  var readCheckbox = document.createElement("INPUT");
  readCheckbox.setAttribute("type", "checkbox");
  
  const bookTitle = document.createTextNode(newBook.title);
  const bookAuthor = document.createTextNode(newBook.author);
  const bookPageCount = document.createTextNode(newBook.pageNumber);
  
  title.appendChild(bookTitle);
  author.appendChild(bookAuthor);
  pageCount.appendChild(bookPageCount);
  title.appendChild(bookTitle);

  if (newBook.read === true) {
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
}

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
  if (addForm.style.display == "block") {
    addForm.style.display = "none";
  }
  if (libraryContainer.style.display == "none") {
    libraryContainer.style.display = "flex";
  } else { libraryContainer.style.display = "none" }
}

displayLibraryButton.addEventListener("click", showLibrary);