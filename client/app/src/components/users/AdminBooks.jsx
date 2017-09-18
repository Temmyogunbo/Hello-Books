import React from 'react';
import PropTypes from 'prop-types';
import Button from './ButtonComponent';


class AdminBooks extends React.Component {
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <tr key={book.id}>
          <th>{book.category}</th>
          <th>{book.author}</th>
          <th>{book.title}</th>
          <th>{book.quantity}</th>
        </tr>
      ));
    }
    return (
      <div className="admin-books">
        <div>
          <Button name="ADD BOOK" />
          <Button name="EDIT" />
          <Button name="DELETE BOOK" />
        </div>
        <table className="highlight bordered centered admin-books">
          <thead>
            <tr>
              <th>Category</th>
              <th>Author</th>
              <th>Title</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {bookItems}
          </tbody>
        </table>
      </div>
    );
  }
}

AdminBooks.PropTypes = {
  bookItems: PropTypes.object.isRequired,
  map: PropTypes.func.isRequired
};

export default AdminBooks;

