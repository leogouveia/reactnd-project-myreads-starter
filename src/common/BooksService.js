import * as booksAPI from './BooksAPI';
import '@babel/polyfill';

export const getShelves = () => ([
  {
    id: "currentlyReading",
    name: "Currently Reading"
  },
  {
    id: "wantToRead",
    name: "Want to Read"
  },
  {
    id: "read",
    name: "Read"
  }
]);

const mergeBooks = (queriedBooks, booksInShelf) => {
  const mergedBooks = queriedBooks.map(book => {
    const [ propBook ] = booksInShelf.filter(b => b.id === book.id);
    if (propBook) {
      return propBook;
    }
    return { shelf: 'none', ...book };
  });

  return new Promise((res) => {
    return res(mergedBooks);
  });
};

export const getAll = () => {
  return booksAPI.getAll()
    .then((res) => res)
    .catch((err) => Promise.reject(err));
};

export const get = (id) => {
  return booksAPI.get(id);
};

export const search = async (query, booksInShelf) => {
  let searchedBooks = await booksAPI.search(query);

  if (searchedBooks && Object.prototype.hasOwnProperty.call(searchedBooks, 'error')) {
    throw new Error('No Books');
  }
  

  if (booksInShelf) {
    return mergeBooks(searchedBooks, booksInShelf);
  }
  booksInShelf = await booksAPI.getAll();
  return mergeBooks(searchedBooks, booksInShelf);

};

export const update = (shelf, book) => {
  return booksAPI.update(book, shelf);
};