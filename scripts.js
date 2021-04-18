let myLibrary = [
  {title: 'I Might Regret This', author: 'Liane Moriarty', pages: '356', read: true},
  {title: 'Big Little Lies', author: 'Abbi Jacobson', pages: '235', read: true}
]; // Stores book objs


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
  let booksContainer = document.querySelector('#library');
  myLibrary.forEach((book) => {
    const bookElem = document.createElement("article");
    bookElem.classList.add('library__bookCard');
    bookElem.innerHTML=`<h3 class="title is-3">${book.title}</h3> <p><strong>By:</strong> ${book.author}</p> <p>${book.pages} pages`;
    booksContainer.appendChild(bookElem);
  })
}

const openModal = (btn) => {
  let targetModal = btn.dataset.target;
  let targetElem = document.querySelector(`.${targetModal}`);
  let htmlBody = document.querySelector('html');
  let addBtn = document.getElementById('add-book-btn');
  targetElem.classList.add("is-active");
  htmlBody.classList.add("is-clipped");
  closeModal(targetElem,htmlBody);
  
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getUserInput(targetElem);
  });
  
}

const closeModal = (modal,html) => {
  let closeBtn = modal.querySelector("button.modal-close");
  closeBtn.addEventListener('click', () => { // close modal if 'close' button is clicked
    modal.classList.remove("is-active");
    html.classList.remove("is-clipped");
  });
  document.addEventListener('click', e => {
    if(e.target.classList.contains('modal-background')){ // close modal if user clicks on the background 
      modal.classList.remove("is-active");
      html.classList.remove("is-clipped");
    }
  });
}

getUserInput = (form) => {
  /* get all input type 'text', 'number' and 'radio' 
  *  iterate through the nodelist and if it's not empty add to library obj with the corresponding index.
  *
  */

 const inputFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="radio"]');
 console.log(inputFields);
 inputFields.forEach(field => {
  if(field.value !== ""){
    // Need to make use of the AddBookToLibrary method. 
  }
 });
}

// Main functions
const init = () => {
  displayBooksFromLibrary();
  let addNewBtn = document.querySelector('button.modal-button'); // May want to group together if more than one listener
  addNewBtn.addEventListener('click', function(e){
    e.preventDefault();
    openModal(this);
  });
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
