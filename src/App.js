import React from 'react';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => this.setState({myBooks: data || []}));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch books={this.state.books} />
        )}/>
        <Route exact path="/" render={() => (
          <BookList books={this.state.myBooks} />
        )} />

      </div>
    )
  }
}

export default BooksApp
