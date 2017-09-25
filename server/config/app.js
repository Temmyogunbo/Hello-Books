import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import config from '../../webpack.config';
import route from '../routes';

// creating express application
// const publicPath = express.static(path.join(__dirname, '../../client/app/public'));
const app = express();
const env = process.env.NODE_ENV || 'development';
dotenv.config();
const compiler = webpack(config);
app.use(logger('dev'));
// app.use('/', publicPath);

// format request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static(`${__dirname}/../../client/app/public`));
if (env === 'development') {
  app.use(webpackMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}
// Require our routes into the application.
(route)(app);

app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/../../client/app/public/js/index.html'));
});

// error handler
// development error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}
// production error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

export default app;
