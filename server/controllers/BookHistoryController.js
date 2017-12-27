import moment from 'moment';

import models from '../models';
import MembershipLevel from '../helper/MembershipLevel';

/**
 * A static class that manages user borrow history
 *
 * @class BookHistoryController
 */
class BookHistoryController {
  /**
  * Borrow book
  *
  * @static

  * @param {object} request
  * @param {object} response

  * @returns {object} returns object

  * @memberof BookHistoryController
  */
  static borrowBook(request, response) {
    const userId = parseInt(request.params[0], 10);
    const { bookId, membership } = request.body;

    if (!membership) {
      return response.status(400).json({
        message: 'You must declare your membership type.',
      });
    }

    return models.Book.findById(bookId).then((book) => {
      if (!book) {
        return response.status(400).json({
          message: 'No such book in the library',
        });
      }

      if (parseInt(book.dataValues.quantity, 10) < 1) {
        return response.status(404).json({
          message: 'No more books in the library',
        });
      }

      const numberofBooksAllowedWithDays =
        MembershipLevel.checkMembership(membership);
      models.History.findAll({
        where: {
          UserId: userId,
          returned: false,
        },
      })
        .then((result) => {
          const numberofBooksBorrowed = result.length;
          if ((numberofBooksBorrowed > 0
            && numberofBooksBorrowed < numberofBooksAllowedWithDays[0])
            || numberofBooksBorrowed === 0) {
            if (numberofBooksBorrowed > 0) {
              const numberOfDays = [];
              const theSameBook = [];
              result.map((eachUserDetails) => {
                const numberofDaysBookUsed = moment(new Date())
                  .diff(moment(eachUserDetails.borrowedDate), 'days');
                const numberofDaysAllowed = MembershipLevel
                  .checkMembership(membership)[1];
                if (numberofDaysBookUsed > numberofDaysAllowed) {
                  numberOfDays.push('limit exceeded');
                } else if (parseInt(bookId, 10) ===
                    parseInt(eachUserDetails.dataValues.BookId, 10)) {
                  theSameBook.push('the same book');
                }
              });
              if (numberOfDays.length > 0) {
                return response.status(409).json({
                  message: 'You have to return the previous book.',
                });
              }
              if (theSameBook.length > 0) {
                return response.status(409).json({
                  message: 'You cannot borrow the same book again',
                });
              }
            }

            models.History
              .create({
                UserId: userId,
                BookId: bookId,
                borrowedDate: new Date(),
                dueDate: new Date(new Date().getTime() +
                  (numberofBooksAllowedWithDays[1] * 24 * 3600 * 1000)),
              })
              .then(record => response.status(201).json({
                record,
                message: 'You successfully borrowed a book',
              }));
          } else {
            return response.status(409).json({
              message: 'You cannot borrow more than your membership level.',
            })
              .catch(() => {
                response.status(500).json({
                  message: 'An error occured',
                });
              });
          }
        });
    })
      .catch(() => {
        response.status(500).json({
          message: 'An error occured',
        });
      });
  }

  /**
 *
 * Return borrow book
 *
 * @static
 *
 * @param {object} request
 * @param {object} response
 *
 * @returns {object} json object
 *
 * @memberof BookHistoryController
 */
  static returnBook(request, response) {
    const bookId = parseInt(request.body.bookId, 10);
    const userId = parseInt(request.params[0], 10);
    return models.History
      .findOne({
        where: {
          UserId: userId,
          BookId: bookId,
          returned: false,
        },
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: models.Book },
        ],
      }).then((record) => {
        if (record === null) {
          return response.status(404).json({
            message: 'No record found',
          });
        }
        models.History.update(
          {
            returned: true,
          },
          {
            fields: ['returned'],
            where: {
              BookId: bookId,
              UserId: userId,
            },
          },
        )
          .then(bookReturned => response.status(200).json({
            bookReturned,
            message: 'You returned a book.',
          }))
          .catch(() => response.status(500).json({
            message: 'An error occured',
          }));
      })
      .catch(() => response.status(500).json({
        message: 'An error occured',
      }));
  }

  /**
 *
 * returns borrow history
 *
 * @static
 *
 * @param {object} request
 * @param {object} response
 *
 * @returns {object} user object
 *
 * @memberof BookHistoryController
 */
  static findUserHistory(request, response) {
    const {
      itemsCountPerPage,
      page,
    } = request.query;
    const userId = parseInt(request.params[0], 10);
    const whereStatement = { UserId: userId };

    const offset = itemsCountPerPage ? itemsCountPerPage * (page - 1) : 0;
    const limit = itemsCountPerPage || 10;

    if (request.query.returned) {
      whereStatement.returned = false;
    }
    return models.History
      .findAndCountAll({
        where: whereStatement,
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: models.Book, attributes: ['author', 'title'] },
        ],
        order: [['updatedAt', 'DESC']],
        limit,
        offset,

      })
      .then((record) => {
        if (record.count === 0) {
          return response.status(404).json({
            message: 'No record found',
          });
        }
        response.status(200).json({ rows: record.rows, count: record.count });
      });
  }
}
export default BookHistoryController;
