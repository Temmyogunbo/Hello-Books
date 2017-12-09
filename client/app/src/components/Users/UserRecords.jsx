import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import Button from '../Button';


const propTypes = {
  userHistory: PropTypes.array.isRequired
};
UserRecords.defaultProps = [];
/**
 *
 *
 * @param {any} props
 * @returns {object} jsx
 */
function UserRecords({
  userHistory,
  handleReturnBook,
  getHistory,
  returnBook,
  activePage,
  itemsCountPerPage,
  userId
}) {
  let historyItem = userHistory.map((historyObj, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{historyObj.Book.title}</td>
      <td>{historyObj.Book.author}</td>
      <td><TimeAgo date={historyObj.dueDate} /></td>
      <td><TimeAgo date={historyObj.borrowedDate} /></td>
      <td >
        <Button
          className={"bc mr-2 waves-effect waves-light btn brown darken-4 s6"}
          onClick={() => handleReturnBook({
            historyObj,
            id: userId,
            CB: returnBook
          })
          }
          children={historyObj.returned ? "Returned" : "Borrowed"}

        /></td>
    </tr>
  ));
  return (
    <div>
      <div className="bc-2 row">
        <div
          className="col s6 fs-2" style={{ fontSize: "25px", color: "white" }}
        >
          Your activity below
        </div>

        <div className="col s4">
          <Button
            className={"btn brown darken-4"}
            style={{ fontSize: "15px" }}
            onClick={() => getHistory({
              userId: userId,
              currentPage: activePage,
              itemsCountPerPage: itemsCountPerPage,
              returned: 'false'
            })}
            children={'Borrowed Books'}
          />
        </div>
        <div className="col s2 ">
          <Button
            className={"btn brown darken-4"}
            style={{ fontSize: "15px" }}
            onClick={() => getHistory({
              userId: userId,
              currentPage: activePage,
              itemsCountPerPage: itemsCountPerPage
            })}
            children={'All'}
          />
        </div>

      </div>
      {
        (userHistory).length > 0 ?
          <div>

            <table className="users-profile">
              <thead>
                <tr>
                  <th>S/N</th>
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
            </table></div> : <h5>{'You have no record'}</h5> }
    </div>
  );
}
UserRecords.propTypes = propTypes;
export default UserRecords;
