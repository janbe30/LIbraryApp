let myLibrary = {}; // Stores book objs


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
  const id = `Bk-T${title.length}A${author.length}`;
  let newBook = new Book(title, author, pages, read);
  if(myLibrary[id] === undefined) {
    myLibrary[id] = newBook;
    console.log(myLibrary);
  }
 
}

const displayBooksFromLibrary = () => {
  let booksContainer = document.querySelector('#library');
  Object.keys(myLibrary).forEach((key) => {
    const bookElem = document.createElement("article");
    bookElem.classList.add('library__bookCard');
    bookElem.innerHTML=`<h3 class="title is-3">${myLibrary[key].title}</h3> <p><strong>By:</strong> ${myLibrary[key].author}</p> <p>${myLibrary[key].pages} pages`;
    booksContainer.appendChild(bookElem);
  });
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
 const inputFields = form.querySelectorAll('input[type="text"], input[type="number"], input[type="radio"]');
 let savedInputs = {};
 inputFields.forEach(field => { // Grabs users input from form and saves it in obj
  let input = '';
  let id = field.id;
  if(field.value !== "" && field.type !=='radio' ){
    input = field.value;
  } else if(field.type === 'radio' && field.checked) {
    input = field.checked;
  } else {
    return;
  }
  savedInputs[id] = input;
 });
 if(Object.keys(savedInputs).length > 0){ // goes through obj and assigns to vars to add to library
   let title = savedInputs['titleInput'];
   let author = savedInputs['authorInput'];
   let pages = savedInputs['pagesInput'] === null? '' : savedInputs['pagesInput'];
   let read = savedInputs['readYesInput'] || savedInputs['readNoInput'];
   addBookToLibrary(title,author,pages, read);
 }

}

// Main functions
const init = () => {
  let book1 = ['I Might Regret This','Liane Moriarty','356', true];
  let book2 = ['Big Little Lies','Abbi Jacobson','235', true];
  addBookToLibrary(book1[0],book1[1],book1[2],book1[3]);
  addBookToLibrary(book2[0],book2[1],book2[2],book2[3]);
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
