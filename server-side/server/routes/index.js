const usersController = require('../controllers').users;
const booksController = require('../controllers').books;

module.exports = (app) => {
  app.post('/api/v1/users/signin', usersController.findUser);

  app.post('/api/v1/users/signup', usersController.createUser);

  app.post('/api/v1/books', booksController.createBook);
};
