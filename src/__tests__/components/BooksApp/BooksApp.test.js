import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { shelves, books, booksWithoutShelf } from "../../fixtures/fixtures";
import BooksApp from "../../../components/BooksApp/BooksApp";
import * as BooksService from "../../../common/BooksService";

jest.mock("../../../common/BooksService");

describe("<BooksApp />", () => {
  it("should render app page", () => {
    BooksService.getAll.mockImplementation(() => Promise.resolve(books));
    BooksService.update.mockImplementation((book, shelf) =>
      Promise.resolve({ ...book, shelf })
    );
    BooksService.getShelves.mockReturnValue(shelves);

    const newBook = { ...books[0], shelf: "shelf3" };
    const wrapper = mount(<BooksApp />);
    expect(toJson(wrapper)).toMatchSnapshot();
    return BooksService.getAll()
      .then(() => {
        expect(wrapper.state("books")).toEqual(books);
        expect(wrapper.state("shelves")).toEqual(shelves);
        return wrapper.instance().onChangeShelf(newBook);
      })
      .then(() => {
        expect(wrapper.state("books")).toEqual(
          books
            .map(b => (b.id === newBook.id ? newBook : b))
            .sort((a, b) => b.id - a.id)
        );
      });
  });
});
