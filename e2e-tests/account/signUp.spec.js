module.exports = {
  'user can signup': (client) => {
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
      .waitForElementVisible('ul:first-child', 5000)
      .assert.urlEquals('http://localhost:5000/collections')
      .end();
  },
};
