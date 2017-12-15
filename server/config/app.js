import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import route from '../routes';

// creating express application
const app = express();
dotenv.config();
app.use(logger('dev'));

// format request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static(`${__dirname}/../../../client/app/public`));
(route)(app);

app.use('*', (request, response) => {
  response.sendFile(path.join(
    __dirname,
    '/../../../client/app/public/index.html'
  ));
});

// error handler
// development error handler
if (app.get('env') === 'development') {
  app.use((err, req, res) => res.status(err.status || 500).json({
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
