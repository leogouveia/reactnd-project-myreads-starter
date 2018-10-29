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

  it("should render results when user types a query", () => {
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

    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: { value: "anyQuery" }
      });

    expect(wrapper.state("query")).toBe("anyQuery");

    expect(BooksService.search).toHaveBeenCalledWith("anyQuery");
    return BooksService.search("anyQuery").then(() => {
      expect(wrapper.state("queriedBooks")).toEqual({
        ...booksWithoutShelf[1],
        shelf: "none"
      });
    });
  });
});
