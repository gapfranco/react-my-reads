import React from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';

class BookSearch extends React.Component {

  state = {
    books: []
  }

  /**
   * Query books to update state.
   * @param query - The string to search.
   */
  updateQuery = (query) => {
    if (query.trim() === '') {
      this.setState({ books: [] });
    } else {
      BooksAPI.search(query.trim(), 20)
        .then(data => {
          // If query is not one of the permitted search terms, it returns an error.
          // If it's the case, return an empty array
          if (data && data.error) {
            this.setState({books: []})
          } else {
            this.setState({books: data || []})          
          }
        })
    
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/* Debounce for .4 second to compensate for too fast typeing */}
            <Debounce time="400" handler="onChange">
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
