import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';

import route from '../routes';

const app = express();
dotenv.config();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
app.use(expressValidator());

app.use(express.static(`${__dirname}/../../../client/app/public`));
(route)(app);

app.use('*', (request, response) => {
  response.sendFile(path.join(
    __dirname,
    '/../../../client/app/public/index.html',
  ));
});


if (app.get('env') === 'development') {
  app.use((error, request, response) =>
    response.status(error.status || 500).json({
      message: error.message,
      error,
    }));
}

if (app.get('env') === 'test') {
  app.use((error, request, response) =>
    response.status(error.status || 500).json({
      message: error.message,
      error,
    }));
}
app.use((error, request, response) =>
  response.status(error.status || 500).json({
    message: error.message,
    error,
  }));

export default app;
