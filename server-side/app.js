const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// const index = require('./server/routes/index');
// const users = require('./server/routes/users');

// creating express application
const app = express();

// log request to the console;
app.use(logger('dev'));

// format request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

//
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require our routes into the application.
require('./server/routes')(app);

module.exports = app;
