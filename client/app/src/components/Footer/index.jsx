import React from 'react';

/**It retuns a div element containing footer
 *
 *
 * @returns {object} jsx
 */
function Footer() {
  return (
    <div className="footer-push-top">
      <footer className="footer">
        <div className="footer-copyright container">
              © {new Date().getFullYear()} Copyright Ogunbo Emmanuel,
               All rights reserved.
        </div>
      </footer>
    </div>
  );
}
export default Footer;
