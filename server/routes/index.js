import usersController from '../controllers/users';
import booksController from '../controllers/books';
import bookHistoryController from '../controllers/borrow';

export default (app) => {
  app.post('/api/v1/users/signin', usersController.findUser);

  app.post('/api/v1/users/signup', usersController.createUser);

  app.post('/api/v1/books', booksController.createBook);
  app.get('/api/v1/books', booksController.findBooks);
  app.put('/api/v1/books/:bookId', booksController.updateBook);

  app.post('/api/v1/users/:userId/:bookId', bookHistoryController.borrowBook);
  app.get('/api/v1/users/:userId/books', bookHistoryController.yetToReturn);
  app.put('/api/v1/users/:userId/:bookId', bookHistoryController.returnBook);
};
