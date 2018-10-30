import * as BooksAPI from "./BooksAPI";
import "@babel/polyfill";
import lodash from "lodash";

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
  },
  {
    id: "none",
    name: "None"
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
export const getAll = async () => {
  try {
    return await BooksAPI.getAll();
  } catch (error) {
    throw err;
  }
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
export const update = async (book, shelf) => {
  const shelvesList = await BooksAPI.update(book, shelf);

  if (shelf === "none") {
    if (lodash.some(shelvesList, shelf => shelf.includes(book.id)))
      throw "Book shelf not changed";
  } else {
    if (!lodash.has(shelvesList, shelf)) throw "Response error";
    if (!shelvesList[shelf].some(bookId => book.id === bookId))
      throw "Book shelf not changed";
  }
  return await BooksAPI.getAll();
};
