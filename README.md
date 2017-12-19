
[![Build Status](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io.svg?branch=development)](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Test Coverage](https://codeclimate.com/github/codeclimate/codeclimate/badges/coverage.svg?branch=development)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)
# HelloBooks

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. It is built on react, javascript front-end frame-work, and Postgres as database

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

## Contributing

A web application is never finished. We welcome contributions. 

## Authors

* **Emmanuel Ogunbo** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

