import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  books: PropTypes.array.isRequired,
  onClickEditBook: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};
/**
 *
 *
 * @param {any} props
 * @returns {object} jsx
 */
function AdminBookItems({ books, onClickEditBook, handleDelete }) {
  return (
    <div>{
      <table className="bordered left admin-books">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Category</th>
            <th>Author</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Description</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) =>
            (<tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.category}</td>
              <td>{book.author}</td>
              <td>{book.title}</td>
              <td>{book.quantity}</td>
              <td>{book.description}</td>
              <td id={book.id}>
                <i
                  className="material-icons"
                  onClick={onClickEditBook}>edit</i>

              </td>
              <td>
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={() => handleDelete(book)}
                />
              </td>
            </tr>))}
        </tbody>
      </table>}

    </div>
  );
}
AdminBookItems.propTypes = propTypes;

export default AdminBookItems;
