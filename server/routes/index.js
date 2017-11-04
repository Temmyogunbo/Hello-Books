import UsersController from '../controllers/UsersController';
import BooksController from '../controllers/BooksController';
import BookHistoryController from '../controllers/BookHistoryController';
import verify from '../authentication/verify';

export default (app) => {
  app.post(/^\/api\/v1\/users\/signin$/, UsersController.signUserIn);

  app.post(/^\/api\/v1\/users\/signup$/, UsersController.createUser);

  app.post('/api/v1/books', verify.checkIfAdmin,
    BooksController.createBook);
  app.post('/api/v1/category', verify.checkIfAdmin,
    BooksController.createCategory);
  app.get('/api/v1/category',
    BooksController.findCategory);
  app.get(/^\/api\/v1\/books$/, BooksController.findBooks);
  app.get(/^\/api\/v1\/books\/(\d+)$/, BooksController.findBook);
  app.put(/^\/api\/v1\/books\/(\d+)$/, verify.checkIfAdmin,
    BooksController.updateBook);
  app.delete(/^\/api\/v1\/books\/(\d+)$/, verify.checkIfAdmin,
    BooksController.deleteBook);

  app.post(/^\/api\/v1\/users\/(\d+)\/books$/,
    BookHistoryController.borrowBook);
  app.get(/^\/api\/v1\/users\/(\d+)\/books$/,
    BookHistoryController.yetToReturn);
  app.put(/^\/api\/v1\/users\/(\d+)\/books$/,
    BookHistoryController.returnBook);
  app.get(/^\/api\/v1\/users\/(\d+)\/history$/,
    BookHistoryController.findUserHistory);
};
