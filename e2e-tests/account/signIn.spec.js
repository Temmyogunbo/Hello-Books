module.exports = {
  'it should sign in as admin': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form', 1000)
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('.card', 1000)
      .assert.urlEquals('http://localhost:5000/collections')
      .pause(2000)
      .end();
  },
  'it should sign in as ordinary user': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form', 1000)
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('.card', 1000)
      .assert.urlEquals('http://localhost:5000/collections')
      .pause(3000)
      .end();
  },
};
