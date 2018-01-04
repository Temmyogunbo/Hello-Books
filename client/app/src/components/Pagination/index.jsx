
import React from 'react';
import PropTypes from 'prop-types';
import PaginationJs from 'react-js-pagination';


const propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};
const defaultProps = ({
  activePage: 1,
  totalItemsCount: 5
});

/**It returns a div element of pagination
 *
 * @param {number} activePage - it stores active page
  * @param {number} itemsCountPerPAge - it stores items count per page
   * @param {number} pageRangeDisplayed - it stores page raqnge number
   * @param {number} totalItemsCount - it stores total number of items
    * @param {function} handlePageChange - points to handlePageChange funtion
 *
 * @returns {object} jsx
 */
function Pagination({
  activePage,
  itemsCountPerPage,
  pageRangeDisplayed,
  totalItemsCount,
  handlePageChange
}) {
  return (
    <div className="col s6 m6 l6 push-l6 push-s4 push-m6 pagination">
      <PaginationJs

        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        pageRangeDisplayed={pageRangeDisplayed}
        totalItemsCount={totalItemsCount}
        onChange={handlePageChange}
      />
    </div>
  );
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
