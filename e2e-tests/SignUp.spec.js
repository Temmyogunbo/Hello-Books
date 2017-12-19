module.exports = {
  'user can signup': (client) => {
    client
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('#for-google-signup', 1000)
      .setValue('input[name="fullName"]', 'tayo')
      .setValue('input[name="userName"]', 'temitayo')
      .setValue('input[name="email"]', 'temitayo@gmail.com')
      .setValue('input[name="password"]', 'emmanuel')
      .setValue('input[name="confirmPassword"]', 'emmanuel')
      .click('#for-google-signup')
      .waitForElementVisible('.book-categories', 1000)
      .assert.urlEquals('http://localhost:5000/collections')
      .end();
  }
};
