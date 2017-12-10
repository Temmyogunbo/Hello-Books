import UsersController from '../controllers/UsersController';
import BooksController from '../controllers/BooksController';
import BookHistoryController from '../controllers/BookHistoryController';
import verify from '../authentication/verify';

export default (app) => {
  app.post(
    /^\/api\/v1\/users\/signin$/,
    verify.validateUserRequest,
    UsersController.signUserIn
  );

  app.post(
    /^\/api\/v1\/users\/signup$/,
    verify.validateUserRequest,
    UsersController.createUser
  );
  app.put(
    /^\/api\/v1\/users\/change-password$/,
    verify.isLoggedIn,
    verify.validateUserRequest,
    UsersController.changePassword
  );
  app.get(
    /^\/api\/v1\/category$/, verify.isLoggedIn,
    BooksController.findCategory
  );
  app.get(
    /^\/api\/v1\/books\/(\d+)$/,
    verify.isLoggedIn,
    BooksController.findBookOrBooks
  );
  app.get(
    /^\/api\/v1\/books$/, verify.isLoggedIn,
    BooksController.findBookOrBooks
  );
  app.post(
    /^\/api\/v1\/books$/, verify.isLoggedIn,
    verify.checkIfAdmin,
    verify.validateBookRequest,
    BooksController.addBook
  );

  app.post(
    /^\/api\/v1\/category$/, verify.isLoggedIn,
    verify.checkIfAdmin,
    verify.validateBookRequest,
    BooksController.addCategory
  );
  app.put(
    /^\/api\/v1\/books\/(\d+)$/, verify.isLoggedIn,
    verify.checkIfAdmin,
    verify.validateBookRequest,
    BooksController.updateBook
  );
  app.delete(
    /^\/api\/v1\/books\/(\d+)$/, verify.isLoggedIn,
    verify.checkIfAdmin,
    BooksController.deleteBook
  );

  app.post(
    /^\/api\/v1\/users\/(\d+)\/books$/,
    verify.isLoggedIn,
    BookHistoryController.borrowBook
  );

  app.put(
    /^\/api\/v1\/users\/(\d+)\/books$/,
    verify.isLoggedIn,
    BookHistoryController.returnBook
  );
  app.get(
    /^\/api\/v1\/users\/(\d+)\/history$/,
    verify.isLoggedIn,
    BookHistoryController.findUserHistory
  );
};
