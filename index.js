const myStorage = window.localStorage;

let books = (myStorage.getItem('books') !== null) ? JSON.parse(myStorage.getItem('books')) : [];

books.forEach((data) => {
  document.querySelector('#listbooks').innerHTML += `
            <li>
                <p>${data.title}</p>
                <p>${data.author}</p>
                <button class='removeBook' data-book-name="${data.title}" >remove</button>
                <hr>
            </li>
        `;
});

const addBook = (bookTitle, bookAuthor) => {
  const book = {
    title: '',
    author: '',
  };
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    book.title = bookTitle.value;
    book.author = bookAuthor.value;
    books.push(book);
    document.querySelector('#listbooks').innerHTML += `
            <li>
                <p>${bookTitle.value}</p>
                <p>${bookAuthor.value}</p>
                <button type="button" data-book-name="${book.title}" onclick='removeBook(this)' >remove</button>
                <hr>
            </li>
        `;
    myStorage.setItem('books', JSON.stringify(books));
  }
};

const removeBook = (button) => {
  const result = books.filter((word) => word.title !== button.getAttribute('data-book-name'));
  books = result;
  button.parentElement.remove();
  myStorage.setItem('books', JSON.stringify(books));
};

document.querySelector('#addbookform').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  addBook(title, author);
  title.value = '';
  author.value = '';
});

document.querySelectorAll('.removeBook').forEach((deleteBook) => {
  deleteBook.addEventListener('click', () => removeBook(deleteBook));
});