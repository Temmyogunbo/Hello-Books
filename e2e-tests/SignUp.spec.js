module.exports = {
    'user can signup': (client) => {
        client
            .url('http://localhost:5000/signup')
            .waitForElementVisible('body')
            .waitForElementVisible('#for-google-signup', 1000)
            .setValue('input[name="fullName"]', 'tayo')
            .setValue('input[name="userName"]', 'tayo')
            .setValue('input[name="email"]', 'tayo@gmail.com')
            .setValue('input[name="password"]', 'emmanuel')
            .setValue('input[name="confirmPassword"]', 'emmanuel')
            .click('#for-google-signup')
            .waitForElementVisible('.card', 1000)
            .assert.urlEquals('http://localhost:5000/collections')
            .pause(2000)
            .end();
    }
};
