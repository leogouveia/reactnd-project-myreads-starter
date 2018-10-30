import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { shelves, books, booksWithoutShelf } from "../../fixtures/fixtures";
import SearchBooks from "../../../components/SearchBooks/SearchBooks";
import * as BooksService from "../../../common/BooksService";

jest.mock("../../../common/BooksService");
const handleChangeShelfMock = jest.fn();

describe("<SearchBooks />", () => {
  it("should render search page", () => {
    const wrapper = shallow(
      <SearchBooks
        shelves={shelves}
        books={books}
        handleChangeShelf={handleChangeShelfMock}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render results when user types a query", (done) => {
   
    BooksService.search.mockImplementation(() =>
      Promise.resolve({ ...booksWithoutShelf[1], shelf: "none" })
    );

    const wrapper = shallow(
      <SearchBooks
        shelves={shelves}
        books={books}
        handleChangeShelf={handleChangeShelfMock}
      />
    );

    const instance = wrapper.instance();
    const searchBook = jest.spyOn(instance, 'searchBook');

    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: { value: "anyQuery2" }
      });

    expect(wrapper.state("query")).toBe("anyQuery2");
    expect(searchBook).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      expect(wrapper.state("queriedBooks")).toEqual({
        ...booksWithoutShelf[1],
        shelf: "none"
      });
      done();
    }, 801);
  });
});
