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
    this.showAlert('Book deleted ', 'success');
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

   static addBook = (book) => {
     const result = this.db().filter((word) => word.title === book.title);
     if (result.length === 0) {
       const data = this.db();
       data.push(book);
       window.localStorage.setItem('books', JSON.stringify(data));
       document.querySelector('#listbooks').innerHTML += `
        <li>
            <p><q>${book.title}</q> by ${book.author}</p>
            <button type="button" data-book-name="${book.title}" onclick='removeBook(this)' >remove</button>
        </li>
        `;
       this.showAlert('Book added ', 'success');
     } else {
       this.showAlert('Book already exists ', 'danger');
     }
   }

   static showAlert(message, className) {
     const div = document.createElement('div');
     div.className = `alert ${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('#addbookform');
     const formtitle = document.querySelector('#formtitle');
     container.insertBefore(div, formtitle);
     setTimeout(() => document.querySelector('.alert').remove(), 3000);
   }
}

(() => {
  Books.load();
})();

document.querySelector('#addbookform').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  if (title.value !== '' && author.value !== '') {
    const BookObj = new Books(title.value, author.value);
    Books.addBook(BookObj);
    title.value = '';
    author.value = '';
  } else {
    Books.showAlert('Please fill all the fields', 'danger');
  }
});

document.querySelectorAll('.removeBook').forEach((deleteBook) => {
  deleteBook.addEventListener('click', () => Books.removeBook(deleteBook));
});