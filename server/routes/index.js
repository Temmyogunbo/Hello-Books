import UsersController from '../controllers/UsersController';
import BooksController from '../controllers/BooksController';
import BookHistoryController from '../controllers/BookHistoryController';
import Authentication from '../Authentication/Authentication';

export default (app) => {
  app.post(
    /^\/api\/v1\/users\/signin$/,
    Authentication.validateUserRequest,
    UsersController.signUserIn,
  );

  app.post(
    /^\/api\/v1\/users\/signup$/,
    Authentication.validateUserRequest,
    UsersController.createUser,
  );
  app.put(
    /^\/api\/v1\/users\/change-password$/,
    Authentication.isLoggedIn,
    Authentication.validateUserRequest,
    UsersController.changePassword,
  );
  app.get(
    /^\/api\/v1\/category$/, Authentication.isLoggedIn,
    BooksController.findCategory,
  );
  app.get(
    /^\/api\/v1\/books\/(\d+)$/,
    Authentication.isLoggedIn,
    BooksController.findBookOrBooks,
  );
  app.get(
    /^\/api\/v1\/books$/, Authentication.isLoggedIn,
    BooksController.findBookOrBooks,
  );
  app.post(
    /^\/api\/v1\/books$/, Authentication.isLoggedIn,
    Authentication.checkIfAdmin,
    Authentication.validateBookRequest,
    BooksController.addBook,
  );

  app.post(
    /^\/api\/v1\/category$/, Authentication.isLoggedIn,
    Authentication.checkIfAdmin,
    Authentication.validateBookRequest,
    BooksController.addCategory,
  );
  app.put(
    /^\/api\/v1\/books\/(\d+)$/, Authentication.isLoggedIn,
    Authentication.checkIfAdmin,
    Authentication.validateBookRequest,
    BooksController.updateBook,
  );
  app.delete(
    /^\/api\/v1\/books\/(\d+)$/, Authentication.isLoggedIn,
    Authentication.checkIfAdmin,
    BooksController.deleteBook,
  );

  app.post(
    /^\/api\/v1\/users\/(\d+)\/books$/,
    Authentication.isLoggedIn,
    BookHistoryController.borrowBook,
  );

  app.put(
    /^\/api\/v1\/users\/(\d+)\/books$/,
    Authentication.isLoggedIn,
    BookHistoryController.returnBook,
  );
  app.get(
    /^\/api\/v1\/users\/(\d+)\/history$/,
    Authentication.isLoggedIn,
    BookHistoryController.findUserHistory,
  );
};
