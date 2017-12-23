
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io.svg?branch=development)](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Test Coverage](https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg?branch=development)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)
# HelloBooks

HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. It is built on react, javascript front-end frame-work, and Postgres as database

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before this application can work, you need the following:
- NodeJS -A platform to run javascript, not in the browser
- Postgres A relational database that will persist data

Example
Open a chrome browser or any browser of your choice, enter the URL https://nodejs.org to download nodejs for your operating system and also https://postgresql.org to download database for your OS. Thereafter, you can install your downloads

### Installing

1. Download or git clone this branch at https://github.com/Temmyogunbo/Temmyogunbo.github.io.git
2. Install dependencies by running `npm install`. Ensure you are in your working directory. Run `cd /path/to/Temmyogunbo.github.io` to change.
3. Start the server by running `npm run build:dev`.

The application listens on port `8000` by default unless otherwise started as an environment variable.

End with an example of getting some data out of the system or using it for a little demo

## Running the tests
Run the command
*`npm run test` to see if tests are passing

### INSTALLING
1. Download or clone this branch at https://github.com/Temmyogunbo/Temmyogunbo.github.io.git
2. Run `npm install` to install packages. 
3. Ensure you are in your working directory.
4. change your working directory if number three is false by running `cd /path/to/Temmyogunbo.github.io.git` to change.
3. Start the server by running `npm run build:dev`.

The application listens on port `8000` by default unless otherwise started as an environment variable.

Visit `http://localhost:8000` to access the front end or `http://localhost:5000/api` to access the `api` endpoint.

## AUTHENTICATION MECHANISM
This application uses JSON web token to sign and verify users.The expiration time defaults to `24 hrs`.

## RESPONSE STATUSES
These are the common status codes used in the app.

1. `200 OK` - When the request is succesful.
2. `201 Created` - Used when a new record is inserted into the database.
3. `400 Bad Request` - Used when there is a validation error.
4. `401 Unauthorized` - Used when authentication failed.
5. `404 Not Found` - Used when the application returns an empty result.
6. `500 Internal Server Error` - A generic error message, given when no more specific message is suitable.
7. `403 Forbidden` - Used when a user is accessing a restricted end point.

## Deployment
This application is deployed on heroku server

### Contributing
------------------------------------------------------

Development of HelloBooks is everyone's concern. While we welcome contribution for bugfixes and improvement please read below how you can take part in the project

# <h3> Code of Conduct
The author has adopted a Code of Conduct that he expects project participant to follow. Please read [the full text](https://github.com/Temmyogunbo/Temmyogunbo.github.io/blob/bug/153845835/implement-feedback-from-LF/CODE_OF_CONDUCT.md) so that you can understand the does and dont

# <h3>Contributing Guide

Read our [contributing guide](https://github.com/Temmyogunbo/Temmyogunbo.github.io/blob/bug/153845835/implement-feedback-from-LF/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes, improvements, and how to buid and test your changes to HelloBooks

### Frequently asked quesion

## What is HelloBooks?
HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books.

## What are the current available features?
These includes: 
* Sign up
* Sign in
* Change password
* Add book
* Edit book
* Borrow book
* Return book
* Notifications

## How do I own an account?
You need to sign up with option of google plus [here](https://emmanuelhellobooks.herokuapp.com/signup)

## How do I contribute?
Read our contributing section then raise a PR.

## Where can I contribute?
You can either contribute to the client side or server side or both.

## Who are the contributors?
For now, it is Emmanuel Ogunbo only.

### Product Limitations

The known limitation includes:
* Three membership level, gold( 4 books for 6 days), silver(6 books for 8 days), platinum(8 books for 10 days)

* Membership growth is solely determine by the admin

* Books cannot be read online

*  Users cannot reset password but only change it

* Users cannot contribute books to the application

## Author

* **Emmanuel Ogunbo** 

## License

HelloBooks is  [MIT licensed](https://github.com/Temmyogunbo/Temmyogunbo.github.io/blob/bug/153845835/implement-feedback-from-LF/LICENSE) 

