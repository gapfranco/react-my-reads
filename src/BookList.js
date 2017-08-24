import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import escapeRegExp from 'escape-string-regexp';

class BookList extends React.Component {

  state = {
    books: [],
    query: ''
  }

  /**
   * Update the query field to filter the books
   */
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  /**
   * Update current component state to re-render the list.
   * When a book in the main page changes shelf, it must call this function to render
   * the list with the new position.
   */
  updateBook = () => {
    BooksAPI.getAll()
      .then(data => this.setState({books: data || []}));
  }

  /**
   * Read all my books.
   * As getAll() returns only the books in shelves, read them all and
   * filter by shelf in the render.
   */
  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({books: data || []}));
  }

  render() {
    const { query, books } = this.state;
    let showBooks = [];
    // Prepare to query books on my shelves
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showBooks = books.filter((book) => match.test(book.title));
    } else {
      showBooks = books;
    }
    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      
      {/* Search for books in my shelves */}
      <div className="search-mybooks-bar">
        <span className="close-mybooks-search"></span>
        <div className="search-mybooks-input-wrapper">
          <input type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="list-books-content">
        <div>

          {/* Currently reading bookshelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showBooks.filter(book => book.shelf === 'currentlyReading')
                  .map(book => (
                    <li key={book.id}>
                      <Book data={book} update={this.updateBook}/>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>

          {/* Wanto to read bookshelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showBooks.filter(book => book.shelf === 'wantToRead')
                  .map(book => (
                    <li key={book.id}>
                      <Book data={book} update={this.updateBook}/>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>

          {/* Already read bookshelf */}
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {showBooks.filter(book => book.shelf === 'read')
                  .map(book => (
                    <li key={book.id}>
                      <Book data={book} update={this.updateBook}/>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>

        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
    )

  }

}

export default BookList;
