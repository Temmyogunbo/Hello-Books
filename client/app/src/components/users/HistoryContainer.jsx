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
            this.props.returnBook({ BookId: historyId.BookId, userId: this.props.id })
              .then(() => {
                // if book is returned succesfully
                if (this.props.returnBookReducer.BookIsReturn) {
                  swal(this.props.returnBookReducer.message);
                }
                swal(this.props.returnBookReducer.error.message);
              });
          });
      }
    }
  }
  render() {
    let historyItem;
    if (this.props.userHistory) {
      historyItem = this.props.userHistory.map(history => (
        <tr key={history.Book.title}>
          <td>{history.Book.title}</td>
          <td>{history.Book.author}</td>
          <td>{history.dueDate}</td>
          <td>{history.borrowedDate}</td>
          <td>
            <button onClick={() => { this.handleReturnBook.bind(this)(history)}}>
              {history.returned.toString()}
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
