import usersController from '../controllers/users';
import booksController from '../controllers/books';
import bookHistoryController from '../controllers/borrow';
import verify from '../middleware/verify';

export default (app) => {
  app.post('/api/v1/users/signin', usersController.findUser);

  app.post('/api/v1/users/signup', usersController.createUser);

  app.post('/api/v1/books', verify.verifyOrdinaryUser, booksController.createBook);
  app.get('/api/v1/books', booksController.findBooks);
  app.put(/^\/api\/v1\/books\/(\d+)$/, verify.verifyOrdinaryUser, booksController.updateBook);
  app.delete(/^\/api\/v1\/books\/(\d+)$/, verify.verifyOrdinaryUser, booksController.deleteBook);

  app.post(/^\/api\/v1\/users\/(\d+)\/books$/, bookHistoryController.borrowBook);
  app.get(/^\/api\/v1\/users\/(\d+)\/books$/, bookHistoryController.yetToReturn);
  app.put(/^\/api\/v1\/users\/(\d+)\/books$/, bookHistoryController.returnBook);
};
