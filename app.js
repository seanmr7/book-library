//let myLibrary = [];
setLibrary();
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

Book.prototype.readStatus = function() {
  if (this.read == false) {
    this.read = true;
  } else { this.read = false; }
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
  addForm.reset();
  populateStorage();
  showLibrary();
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
  resetLibrary();
  // Hide book form and display library
  if (addForm.style.display == "block") {
    addForm.style.display = "none";
  }
  if (libraryContainer.style.display == "none") {
    libraryContainer.style.display = "flex";
  } else { libraryContainer.style.display = "none" }
}

// Removes book div elements and repopulates library div
function resetLibrary() {
  libraryContainer.innerHTML = '';
  addBooksToDocument(myLibrary);
}

function addBooksToDocument(arr) {
  arr.forEach(function (book, index) {
    const bookContainer = document.createElement("div");
    bookContainer.className = "book";
    bookContainer.setAttribute("data-book-index", index);

    const deleteBTN = document.createElement("button");
    deleteBTN.innerText = "Delete";
    deleteBTN.className = "delete-btn";
    deleteBTN.setAttribute("id", index);
    deleteBTN.addEventListener("click", deleteBook);
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
    readCheckbox.addEventListener('change', changeReadBox);
  
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pageCount);
    bookContainer.appendChild(label);
    bookContainer.appendChild(readCheckbox);
    bookContainer.appendChild(deleteBTN);
    libraryContainer.appendChild(bookContainer);
  })
}
displayLibraryButton.addEventListener("click", showLibrary);

function deleteBook() {
  bookIndex = this.id
  myLibrary.splice(bookIndex, 1);
  resetLibrary();
  populateStorage();
}

function changeReadBox() {
  book = myLibrary[this.parentElement.getAttribute("data-book-index")]
  if (this.checked && book.read === false) {
    book.read = true;
  } else { book.read = false }
  populateStorage();
}

// storageAvailable from mozilla developer https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

// Set the libray using local storage
function setLibrary() {
  if (!localStorage.getItem('myLibrary')) {
    myLibrary = [];
  } else { myLibrary = JSON.parse(localStorage.getItem('myLibrary')) }
}

function populateStorage() {
  myLibrayStorage = JSON.stringify(myLibrary)
  localStorage.setItem('myLibrary', myLibrayStorage);
}

/*
let LOTR = new Book("JRR Tolkien", "Lord of the Rings", "355", true);
let HarryPotter = new Book("JK Rowling", "Harry Potter", "309", true);
let theGiver = new Book("Lois Lowry", "The Giver", "150", false);

myLibrary.push(LOTR, HarryPotter, theGiver) */