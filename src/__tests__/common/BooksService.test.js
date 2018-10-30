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

  describe(">> update", () => {
    it("should return all books with correct shelves", async () => {
      const newBook = { ...books[0], shelf: "shelf2" };
      const newBooks = [books.filter(b => b.id !== newBook.id), newBook];
      BooksAPI.getAll.mockResolvedValue(newBooks);
      BooksAPI.update.mockResolvedValue({
        shelf1: ["2"],
        shelf2: [1, "3", "4", "5"],
        shelf3: ["6", "7", "8"]
      });

      const result = await BooksService.update(books[0], "shelf2");
      expect(result).toEqual(newBooks);
    });

    it("should throw an error if book doesn't change shelf", () => {
      BooksAPI.update.mockResolvedValue({
        shelf1: [1, "2"],
        shelf2: ["3", "4", "5"],
        shelf3: ["6", "7", "8"]
      });

      return BooksService.update(books[0], "shelf2").catch(error => {
        return expect(error).toEqual("Book shelf not changed");
      });
    });

    it("should throw an error if response is not as expected", () => {
      BooksAPI.update.mockResolvedValue({});

      return BooksService.update(books[0], "shelf2").catch(error => {
        return expect(error).toEqual("Response error");
      });
    });
  });
});
