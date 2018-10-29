import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cogoToast from "cogo-toast";

import "./BooksApp.css";
import SearchBooks from "../SearchBooks/SearchBooks";
import Bookcase from "../Bookcase/Bookcase";
import * as BooksService from "../../common/BooksService";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []
  };

  notify(type, message) {
    return cogoToast[type](message, {
      position: "bottom-right"
    });
  }

  constructor(props) {
    super(props);
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  componentDidMount() {
    const shelves = BooksService.getShelves();
    this.setState(() => ({ shelves }));

    BooksService.getAll().then(books => {
      this.setState(() => ({ books }));
    });
  }

  onChangeShelf(book) {
    let books = this.state.books.filter(b => b.id !== book.id);
    books.push(book);
    this.setState(() => ({ books }));

    BooksService.update(book, book.shelf)
      .then(() => {
        this.notify("success", "The book was changed.");
        return BooksService.getAll();
      })
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
                <SearchBooks
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
