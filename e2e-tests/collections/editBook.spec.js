module.exports = {
  'it should edit a book': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .assert.elementPresent('.container')
      .pause(5000)
      .click('ul.book-list > li div div > i:first-child')
      .waitForElementVisible('#book-form-modal', 4000)
      .clearValue('input[name="title"]')
      .setValue('input[name="title"]', 'The one')
      .clearValue('input[name="author"]')
      .setValue('input[name="author"]', 'Adesege Mukomuko')
      .clearValue('input[name="quantity"]')
      .setValue('input[name="quantity"]', 500)
      .clearValue('textarea[name="description"]')
      .setValue(
        'textarea[name="description"]',
        'The one very last thing is to take eko',
      )
      .click('#book-form-modal div form div.row > div > button')
      .pause(5000)
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Book updated successfully',
      )
      .pause(2000)
      .end();
  },
};
