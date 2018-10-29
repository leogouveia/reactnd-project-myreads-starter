import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./Book.css";
import noCoverImage from "./no-cover.jpg"

export class Book extends Component {
  state = {};

  render() {
    const { book, children } = this.props;
    const { title, authors, thumbnail } = this.getBookData(book);

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail || noCoverImage})`
            }}
          />
          {children}
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }

  getBookData(book) {
    let { title, authors, imageLinks } = book;
    title = title || "";
    authors = !Array.isArray(authors) ? authors : authors.join(", ");
    const thumbnail =
      imageLinks && _.has(imageLinks, "thumbnail") ? imageLinks.thumbnail : "";
    return { title, authors, thumbnail };
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  children: PropTypes.node
};

Book.defaultProps = {
  authors: []
};

export default Book;
