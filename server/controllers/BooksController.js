import models from '../models';

/**
 * It contains utility method for books
 *
 * @class BooksController
 */
class BooksController {
/**
 *
 * Add book
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} book object
 *
 * @memberof BooksController
 */
  static addBook(request, response) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId,
    } = request.body;
    return models.Book.create({
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId,
    })
      .then(book => response.status(201).json({
        book,
      }))
      .catch((error) => {
        switch (error.name) {
        case 'SequelizeForeignKeyConstraintError':
          return response.status(400).json({
            message: 'Category does not exist.',
          });
        case 'SequelizeUniqueConstraintError':
          return response.status(403).json({
            message: 'Book already exist',
          });
        default:
          return null;
        }
      });
  }

  /**
   * Adds category
   *
   * @static
   *
   * @param {any} request
   * @param {any} response
   *
   * @returns {object} category object
   *
   * @memberof BooksController
   */
  static addCategory(request, response) {
    return models.Categories.create({
      category: request.body.category,
    })
      .then(category => response.status(201).json(category))
      .catch(error => response.status(400).json({
        errors: [{ message: error.errors[0] }],
      }));
  }
  /**
 * Find category
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} category object
 *
 * @memberof BooksController
 */
  static findCategory(request, response) {
    return models.Categories.findAll({
      limit: 10,
      order: [['updatedAt', 'DESC']],
    })
      .then(category => response.status(200).json(category))
      .catch(error => response.status(400)
        .json(error.errors.map(errorMessage => errorMessage.message)));
  }

  /**
   * Get all books or a particular book
   *
   * @static
   *
   * @param {any} request
   * @param {any} response
   *
   * @returns {object}  book(s) object
   *
   * @memberof BooksController
   */
  static findBookOrBooks(request, response) {
    const {
      itemsCountPerPage,
      page,
      category,
    } = request.query;

    const offset = itemsCountPerPage ? itemsCountPerPage * (page - 1) : 0;
    const limit = itemsCountPerPage || 10;
    const whereStatement = {};
    if (category) {
      whereStatement.category = category;
    }
    if (request.params[0]) {
      whereStatement.id = parseInt(request.params[0], 10);
    }
    return models.Book.findAndCountAll({
      where: whereStatement,

      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    })
      .then((books) => {
        if (books.count === 0) {
          return response.status(404).json({
            errors: [{ message: 'No books in the library' }],
          });
        }
        return response.status(200).json({
          count: books.count, rows: books.rows,
        });
      })
      .catch(error => response.status(400)
        .json(error.errors.map(errorMessage => errorMessage.message)));
  }
  /**
 * Edit and update a particular book
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} returns object
 *
 * @memberof BooksController
 */
  static updateBook(request, response) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
    } = request.body;
    const bookId = parseInt(request.params[0], 10);
    return models.Book.update(
      {
        category,
        title,
        author,
        quantity,
        imageUrl,
        description,
      },
      {
        where: {
          id: bookId,
        },
      },
    )
      .then((book) => {
        if (book[0]) {
          return response.status(204).json({});
        }
        return response.status(404).json({
          message: 'No such book in the library.',
        });
      })
      .catch((error) => {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
          return response.status(404).json({
            message: 'Category does not exist.',
          });
        }
      });
  }
  /**
 * Delete a book
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} returns object
 *
 * @memberof BooksController
 */
  static deleteBook(request, response) {
    const bookId = parseInt(request.params[0], 10);

    return models.Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return response.status(404).json({
            errors: [{ message: 'Book cannot be found' }],
          });
        }
        models.Book.destroy({
          where: {
            id: bookId,
          },
        })
          .then(() => response.status(204).json({}))
          .catch(error => response.status(400)
            .json(error.errors.map(errorMessage => errorMessage.message)));
      })
      .catch(error => response.status(400)
        .json(error.errors.map(errorMessage => errorMessage.message)));
  }
}
export default BooksController;
