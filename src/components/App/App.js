import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PickBook from "../PickBook/PickBook";
import Bookcase from "../Bookcase/Bookcase";
import * as BooksAPI from "../../common/BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []
  };

  constructor(props) {
    super(props);
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  componentDidMount() {
    const shelves = BooksAPI.getShelves();
    this.setState(() => ({ shelves }));

    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books }));
    });
  }

  onChangeShelf(book) {
    let books = this.state.books.filter(b => b.id !== book.id);
    books.push(book);
    this.setState(() => ({ books }));

    BooksAPI.update(book, book.shelf)
      .then(() => BooksAPI.getAll())
      .catch(() => (book.shelf = book.oldShelf))
      .then(books => this.setState(() => ({ books })));
  }

  render() {
    const { books, shelves } = this.state;
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route
              path="/search"
              render={() => (
                <PickBook
                  books={books}
                  shelves={shelves}
                  handleChangeShelf={this.onChangeShelf}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <Bookcase
                  books={books}
                  shelves={shelves}
                  handleChangeShelf={this.onChangeShelf}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
