import React from 'react';
import swal from 'sweetalert2';


class HistoryContainer extends React.Component {
  handleReturnBook(historyId) {
    if (this.props) {
      // check if book returned is false
      if (!historyId.returned) {
        swal('You want to return this book')
          .then(() => {
            // fire an action to return book
            this.props.returnBook({
              BookId: historyId.BookId,
              userId: this.props.user.id
            })
              .then(() => {
                // if book is returned succesfully
                if (this.props.returnBookReducer.BookIsReturn) {
                  swal(this.props.returnBookReducer.message.message)
                    .catch(swal.noop);
                  this.props.getHistory({ userId: this.props.user.id });
                } else {
                  swal(this.props.returnBookReducer.error.message)
                    .catch(swal.noop);
                }
              });
          }).catch(swal.noop);
      }
    }
  }
  render() {
    let historyItem;
    if (this.props.userHistory) {
      historyItem = this.props.userHistory.map((historyObj, index) => (
        <tr key={index}>
          <td>{historyObj.Book.title}</td>
          <td>{historyObj.Book.author}</td>
          <td>{historyObj.dueDate}</td>
          <td>{historyObj.borrowedDate}</td>
          <td >
            <button
              className="return-book-button"
              onClick={() => { this.handleReturnBook.bind(this)(historyObj)}}>
              {historyObj.returned.toString()}
            </button></td>
        </tr>
      ));
    }
    return (
      <table className="users-profile">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Due Date</th>
            <th>Borrowed Date</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {historyItem}
        </tbody>
      </table>
    );
  }
}
export default HistoryContainer;
