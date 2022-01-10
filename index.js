import { findHight, returnSufixDate, formatDate } from './modules/extra.js';
import Books from './modules/books.js';

(() => {
  Books.load();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.querySelector('#todaydate').innerHTML = `${monthNames[new Date().getMonth()]} ${new Date().getDate()}<sup>${returnSufixDate(new Date().getDate())}</sup> ${new Date().getFullYear()}`;
  setInterval(() => {
    document.querySelector('#currenttime').innerHTML = `${formatDate()}`;
  }, 1000);
  findHight();
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

document.querySelectorAll('.nav').forEach((nav) => {
  nav.addEventListener('click', (e) => {
    document.querySelectorAll('.nav').forEach((nav2) => nav2.classList.remove('activelink'));
    e.preventDefault();
    document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
    e.target.classList.add('activelink');
    document.querySelector(e.target.getAttribute('href')).classList.add('active');
    findHight();
  });
});
