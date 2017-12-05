import db from '../models';

/**
 *
 *
 * @class BooksController
 */
class BooksController {
  /**
   *
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {undefined}
   * @memberof BooksController
   */
  static createBook(request, response) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId
    } = request.body;
    return db.Book.create({
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId
    })
      .then(book => response.status(201).json({
        book
      }))
      .catch((error) => {
        switch (error.name) {
        case 'SequelizeForeignKeyConstraintError':
          return response.status(400).json({
            msg: 'Category does not exist. Be sure to check categories table.'
          });
        case 'SequelizeUniqueConstraintError':
          return response.status(403).json({
            msg: 'Book already exist'
          });
        default:
          return null;
        }
      });
  }
  /**
 *
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @returns {undefined}
 * @memberof BooksController
 */
  static createCategory(request, response) {
    return db.Categories.create({
      category: request.body.category
    })
      .then(category => response.status(201).json({
        category
      }))
      .catch((error) => response.status(400).json({
        errors: [{ msg: error.errors[0] }]
      }));
  }
  /**
   *
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {undefined}
   * @memberof BooksController
   */
  static findCategory(request, response) {
    return db.Categories.findAll({
      limit: 10,
      order: [['updatedAt', 'DESC']]
    })
      .then((category) => response.status(200).json(category));
  }
  /**
   *
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {undefined}
   * @memberof BooksController
   */
  static findBooks(request, response) {
    const {
      itemsCountPerPage,
      page,
      category
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
    return db.Book.findAndCountAll({
      where: whereStatement,

      limit: limit,
      offset: offset,
      order: [['updatedAt', 'DESC']]
    })
      .then((books) => {
        if (books.count === 0) {
          return response.status(404).json({
            errors: [{ msg: 'No books in the library' }]
          });
        }
        return response.status(200).json({
          count: books.count, rows: books.rows
        });
      });
  }
  /**
   *
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {undefined}
   * @memberof BooksController
   */
  static updateBook(request, response) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description
    } = request.body;
    const bookId = parseInt(request.params[0], 10);
    return db.Book.update(
      {
        category,
        title,
        author,
        quantity,
        imageUrl,
        description
      },
      {
        where: {
          id: bookId
        }
      }
    )
      .then((book) => {
        if (book[0]) {
          return response.status(204).json({});
        }
        return response.status(404).json({
          msg: 'No such book in the library.'
        });
      })
      .catch((error) => {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
          return response.status(404).json({
            msg: 'Category does not exist. Be sure to check categories table.'
          });
        }
      });
  }
  /**
   *
   *
   * @static
   * @param {any} request
   * @param {any} response
   * @returns {undefined}
   * @memberof BooksController
   */
  static deleteBook(request, response) {
    const bookId = parseInt(request.params[0], 10);

    return db.Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return response.status(404).json({
            errors: [{ msg: 'Book cannot be found' }]
          });
        }
        db.Book.destroy({
          where: {
            id: bookId
          }
        })
          .then(() => response.status(204).json({}));
      });
  }
}
export default BooksController;
