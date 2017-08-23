import React from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';

class BookSearch extends React.Component {

  state = {
    books: []
  }

  updateQuery = (query) => {
    if (query.trim() === '') {
      this.setState({ books: [] });
    } else {
      BooksAPI.search(query.trim(), 20)
      .then(data => {
        this.setState({ books: data || [] })
      });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="250" handler="onChange">
              <input type="text" 
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book data={book}/>
              </li>
              )
            )}
          </ol>
        </div>
      </div>
    )

  }

}

export default BookSearch;
