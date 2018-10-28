import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Shelf } from "../../../components/Shelf/Shelf";
import { Book } from "../../../components/Book/Book";
import { books } from "../../fixtures/fixtures";

it('should render a shelf with books', () => {
  const wrapper = shallow(
      <Shelf name={"Shelf name"}>
        <Book book={books[0]} />
        <Book book={books[1]} />
      </Shelf>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should render a shelf without books', () => {
  const wrapper = shallow(<Shelf name={"Shelf name"} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});