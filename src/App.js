import React from 'react';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList />
        )} />
        <Route path="/search" render={() => (
          <BookSearch />
        )}/>
      </div>
    )
  }
}

export default BooksApp
