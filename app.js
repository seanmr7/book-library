let myLibrary = [1, 2, 3 ,4];
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
  addForm.style.display = "none";
  addForm.reset();
}
addForm.addEventListener("submit", addBookToLibray);

// Display add book form when clicking "Add a Book" button
function showAddBookForm() {
  if (addForm.style.display == "none") {
    addForm.style.display = "block";
  } else { addForm.style.display = "none" }
}
addBookButton.addEventListener("click", showAddBookForm);

// Display library when clicking "Show Library" button
function showLibrary() {
  myLibrary.forEach(function(book) {
    const newBookElement = document.createElement("div");

    const newAuthor = document.createTextNode("Author");
    newBookElement.appendChild(newAuthor);

    document.body.insertBefore(newBookElement, addForm);
  })
}
displayLibraryButton.addEventListener("click", showLibrary);