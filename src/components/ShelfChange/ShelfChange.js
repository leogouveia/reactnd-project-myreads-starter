import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ShelfChange.css";
export class ShelfChange extends Component {
  static propTypes = {
    book: PropTypes.object,
    shelves: PropTypes.array,
    handleChangeShelf: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  handleChangeShelf = (ev) => {
    const { handleChangeShelf, book } = this.props;
    book.oldShelf = book.shelf;
    book.shelf = ev.target.value;
    handleChangeShelf(book);
  }

  render() {
    const { shelves, book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={this.handleChangeShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          {shelves.map((shelf, index) => (
            <option key={`${shelf.id}${index}`} value={shelf.id}>
              {shelf.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChange;
