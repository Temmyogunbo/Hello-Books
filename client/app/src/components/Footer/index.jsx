import React from 'react';

/**It retuns a div element containing footer
 *
 *
 * @returns {object} jsx
 */
function Footer() {
  return (
    <div>
      <div className="footer-push-top"/>
      <footer className="footer">
        <div className="footer-copyright">
          <div className="container">
            © 2017 Copyright Ogunbo Emmanuel, All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
