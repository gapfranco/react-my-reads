import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends React.Component {

  state = {
    book: {}
  }

  static propTypes = {
    data: PropTypes.object,
    update: PropTypes.func
  }

  constructor(props) {
    super(props);
    // props.data is a book object. Save it on Book state.
    BooksAPI.get(props.data.id).then(book => this.setState({book: book}));
  }

  /**
   * When the shelf select control changes, change book state and trigger update
   * of parent control if necessary (when parent control is a BookList).
   */
  handleChange = (event) => {
    const shelf = event.target.value;
    const book = this.state.book;
    BooksAPI.update(book, shelf)
      .then(newShelf => {
        this.setState({book: Object.assign({}, book, {shelf: shelf})});
        if (this.props.update) {
          this.props.update(book);
        }
      });
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.state.book.imageLinks ? this.state.book.imageLinks.thumbnail : ''}")` }}></div>
          {/* div to change style of select: different colors for different shelves */}
          <div className={this.state.book.shelf}>
            <div className="book-shelf-changer">
              <select value={this.state.book.shelf} onChange={this.handleChange}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
        <div className="book-title">{this.state.book.name}</div>
        <div className="book-authors">
          {this.state.book.authors ? this.state.book.authors.map((a, i) => <p className="authors-list" key={i}>{a}</p>) : ''}
        </div>
      </div>
    )
  }
}

export default Book;