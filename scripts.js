let myLibrary = {}; // Stores book objs - supposed to use array (but how could we look for duplicates?)
let storage = false;

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
        let readStatus = this.read === true? 'read' : 'not read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }

    changeReadStatus() {
      if(this.read === true || this.read === 'Read')  this.read = 'Not read'; 
      else if(this.read === false || this.read === 'Not read')  this.read = 'Read';
    }
}

const addBookToLibrary = (title, author, pages, read) => {
  const id = `Bk-T${title.length}A${author.length}`;
  let newBook = new Book(id,title, author, pages, read);
  if(myLibrary[id] === undefined) {
    myLibrary[id] = newBook;
    if(storage) {
      storeBookLocally(newBook);
    }
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
  bookElem.innerHTML=`<button class="button remove-btn"><i aria-hidden="true" class="fas fa-minus-circle" title="Remove from library"></i></button><h3 class="title is-3">${book.title}</h3> <p>${book.author}</p>`;
  if(book.pages !== undefined){ 
    let pagesText = document.createElement("p");
    pagesText.innerHTML =  `${book.pages} pages`;
    bookElem.appendChild(pagesText);
  }
  if(book.read !== undefined){
    let readStatus = book.read === true? 'read' : 'not read';
    let readBtn = document.createElement("button");
    readBtn.classList.add('button');
    readBtn.classList.add('read-btn');
    readBtn.innerHTML = readStatus;
    bookElem.appendChild(readBtn);
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
  delete myLibrary[bookIndex];
  bookElem.remove();
  toggleEmptyMessage();
}

const changeBookStatus = (book) => {  // TODO: Fix bug - function running multiple times when book is already in library at load time
  let bookElem = book.parentElement;
  let bookIndex = bookElem.dataset.index;
  myLibrary[bookIndex].changeReadStatus();
  let readStatus = myLibrary[bookIndex].read;
  console.log(myLibrary[bookIndex]);
  bookElem.querySelector('.read-btn').innerHTML = readStatus;
}

const openModal = (btn) => {
  let targetModal = btn.dataset.target;
  let targetElem = document.querySelector(`.${targetModal}`);
  let htmlBody = document.querySelector('html');
  let addBtn = document.getElementById('add-book-btn');
  targetElem.classList.add("is-active");
  htmlBody.classList.add("is-clipped");
  closeModal(targetElem);
  
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getUserInput(targetElem, function(){
      let form = document.getElementById('new-book-form');
      form.reset(); 
      closingModalProps(targetElem, htmlBody);
    });
  });
  
}

const closeModal = (modal) => {
  let html = document.querySelector('html');
  let closeBtn = modal.querySelector("button.modal-close");
  closeBtn.addEventListener('click', () => { // close modal if 'close' button is clicked
    closingModalProps(modal, html);
  });
  document.addEventListener('click', e => {
    if(e.target.classList.contains('modal-background')){ // close modal if user clicks on the background 
      closingModalProps(modal, html);
    }
  });
}

const closingModalProps = (modal, html) => {
  modal.classList.remove("is-active");
  html.classList.remove("is-clipped");
}

function liveValidation(field) {
  if (field.classList.contains('is-danger'))
    field.classList.remove('is-danger');
  // TODO: Add 'live' validation so 'Add btn' becomes enabled
  // title.addEventListener('input',countChars); // Using () will execute the fn and return its value. without it will fetch the function (reference it)
  // author.addEventListener('input',countChars);
  // if(title.dataset.valid === 'true' && author.dataset.valid === 'true') {
  //   console.log('req fields are valid now')
  // }
}

const validateFormInput = () => {
  let requiredFields = document.querySelectorAll('input[required]');
  let flag = true;
  requiredFields.forEach( field => {
    if(field.value.length <= 0) { 
      flag = false;
      field.classList.add('is-danger');
    } 
  });

  return flag;
}

const countChars = (e) => {
  let field = e.currentTarget;
  let currentInput = e.currentTarget.value;
  if(currentInput.length >= 2) {
    field.dataset.valid = 'true'; 
  } else {
    field.dataset.valid = 'false';
  }
  return;
}

getUserInput = (form, callback) => {
  let validForm = validateFormInput();
  if(validForm){
    console.log('form is valid');
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
      let read = savedInputs['readYesInput']? true : false;
      addBookToLibrary(title,author,pages, read);
    }
  }
  callback();
}

toggleEmptyMessage = () => {
  let msg = document.getElementById('empty-msg');
  if(Object.keys(myLibrary).length <= 0) {
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
}

const activateListeners = () => {
  let addNewBtn = document.querySelector('button.modal-button'); 
  let removeBtns = document.querySelectorAll('button.remove-btn');
  let readBtns = document.querySelectorAll('button.read-btn');
  let requiredFields = document.querySelectorAll('input[required]');

  addNewBtn.addEventListener('click', function(e){
    e.preventDefault();
    openModal(this);
  });
  removeBtns.forEach( btn => btn.addEventListener('click', function(e){
    e.preventDefault();
    removeBook(this);
  }));
  readBtns.forEach( btn => { 
    btn.addEventListener('click', function(e){ 
    e.preventDefault();
    changeBookStatus(this);
    });
  });
  requiredFields.forEach(field => field.addEventListener('input', () => liveValidation(field)));
}

// Main functions
const init = () => {
  // Initialize library with a couple examples (may need to remove after adding local storage functionality)
  // let book1 = ['I Might Regret This','Abbi Jacobson','235', true];
  // let book2 = ['Big Little Lies','Liane Moriarty', undefined, true];
  // addBookToLibrary(book1[0],book1[1],book1[2],book1[3]);
  // addBookToLibrary(book2[0],book2[1],book2[2],book2[3]);
  //displayBooksFromLibrary();
  toggleEmptyMessage();
}

window.addEventListener("load", () => {
  init();
  activateListeners();
  checkforStorage();
});

// Web Storage
const storageAvailable = function(type) {
  let storage;
  try {
      storage = window[type];
      let x = '__storage_test__';
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

const checkforStorage = function() {
  if(storageAvailable('localStorage')) {
    console.log('local storage can be used!');
    storage = true;
    if(localStorage.length > 0) { 
      console.log('Display books from storage'); 
      getBooksFromStorage();
    }

  } else {
    console.log('No local storage :(');
  }
}

const storeBookLocally = function(book){
  let book_serialized = JSON.stringify(book);
  localStorage.setItem(book.id, book_serialized);
  //console.log(localStorage.getItem(book.id)); // get book in string format
}

const getBooksFromStorage = function(){
  let bookObj;
  for(let [key,value] of Object.entries(localStorage)){
    let bookObj = JSON.parse(localStorage.getItem(key));
    console.log(`Value from storage: ${value}`);
    console.log(bookObj); //
    displayNewBook(bookObj);
  }
}




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
1. Refine the design - specifically add Read/Not Read function  : DONE
2. Form validation, close form when book is added
    ** After form is validated, close modal if everything looks good
3. Add read/not read function : DONE
4. Local storage functionality
5. Fix any quirks/bugs

*/