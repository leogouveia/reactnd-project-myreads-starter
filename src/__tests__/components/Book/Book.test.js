import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Book } from "../../../components/Book/Book";

describe("<Book />", () => {
  it("should render a book", () => {
    const bookData = {
      title: "Book Title",
      authors: "Jonh Doe",
      imageLinks: { thumbnail: "http://fakeimage.com/image.png" }
    };
    const wrapper = shallow(<Book book={bookData} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render a book without authors and cover", () => {
    const bookData = { title: "Book Title" };
    const wrapper = shallow(<Book book={bookData} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
