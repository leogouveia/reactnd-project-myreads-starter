import React, { Component } from "react";
import PropTypes from "prop-types";
import lodash from "lodash";

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

  handleChangeShelf = book => {
    this.setState(({ queriedBooks }) => ({
      queriedBooks: queriedBooks.map(b => (b.id === book.id ? book : b))
    }));
    this.props.handleChangeShelf(book);
  };

  handleChangeSearchInput = ev => {
    const query = ev.target.value.trim();
    this.setState({ query, isLoading: true });
    this.searchBook(query);
  };

  searchBook = lodash.debounce(async query => {
    try {
      if (!query) return;
      const queriedBooks = await BooksService.search(query);
      return this.setState(
        state => (state.query === query ? { queriedBooks } : {})
      );
    } catch (e) {
      this.resetBooks();
    } finally {
      this.setState({ isLoading: false });
    }
  }, 800);

  resetBooks = () => {
    this.setState(() => ({ queriedBooks: [] }));
  };

  render() {
    const { query, queriedBooks, isLoading } = this.state;
    const { shelves } = this.props;
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
              autoFocus={true}
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
                    shelves={shelves}
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
