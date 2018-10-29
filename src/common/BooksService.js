import * as BooksAPI from "./BooksAPI";
import "@babel/polyfill";

export const getShelves = () => [
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
];

/**
 * Add shelf info from array returned in search API
 * 
 * @param {Array} queriedBooks 
 * @param {Array} booksInShelf 
 */
const mergeBooks = (queriedBooks, booksInShelf) => {
  const mergedBooks = queriedBooks.map(book => {
    const [propBook] = booksInShelf.filter(b => b.id === book.id);
    if (propBook) {
      return propBook;
    }
    return { shelf: "none", ...book };
  });

  return new Promise(res => {
    return res(mergedBooks);
  });
};

/**
 * Proxies getAll from BooksAPI
 */
export const getAll = () => {
  return BooksAPI.getAll()
    .then(res => res)
    .catch(err => Promise.reject(err));
};

/**
 * Proxies get book from BooksAPI
 * 
 * @param {number} id 
 */
export const get = id => {
  return BooksAPI.get(id);
};

/**
 * Treats, proxies and return books with shelves when searching a book.
 * 
 * @param {string} query 
 * @param {array} booksInShelf 
 */
export const search = async (query, booksInShelf) => {
  let searchedBooks = await BooksAPI.search(query);

  if (!Array.isArray(searchedBooks)) {
    throw new Error("No Books");
  }

  if (booksInShelf) {
    return mergeBooks(searchedBooks, booksInShelf);
  }
  booksInShelf = await BooksAPI.getAll();
  return mergeBooks(searchedBooks, booksInShelf);
};

/**
 * Update shelf info from a book.
 * 
 * @param {object} book 
 * @param {object} shelf 
 */
export const update = (book, shelf) => {
  return BooksAPI.update(book, shelf)
      .then(res => {
        if(!Object.prototype.hasOwnProperty.call(res, shelf.id)) {
          throw 'Response error';
        }
        if (!res[shelf.id].some((bookId) => book.id === bookId)) {
          throw 'Book shelf not changed';
        }
        return res;
      });
};
