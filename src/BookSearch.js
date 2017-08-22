import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';

class BookSearch extends React.Component {

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book data={book}/>
              </li>
            ))
            }
          </ol>
        </div>
      </div>
    )

  }

}

export default BookSearch;
