module.export = {
  'users can check their history after login': (client) => {
    client
      .url('http://localhost:5000/signin')
      .waitForElementVisible('body')
      .waitForElementVisible('#sign-in-form', 1000)
      .setValue('input[name="userName"]', 'temmy')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('.card', 1000)
      .click('#history-nav-link')
      .waitForElementVisible('.users-profile')
      .pause(3000)
      .assert.urlEquals('http://localhost:5000/history')
      .end();
  },
};
