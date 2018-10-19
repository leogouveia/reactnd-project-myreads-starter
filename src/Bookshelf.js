import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BookshelfBooks from './BookshelfBooks';

export class Bookshelf extends Component {
  state = {};

  render() {
    const { name, books } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{name}</h2>
          <BookshelfBooks books={books} />
        </div>
      </div>
    );
  }
}
Bookshelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default Bookshelf;
