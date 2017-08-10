import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import route from './server/routes';

// const index = require('./server/routes/index');

// creating express application
const app = express();

// log request to the console;
app.use(logger('dev'));

// format request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(express.static('public'));

app.get('/', (request, response) => {
	 response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Require our routes into the application.
(route)(app);

export default app;
