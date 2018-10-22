import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Shelf } from "../Shelf/Shelf";
import { Book } from "../Book/Book";
import { ShelfChange } from "../ShelfChange/ShelfChange";

class Bookcase extends React.Component {
  static propTypes = {
    shelves: PropTypes.array,
    books: PropTypes.array,
    handleChangeShelf: PropTypes.func
  };

  render() {
    const { shelves, books, handleChangeShelf } = this.props;
    return (
      <div>
        {shelves.map(bookshelf => (
          <Shelf key={bookshelf.id} name={bookshelf.name}>
            {books.filter(book => book.shelf === bookshelf.id).map(book => (
              <li key={book.id}>
                <Book book={book}>
                  <ShelfChange
                    book={book}
                    shelves={shelves}
                    handleChangeShelf={handleChangeShelf}
                  />
                </Book>
              </li>
            ))}
          </Shelf>
        ))}
        <div className="open-search">
          <Link to="/search">Add book</Link>
        </div>
      </div>
    );
  }
  
}

export default Bookcase;
