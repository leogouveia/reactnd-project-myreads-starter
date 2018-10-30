import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { shelves, books, booksWithoutShelf } from "../../fixtures/fixtures";
import BooksApp from "../../../components/BooksApp/BooksApp";
import * as BooksService from "../../../common/BooksService";

jest.mock("../../../common/BooksService");

describe("<BooksApp />", () => {
  it("should render app page", async () => {
    const newBook = { ...books[0], shelf: "shelf3" };
    const newBooks = books.filter(b => b.id !== books[0].id).concat(newBook);

    BooksService.getAll.mockImplementation(() => Promise.resolve(books));

    BooksService.update.mockImplementation((book, shelf) =>{
      return Promise.resolve(newBooks);
    });
    
    BooksService.getShelves.mockReturnValue(shelves);

    const wrapper = mount(<BooksApp />);
    expect(toJson(wrapper)).toMatchSnapshot();

    const allBooks = await BooksService.getAll();
    expect(wrapper.state("books")).toEqual(allBooks);
    expect(wrapper.state("shelves")).toEqual(shelves);

    await wrapper.instance().onChangeShelf(newBook);
    expect(wrapper.state("books")).toEqual(newBooks);
  });
});
