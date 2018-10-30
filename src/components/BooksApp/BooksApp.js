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
  }

  async componentDidMount() {
    const shelves = BooksService.getShelves();
    this.setState(() => ({ shelves }));
    const books = await BooksService.getAll();
    this.setState(() => ({ books }));
  }
  componentWillUnmount() {}
  onChangeShelf = async book => {
    try {
      const books = await BooksService.update(book, book.shelf);
      this.notify("success", "The book was changed.");
      this.setState({books});
    } catch (e) {
      console.error(e);
      this.notify(
        "error",
        "There was a problem changing the shelf of this book."
      );
    }
  };

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
