let myLibrary = [
  {title: 'I Might Regret This', author: 'Liane Moriarty', pages: '356', read: true},
  {title: 'Big Little Lies', author: 'Abbi Jacobson', pages: '235', read: true}
]; // Stores book objs
let booksContainer = document.querySelector('#books');

// ES6 class
class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let readStatus = this.read === true? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
}

const addBookToLibrary = (title, author, pages, read) => {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const displayBooksFromLibrary = () => {
  myLibrary.forEach(() => {
    let bookElem = document.createElement("article");
    bookElem.innerHTML(`<h3>${this.title}</h3>`);
    booksContainer.appendChild(bookElem);
  })
}

// Main functions
const init = () => {
  displayBooksFromLibrary();
}

window.addEventListener("load", () => {
  init();
});



// Following OP format (ES5)
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// // By defining functions on the protoype of the object, we ensure a single instance will be shared between all obj created and not duplicated every time
// Book.prototype.info = function () {
//   let readStatus = this.read === true ? "read" : "not read yet";
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
// };

// // Takes user's input and stores the new book object into the myLibrary array
// function addBookToLibrary() {

// }
