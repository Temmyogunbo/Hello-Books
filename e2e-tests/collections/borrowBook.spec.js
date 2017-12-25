module.exports = {
  'it should borrow a book ': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .pause(2000)
      .click('ul.book-list > li:first-child')
      .assert.elementPresent('.container')
      .click('#borrow-book')
      .waitForElementVisible('button.swal2-confirm')
      .click('button.swal2-confirm')
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'You successfully borrowed a book',
      )
      .pause(2000)
      .end();
  },
};
