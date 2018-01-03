import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import Button from '../Button';


const propTypes = {
  userHistory: PropTypes.array.isRequired,
  handleReturnBook: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};
/**It returns div element containing user records
 *
 * @param {object} userHistory - points to user history object
 * @param {function} handleReturnBook - points to handleReturnBook function
* @param {object} getHistory - points to getHistory function
 * @param {number} activePage - it stores active page
 * @param {number} itemsCountPerPage - it stores items counts perpage
 *  @param {number} userId - it stores userId
 *
 * @returns {object} jsx
 */
function UserRecords({
  userHistory,
  handleReturnBook,
  getHistory,
  returnBook,
  activePage,
  itemsCountPerPage,
  userId,
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
      <div className=" bc-2 row">
        <h5
          className="col s3 fs-2 hide-on-small-only" style={{ color: "white" }}
        >
          Activity
        </h5>

        <Button
          className={"btn brown darken-4 s6 mr-2"}
          style={{ fontSize: "12px" }}
          onClick={() => getHistory({
            userId: userId,
            currentPage: activePage,
            itemsCountPerPage: itemsCountPerPage,
            returned: 'false'
          })}
          children={'Borrowed Books'}
        />
        <Button
          className={"btn brown darken-4 s3"}
          style={{ fontSize: "12px" }}
          onClick={() => getHistory({
            userId: userId,
            currentPage: activePage,
            itemsCountPerPage: itemsCountPerPage
          })}
          children={'All'}
        />

      </div>
      {
        (userHistory).length > 0 ?
          <div>

            <table className="users-profile responsive-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Due Date</th>
                  <th>Borrowed Date</th>
                  <th>status</th>
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
