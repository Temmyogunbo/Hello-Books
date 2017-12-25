module.exports = {
  'it should delete a book': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .assert.elementPresent('.container')
      .pause(5000)
      .click('ul.book-list > li div div > i:last-child')
      .waitForElementVisible('div.swal2-modal.swal2-show', 10000)
      .click('body div div div button.swal2-confirm.swal2-styled')
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Book deleted',
      )
      .pause(2000)
      .end();
  },
};
