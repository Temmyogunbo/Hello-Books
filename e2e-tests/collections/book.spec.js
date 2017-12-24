module.exports = {
  'user can borrow a book from their dashboard': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 1000)
      .click('ul:first-child')
      .waitForElementVisible('', 1000)
      .pause(2000)
      .click('#borrow-book')

      .end();
  },
};
