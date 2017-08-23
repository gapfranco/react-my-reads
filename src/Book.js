import React from 'react';

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.data.imageLinks ? props.data.imageLinks.thumbnail : ''}")` }}></div>
        <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
        </div>
      </div>
      <div className="book-title">{props.data.name}</div>
      <div className="book-authors">
        {props.data.authors ? props.data.authors.map((a, i) => <p className="authors-list" key={i}>{a}</p>) : '???'}
      </div>
    </div>
  )
}

export default Book;