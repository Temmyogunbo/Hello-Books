import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import route from '../routes';

// creating express application
const app = express();
const swaggerDefinition = {
  info: {
    title: 'Emmanuel HelloBooks API',
    version: '1.0.0',
    description: 'Demonstrating what HelloBooks API does',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['../routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
dotenv.config();
app.use(logger('dev'));

// format request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static(`${__dirname}/../../client/app/public`));
// Require our routes into the application.
(route)(app);

app.use('*', (request, response) => {
  response.sendFile(path.join(
    __dirname,
    '/../../client/app/public/index.html'
  ));
});

// error handler
// development error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => res.status(err.status || 500).json({
    msg: err.msg,
    error: err
  }));
}

// error handler test environment
if (app.get('env') === 'test') {
  app.use((err, req, res) =>
    res.status(err.status || 500).json({
      msg: err.msg,
      error: err
    }));
}
// production error handler
app.use((err, req, res) =>
  res.status(err.status || 500).json({
    msg: err.msg,
    error: err
  }));

export default app;
