module.exports = {
  'it should change password': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .pause(2000)
      .click('ul#nav-mobile > li:first-child')
      .pause(2000)
      .assert.elementPresent('.container')
      .click('.edit-button')
      .pause(2000)
      .waitForElementVisible('.modal-content')
      .assert.elementPresent('.modal-content')
      .setValue('input[name="oldPassword"]', 'emmanuel')
      .setValue('input[name="newPassword"]', 'emmanuel')
      .setValue(
        'input[name="confirmNewPassword"]',
        'emmanuel',
      )
      .click('form:last-child button:first-child')
      .pause(1000)
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Password changed',
      )
      .end();
  },
};
