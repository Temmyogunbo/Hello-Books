import UsersController from '../controllers/UsersController';
import BooksController from '../controllers/BooksController';
import BookHistoryController from '../controllers/BookHistoryController';
import verify from '../middleware/verify';

export default (app) => {
  app.post('/api/v1/users/signin', UsersController.findUser);

  app.post('/api/v1/users/signup', UsersController.createUser);

  app.post('/api/v1/books', verify.verifyOrdinaryUser, BooksController.createBook);
  app.get('/api/v1/books', BooksController.findBooks);
  app.put(/^\/api\/v1\/books\/(\d+)$/, verify.verifyOrdinaryUser, BooksController.updateBook);
  app.delete(/^\/api\/v1\/books\/(\d+)$/, verify.verifyOrdinaryUser, BooksController.deleteBook);

  app.post(/^\/api\/v1\/users\/(\d+)\/books$/, BookHistoryController.borrowBook);
  app.get(/^\/api\/v1\/users\/(\d+)\/books$/, BookHistoryController.yetToReturn);
  app.put(/^\/api\/v1\/users\/(\d+)\/books$/, BookHistoryController.returnBook);
  app.get(/^\/api\/v1\/users\/(\d+)\/history$/, BookHistoryController.findUserHistory);
};
