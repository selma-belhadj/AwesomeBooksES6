const myStorage = window.localStorage;

const books = (myStorage.getItem('books') !== null) ? JSON.parse(myStorage.getItem('books')) : [];

books.forEach((data) => {
  document.querySelector('#listbooks').innerHTML += `
            <li>
                <p>${data.title}</p>
                <p>${data.author}</p>
                <button>remove</button>
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
                <button type="button">remove</button>
                <hr>
            </li>
        `;
    myStorage.setItem('books', JSON.stringify(books));
  }
};

document.querySelector('#addbookform').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  addBook(title, author);
  title.value = '';
  author.value = '';
});