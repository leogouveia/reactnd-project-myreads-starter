import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ShelfChange extends Component {
  state = {
    selectedShelf: ''
  };

  static propTypes = {
    book: PropTypes.object,
    shelves: PropTypes.array,
    handleChangeShelf: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { book } = this.props;
    const { shelf } = book;
    console.log('Shelf', book, shelf);
    this.setState(() => ({ selectedShelf: shelf }));
  }

  handleChangeShelf(ev) {
    const { handleChangeShelf } = this.props;
    const selectedShelf = ev.target.value;
    handleChangeShelf({book: this.props.book, selectedShelf});
  }

  render() {
    const { selectedShelf } = this.state;
    const { shelves } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={selectedShelf || 'none'} onChange={this.handleChangeShelf.bind(this)} >
          <option value="move" disabled>
            Move to...
          </option>
          {shelves.map(shelf => (
            <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChange;
