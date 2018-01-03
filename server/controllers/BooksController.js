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
 * @param {object} request - request object
 * @param {object} response - response object
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
          return response.status(409).json({
            message: 'Book already exist',
          });
        default:
          return response.status(403).json({
            message: 'An error occured',
          });
        }
      });
  }

  /**
   * Adds category
   *
   * @static
   *
   * @param {object} request - request object
   * @param {object} response - response object
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
      .catch((error) => {
        switch (error.name) {
        case 'SequelizeUniqueConstraintError':
          return response.status(409).json({
            message: 'Category already exist',
          });
        default:
          return response.status(500).json({
            message: 'An error occured',
          });
        }
      });
  }
  /**
 * Find category
 *
 * @static
 *
 * @param {object} request - request object
 * @param {object} response - response object
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
      .catch(() => response.status(500)
        .json({ message: 'An error occured' }));
  }

  /**
   * Get all books or a particular book
   *
   * @static
   *
   * @param {object} request - request object
   * @param {object} response - response object
   *
   * @returns {object}  book(s) object
   *
   * @memberof BooksController
   */
  static findBookOrBooks(request, response) {
    const whereStatement = {};
    const bookId = request.params[0];
    let {
      itemsCountPerPage,
      page,
    } = request.query;
    const { category } = request.query;
    itemsCountPerPage = parseInt(itemsCountPerPage, 10) || 10;
    page = parseInt(page, 10) || 0;
    whereStatement.category = category || { $ne: null };
    whereStatement.id = bookId ? parseInt(bookId, 10) : { $ne: null };

    let offset = itemsCountPerPage * (page - 1);
    offset = offset <= -1 ? 0 : offset;
    return models.Book.findAndCountAll({
      where: whereStatement,
      limit: itemsCountPerPage,
      offset,
      order: [['updatedAt', 'DESC']],
    })
      .then((books) => {
        if (books.count === 0) {
          return response.status(404).json({
            message: 'No book(s) in the library',
          });
        }
        return response.status(200).json({
          count: books.count, rows: books.rows,
        });
      })
      .catch(() => response.status(500).json({
        message: 'An error occured',
      }));
  }
  /**
 * Edit and update a particular book
 *
 * @static
 *
 * @param {object} request - request object
 * @param {object} response - respinse object
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
    return models.Book.findById(bookId)
      .then((foundBook) => {
        if (!foundBook) {
          return response.status(404).json({ message: 'Book cannot be found' });
        }
        models.Book.update(
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
            returning: true,
            plain: true,
          },
        )
          .then(book =>
            response.status(200).json(book[1].dataValues))

          .catch((error) => {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
              return response.status(404).json({
                message: 'Category does not exist.',
              });
            }
            return response.status(500).json({
              message: 'An error occured',
            });
          });
      })
      .catch(() => response.status(500)
        .json({ message: 'An error occured' }));
  }
  /**
 * Delete a book
 *
 * @static
 *
 * @param {object} request - request object
 * @param {object} response - response object
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
          return response.status(404).json({ message: 'Book cannot be found' });
        }
        models.Book.destroy({
          where: {
            id: bookId,
          },
          returning: true,
          plain: true,
        })
          .then((bookDeleted) => {
            response.status(200).json({ bookDeleted });
          })
          .catch(() => response.status(500)
            .json({ message: 'An error occured' }));
      })
      .catch(() => response.status(500)
        .json({ message: 'An error occured' }));
  }
}
export default BooksController;
