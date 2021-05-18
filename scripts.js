let myLibrary = {}; // Stores book objs - supposed to use array (but how could we look for duplicates?)

// ES6 class
class Book {
    constructor(id, title, author, pages, read){
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        let readStatus = this.read === true? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }

    changeReadStatus() {
      this.read = this.read === true? 'Read' : 'Not read yet';
    }
}

const addBookToLibrary = (title, author, pages, read) => {
  const id = `Bk-T${title.length}A${author.length}`;
  let newBook = new Book(id,title, author, pages, read);
  if(myLibrary[id] === undefined) {
    myLibrary[id] = newBook;
    displayNewBook(newBook);
    toggleEmptyMessage();
    console.log(myLibrary);
  }
}

const displayNewBook = (book) => {
  let booksContainer = document.querySelector('#library');
  const bookElem = document.createElement('article');
  bookElem.classList.add('library__bookCard');
  bookElem.setAttribute('data-index',book.id);
  bookElem.innerHTML=`<button class="button remove-btn"><i aria-hidden="true" class="fas fa-minus-circle" title="Remove from library"></i></button><h3 class="title is-3">${book.title}</h3> <p><strong>By:</strong> ${book.author}</p>`;
  if(book.pages !== undefined){
    let pagesText = document.createElement("p");
    pagesText.innerHTML =  `${book.pages} pages`;
    bookElem.appendChild(pagesText);
  }
  booksContainer.appendChild(bookElem);
  activateListeners();
}

const displayBooksFromLibrary = () => {
  let booksContainer = document.querySelector('#library');
  Object.keys(myLibrary).forEach((key) => {
    const bookElem = document.createElement("article");
    bookElem.classList.add('library__bookCard');
    bookElem.innerHTML=`<h3 class="title is-3">${myLibrary[key].title}</h3> <p><strong>By:</strong> ${myLibrary[key].author}</p>`;
    if(myLibrary[key].pages !== undefined){
      let pagesText = document.createElement("p");
      pagesText.innerHTML =  `${myLibrary[key].pages} pages`;
      bookElem.appendChild(pagesText);
    }
    booksContainer.appendChild(bookElem);
  });
}

const removeBook = (book) => {
  let bookElem = book.parentElement;
  let bookIndex = bookElem.dataset.index;
console.log('removing book...');
  delete myLibrary[bookIndex];
  bookElem.remove();
  console.log(myLibrary);
  toggleEmptyMessage();
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

toggleEmptyMessage = () => {
  let msg = document.getElementById('empty-msg');
  if(Object.keys(myLibrary).length <= 0) {
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
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

const activateListeners = () => {
  let addNewBtn = document.querySelector('button.modal-button'); 
  let removeBtns = document.querySelectorAll('button.remove-btn');
  addNewBtn.addEventListener('click', function(e){
    e.preventDefault();
    openModal(this);
  });
  removeBtns.forEach( btn => btn.addEventListener('click', function(e){
    e.preventDefault();
    removeBook(this);
  }));
}

// Main functions
const init = () => {
  // Initialize library with a couple examples (may need to remove after adding local storage functionality)
  let book1 = ['I Might Regret This','Abbi Jacobson','235', true];
  let book2 = ['Big Little Lies','Liane Moriarty', undefined, true];
  addBookToLibrary(book1[0],book1[1],book1[2],book1[3]);
  addBookToLibrary(book2[0],book2[1],book2[2],book2[3]);
  //displayBooksFromLibrary();
  
}

window.addEventListener("load", () => {
  init();
  activateListeners();
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


// TO-DO:

/* 
1. Refine the design - specifically add Read/Not Read function
2. Form validation 
3. Add read/not read function
4. Local storage functionality

*/