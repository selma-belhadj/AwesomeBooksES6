class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static db = () => ((window.localStorage.getItem('books') !== null) ? JSON.parse(window.localStorage.getItem('books')) : [])

  static removeBook = (button) => {
    const result = this.db().filter((word) => word.title !== button.getAttribute('data-book-name'));
    button.parentElement.remove();
    window.localStorage.setItem('books', JSON.stringify(result));
  }

  static load = () => {
    this.db().forEach((data) => {
      document.querySelector('#listbooks').innerHTML += `
                <li>
                    <p><q>${data.title}</q> by ${data.author}</p>
                    <button class='removeBook' data-book-name="${data.title}" >remove</button>
                </li>
            `;
    });
  }
}

(() => {
  Books.load();
})();

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
                <p><q>${bookTitle.value}</q> by ${bookAuthor.value}</p>
                <button type="button" data-book-name="${book.title}" onclick='removeBook(this)' >remove</button>
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

document.querySelectorAll('.removeBook').forEach((deleteBook) => {
  deleteBook.addEventListener('click', () => Books.removeBook(deleteBook));
});