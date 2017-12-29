module.exports = {
  'it should sign up': (client) => {
    client
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('#for-google-signup', 1000)
      .setValue('input[name="fullName"]', 'saitama')
      .setValue('input[name="userName"]', 'saitama')
      .setValue('input[name="email"]', 'saitama@gmail.com')
      .setValue('input[name="password"]', 'emmanuel')
      .setValue('input[name="confirmPassword"]', 'emmanuel')
      .click('#for-google-signup')
      .pause(3000)
      .waitForElementVisible('ul> li:first-child', 5000)
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/collections')
      .end();
  },
  'it should not sign up when username already exist': (client) => {
    client
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('#for-google-signup', 1000)
      .setValue('input[name="fullName"]', 'saitama')
      .setValue('input[name="userName"]', 'saitama')
      .setValue('input[name="email"]', 'saitama@gmail.com')
      .setValue('input[name="password"]', 'emmanuel')
      .setValue('input[name="confirmPassword"]', 'emmanuel')
      .click('#for-google-signup')
      .pause(2000)
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Username already exist.',
      )
      .end();
  },
  'it should not sign up when email has been taken': (client) => {
    client
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('#for-google-signup', 1000)
      .setValue('input[name="fullName"]', 'saitama')
      .setValue('input[name="userName"]', 'saitama123')
      .setValue('input[name="email"]', 'saitama@gmail.com')
      .setValue('input[name="password"]', 'emmanuel')
      .setValue('input[name="confirmPassword"]', 'emmanuel')
      .click('#for-google-signup')
      .pause(5000)
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Email has been taken.',
      )
      .end();
  },
};
