import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Book } from './Book';

export default class BookshelfBooks extends Component {
  state = {};

  render() {
    const { books } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li>
              <Book
                titleName={book.title}
                authors={book.authors}
                coverImage={book.imageLinks.thumbnail}
              />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

BookshelfBooks.propTypes = {
  books: PropTypes.array.isRequired,
};
