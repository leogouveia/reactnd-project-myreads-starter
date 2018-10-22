import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../common/BooksAPI";
import { Book } from "../Book/Book";
import { ShelfChange } from "../ShelfChange/ShelfChange";

class PickBook extends Component {
  state = {
    queriedBooks: []
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
  }

  componentDidMount() {
    const { shelves } = this.props;
    shelves.push({ id: "none", name: "None" });
    this.setState(() => ({ shelves }));
  }

  handleChangeShelf(data) {
    this.resetBooks();
    this.props.handleChangeShelf(data);
  }

  handleChangeSearchInput(ev) {
    const query = ev.target.value.trim();
    if (query.length < 3) return this.resetBooks();
    BooksAPI.search(query)
      .then(queriedBooks => {
        if (queriedBooks.error === "empty query") return this.resetBooks();
        if (Array.isArray(queriedBooks)) return this.setState(() => ({ queriedBooks }));
      })
      .catch(err => {
        console.log(err);
        this.resetBooks();
      });
  }

  resetBooks() {
    this.setState(() => ({ queriedBooks: [] }));
  }

  render() {
    const { queriedBooks } = this.state;
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
              onChange={this.handleChangeSearchInput}
            />
          </div>
        </div>
        <div className="search-books-results">
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

export default PickBook;


/*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
*/