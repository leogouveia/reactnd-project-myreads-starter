import React from 'react';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import { Bookshelf } from './Bookshelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    bookshelves: ['Currently Reading', 'Want to Read', 'Read'],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookshelves = _.uniq(books.map(book => book.shelf));
      this.setState(() => ({ books, bookshelves }));
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div>
            {this.state.bookshelves.map(bookshelf => (
              <Bookshelf
                key={bookshelf}
                name={bookshelf}
                books={this.state.books.filter(book => book.shelf === bookshelf)}
              />
            ))}
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
