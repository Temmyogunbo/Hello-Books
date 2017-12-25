module.exports = {
  'it should add a category': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .assert.elementPresent('.container')
      .pause(5000)
      .click('#add-book-or-category-div > a')
      .waitForElementVisible('#book-category-form-modal', 4000)
      .setValue('input[name="category"]', 'Arts')
      .click('#book-category-form-modal > div form div > button')
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'You added a category',
      )
      .pause(2000)
      .end();
  },
  'it should not add a category if it exists': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .assert.elementPresent('.container')
      .pause(5000)
      .click('#add-book-or-category-button > a')
      .waitForElementVisible('#book-category-form-modal', 4000)
      .setValue('input[name="category"]', 'Arts')
      .click('#book-category-form-modal > div form div > button')
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Category already exist',
      )
      .pause(2000)
      .end();
  },
};
