module.exports = {
  'it should add a book': (client) => {
    client
      .url('localhost:5000/signin')
      .waitForElementVisible('body')
      .setValue('input[name="userName"]', 'admin')
      .setValue('input[name="password"]', 'emmanuel')
      .click('#for-google-log-in')
      .waitForElementVisible('ul:first-child', 10000)
      .assert.elementPresent('.container')
      .pause(10000)
      .click('#add-book')
      .waitForElementVisible('#book-form-modal', 4000)
      .setValue('input[name="title"]', 'Christmas game of thrones in Nigeria')
      .setValue('input[name="author"]', 'Olusegun Oni')
      .clearValue('input[name="quantity"]')
      .setValue('input[name="quantity"]', 40)
      .clearValue('input[name="description"]')
      .pause(20000)
      .click('#book-form-modal div form div div.col.sm-4')
      .pause(2000)
      .assert.elementPresent('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Book(s) successfully added to the library.',
      )
      .assert.containsText(
        'ul:first-child li div a div div.card-color',
        'Christmas game of thrones in Nigeria',
      );
  },
};
