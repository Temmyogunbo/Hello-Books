import React from 'react';
import { Link } from 'react-router-dom';

/**It returnss a div element
 *
 * @returns {object} jsx
 *
 */
function PageNotFound() {
  return (
    <div>
You entered a wrong address.
Click <Link to="/signin">here</Link> to go back home    </div>
  );
}
export default PageNotFound;
