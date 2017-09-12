import React from 'react';
import Button from './ButtonComponent';

class AdminBooks extends React.Component {
  render() {
    return (
      <div>
        <Button name="ADD BOOK" />
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
            <tr>
              <td>Mathematics</td>
              <td>Abstract Algebra</td>
              <td>White Head & C</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Programming</td>
              <td>Control the Dummy</td>
              <td>Emmanuel Ogunbo</td>
              <td>40</td>
            </tr>
            <tr>
              <td>Romance</td>
              <td>Romeo $ Juliet</td>
              <td>Williams Shakespare</td>
              <td>20</td>
            </tr>
          </tbody>
        </table>
        <Button name="EDIT" />
        <Button name="DELETE BOOK" />
      </div>
    );
  }
}

export default AdminBooks;
