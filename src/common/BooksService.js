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

export const getAll = () => {
  return BooksAPI.getAll()
    .then(res => res)
    .catch(err => Promise.reject(err));
};

export const get = id => {
  return BooksAPI.get(id);
};

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

export const update = (book, shelf) => {
  return BooksAPI.update(book, shelf);
};
