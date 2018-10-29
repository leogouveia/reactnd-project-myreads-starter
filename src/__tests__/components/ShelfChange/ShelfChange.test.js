import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ShelfChange } from "../../../components/ShelfChange/ShelfChange";
import { books, shelves } from "../../fixtures/fixtures";

const [book] = books;

describe("<ShelfChange />", () => {
  it("should render book change component", () => {
    const handleChangeShelfMock = jest.fn();
    const wrapper = shallow(
      <ShelfChange
        book={book}
        shelves={shelves}
        handleChangeShelf={handleChangeShelfMock}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
