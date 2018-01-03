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
      .setValue('input[name="newPassword"]', 'emmanuelogunbo')
      .setValue(
        'input[name="confirmNewPassword"]',
        'emmanuelogunbo',
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
  'it should not sign with old password': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form', 1000)
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .pause(2000)
      .assert.containsText(
        '#toast-container',
        'Invalid username or password',
      )
      .pause(2000)
      .end();
  },
  'it should not change password when old password is wrong': (client) => {
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
      .setValue('input[name="oldPassword"]', 'emmanuel123')
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
        'Your old password is incorrect.',
      )
      .end();
  },
};
