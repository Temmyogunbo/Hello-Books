import React from 'react';
//import Proptypes from 'prop-types';

class HistoryContainer extends React.Component {
  render() {
    console.log('look at me now', this.props.history)
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
          <tr>
            <td>Advanced Analysis</td>
            <td>Tom Apostles</td>
            <td>september</td>
            <td>August</td>
            <td>True</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default HistoryContainer;
