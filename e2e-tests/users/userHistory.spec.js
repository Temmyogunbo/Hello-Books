module.exports = {
  'it should return a book': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .pause(3000)
      .click('ul#nav-mobile > li:first-child')
      .pause(2000)
      .waitForElementVisible('.container')
      .click('.users-profile tbody > tr td:last-child > button')
      .pause(5000)
      .click('button.swal2-confirm')
      .pause(1000)
      .assert.containsText(
        '#toast-container',
        'You returned a book',
      )
      .pause(2000)
      .end();
  },
};
