import React from 'react';

/**
 * It returns a splash screen, welcome page
 *
 * @returns {object} jsx
 */
function Welcome() {
  return (
    <div>
      <div className="image" />
      <div className="welcome-message-container">
        <div className="welcome-message-text">
          <h1 >Welcome to HelloBooks</h1>
          <p className="welcome-message">
                Your platform to up to date books.<br />
                You can borrow, and read <br />
                books online.
          </p>
        </div>
      </div>
    </div>

  );
}
export default Welcome;
