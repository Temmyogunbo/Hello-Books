module.exports = {
  'users can return borrowed books from their dashboard': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="username"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('input[name="submit"]')
      .waitForElementVisible('.card', 1000)
      .waitForElementNotVisible('#toast-container')
      .click('ul:first-child')
      .waitForElementVisible('#borrow - book')
      .click('#borrow - book')

      .end();
  },
};
