import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';

export class Book extends Component {
  state = {};

  render() {
    const { titleName, authors, coverImage } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${coverImage})`,
            }}
          />
          <BookshelfChanger />
        </div>
        <div className="book-title">{titleName}</div>
        <div className="book-authors">{authors.concat(' ')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  titleName: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  coverImage: PropTypes.string.isRequired,
};
export default Book;
