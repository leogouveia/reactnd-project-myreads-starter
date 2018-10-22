import React, { Component } from "react";
import PropTypes from "prop-types";

export class Shelf extends Component {
  state = {};

  static defaultProps = {
    name: "",
    books: []
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  render() {
    const { name, children } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {children}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
