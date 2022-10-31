const form = document.querySelector(".form");
const library = document.querySelector(".book-list");
const inputAuthor = document.querySelector(".input-author");
const inputBook = document.querySelector(".input-title");


let storedBooks = JSON.parse(localStorage.getItem("books"));
let bookShelf = [];

function libraryBooks(object) {
  return  `<div class="${object.author}">
    <p>${object.title}</p>
    <p>${object.author}</p> 
    <button class="remove">
    Remove
    </button>
    <hr>
    </div>`
  }
  
function remove() {
  if(bookShelf.length > 0){
    const removebtn = document.querySelectorAll(".remove");
    removebtn.forEach(element => element.addEventListener("click", ()=> {
      let parentNodeClass = element.parentNode.className;
      element.parentNode.remove()
      bookShelf = bookShelf.filter(x => x.author !== parentNodeClass)
      localStorage.setItem('books', JSON.stringify(bookShelf))
    })) 
  }
}


function add() {
  if(inputAuthor.value != "" && inputBook.value != ""){
    currentBook = []
    currentBook.push (
      {
        author: inputAuthor.value,
        title: inputBook.value
      }
    )
    bookShelf.push (
      {
        author: inputAuthor.value,
        title: inputBook.value
      }
    )   
    if(bookShelf.length > 0) {
      currentBook.forEach(data => library.insertAdjacentHTML('afterend', libraryBooks(data)))
    }
  } 
  inputAuthor.value = ""
  inputBook.value = ""
  localStorage.setItem('books', JSON.stringify(bookShelf))
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  add()
  remove()
}
)

if(storedBooks !== null){
   bookShelf = storedBooks
   bookShelf.forEach(book => {
   library.insertAdjacentHTML('afterend', libraryBooks(book))
   remove()
  })
}