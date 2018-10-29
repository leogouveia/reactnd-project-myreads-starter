import React, { Component } from "react";
import PropTypes from "prop-types";

import "./SearchBooks.css";
import { Link } from "react-router-dom";
import * as BooksService from "../../common/BooksService";
import { Book } from "../Book/Book";
import { ShelfChange } from "../ShelfChange/ShelfChange";
import Spinner from "../Spinner/Spinner";

class SearchBooks extends Component {
  state = {
    query: "",
    queriedBooks: [],
    isLoading: false
  };

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    handleChangeShelf: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChangeSearchInput = this.handleChangeSearchInput.bind(this);
    this.handleChangeShelf = this.handleChangeShelf.bind(this);
    this.getShelves = this.getShelves.bind(this);
  }

  getShelves() {
    return [{ id: "none", name: "None" }, ...this.props.shelves];
  }

  handleChangeShelf(book) {
    this.setState(prevState => {
      const { queriedBooks } = prevState;
      return {
        queriedBooks: queriedBooks.map(b => (b.id === book.id ? book : b))
      };
    });
    this.props.handleChangeShelf(book);
  }

  handleChangeSearchInput(ev) {
    const query = ev.target.value.trim();
    this.setState({ query, isLoading: true }, () => {
      BooksService.search(query)
        .then(queriedBooks =>
          this.setState(prev => prev.query !== query || { queriedBooks })
        )
        .catch(() => this.resetBooks())
        .finally(() =>
          setTimeout(() => this.setState({ isLoading: false }), 1000)
        );
    });
  }

  resetBooks() {
    this.setState(() => ({ queriedBooks: [] }));
  }

  render() {
    const { query, queriedBooks, isLoading } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChangeSearchInput}
            />
          </div>
          <div className="search-books-loading-wrapper">
            <Spinner loading={isLoading} />
          </div>
        </div>

        <div className="search-books-results">
          {query.length > 0 &&
            queriedBooks.length === 0 &&
            !isLoading && (
              <p className="search-books-no-results">No books where found.</p>
            )}
          <ol className="books-grid">
            {queriedBooks.map(book => (
              <li key={book.id}>
                <Book book={book}>
                  <ShelfChange
                    book={book}
                    shelves={this.getShelves()}
                    handleChangeShelf={data => this.handleChangeShelf(data)}
                  />
                </Book>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
