module.exports = {
  'Admin user can login': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form',1000)
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('.card', 1000)
      .assert.urlEquals('http://localhost:5000/collections')
      .end();
  },
  'user can login': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form', 1000)
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('.card', 1000)
      .assert.urlEquals('http://localhost:5000/collections')
      .end();
  }
};
