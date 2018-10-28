import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { shelves, books } from "../../fixtures/fixtures";
import SearchBooks from "../../../components/SearchBooks/SearchBooks";

it('should render search page', () => {
  const handleChangeShelfMock = jest.fn();

  const wrapper = shallow(
    <SearchBooks 
      shelves={shelves}
      books={books}
      handleChangeShelf={handleChangeShelfMock}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();

}) 