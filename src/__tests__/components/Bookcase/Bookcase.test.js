import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Bookcase from "../../../components/Bookcase/Bookcase";
import { shelves, books } from "../../fixtures/fixtures";

describe("<Bookcase />", () => {
  it("should render a Bookcase", () => {
    const handleChangeShelf = jest.fn();
    const wrapper = shallow(
      <Bookcase
        shelves={shelves}
        books={books}
        handleChangeShelf={handleChangeShelf}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
