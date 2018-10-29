import * as BooksService from "../../common/BooksService";
import * as BooksAPI from "../../common/BooksAPI";
import { books, booksWithoutShelf } from "../fixtures/fixtures";

jest.mock("../../common/BooksAPI");
describe("BooksService", () => {
  it("should fetch all books", () => {
    BooksAPI.getAll.mockResolvedValue(books);
    return BooksService.getAll().then(booksRes => {
      expect(booksRes).toEqual(books);
    });
  });

  it("should return books when searched", () => {
    BooksAPI.search.mockResolvedValue([booksWithoutShelf[1]]);
    return BooksService.search("anyQuery").then(res => {
      expect(res).toEqual([{ ...booksWithoutShelf[1], shelf: "none" }]);
    });
  });

  it("should reject and throw error when don't find any books", () => {
    BooksAPI.search.mockResolvedValue({
      books: { error: "empty query", items: [] }
    });
    return BooksService.search("anyQuery").catch(err => {
      expect(err).toEqual(new Error("No Books"));
    });
  });

  it("should merge books returned in search with books in shelf", () => {
    BooksAPI.search.mockResolvedValue(booksWithoutShelf);
    BooksService.search("anyQuery", [books[0]]).then(booksResult => {
      expect(booksResult).toEqual([
        books[0],
        { ...booksWithoutShelf[1], shelf: "none" }
      ]);
    });
  });
});
