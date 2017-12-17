import moment from 'moment';

import database from '../models';
import membershipLevel from '../helper/membershipLevel';

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

  * @param {any} request
  * @param {any} response

  * @returns {object} returns object

  * @memberof BookHistoryController
  */
  static borrowBook(request, response) {
    const userId = parseInt(request.params[0], 10);
    const { bookId, membership } = request.body;
    if (!membership) {
      return response.status(400).json({
        msg: 'You must declare your membership type.'
      });
    }
    return database.Book.findById(bookId).then((book) => {
      if (!book) {
        return response.status(404).json({
          msg: 'No such book in the library'
        });
      }
      if (parseInt(book.dataValues.quantity, 10) < 1) {
        return response.status(404).json({
          msg: 'No more books in the library'
        });
      }
      const numberofBooksAllowedWithDays =
          membershipLevel.checkMembership(membership);
      database.History.findAll({
        where: {
          UserId: userId,
          returned: false
        }
      })
        .then((result) => {
          const numberofBooksBorrowed = result.length;
          if ((numberofBooksBorrowed > 0 &&
              numberofBooksBorrowed < numberofBooksAllowedWithDays[0]) ||
              numberofBooksBorrowed === 0) {
            // check if user borrow in the present day
            if (numberofBooksBorrowed > 0) {
              let eachUserDetails;
              for (eachUserDetails of result) {
                const numberofDaysBookUsed = moment(new Date())
                  .diff(moment(eachUserDetails.borrowedDate), 'days');
                const numberofDaysAllowed = membershipLevel
                  .checkMembership(membership)[1];
                if (numberofDaysBookUsed > numberofDaysAllowed) {
                  return response.status(403).json({
                    msg: 'You have to return the previous book.'
                  });
                } else if (parseInt(bookId, 10) ===
                parseInt(eachUserDetails.dataValues.BookId, 10)) {
                  return response.status(403).json({
                    msg: 'You cannot borrow the same book again.'
                  });
                }
              }
            }

            // user is borrowing different book and has not exceeded his limit
            database.History
              .create({
                UserId: userId,
                BookId: bookId,
                borrowedDate: new Date(),
                dueDate: new Date(new Date().getTime() +
                    (numberofBooksAllowedWithDays[1] * 24 * 3600 * 1000))
              })
              .then(record => response.status(201).json({
                record,
                msg: 'You successfully borrowed a book.'
              }));
          } else {
            return response.status(403).json({
              msg: 'You cannot borrow more than your membership level.'
            });
          }
        });
    })
      .catch(() => {
        response.status(400).json({
          msg: 'Invalid book id'
        });
      });
  }
  /**
 *
 * Return borrow book
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} json object
 *
 * @memberof BookHistoryController
 */
  static returnBook(request, response) {
    const bookId = parseInt(request.body.bookId, 10);
    const userId = parseInt(request.params[0], 10);
    return database.History
      .findOne({
        where: {
          UserId: userId,
          BookId: bookId,
          returned: false
        },
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: database.Book }
        ]
      }).then((record) => {
        if (record === null) {
          return response.status(404).json({
            msg: 'No record found'
          });
        }
        database.History.update(
          {
            returned: true
          },
          {
            fields: ['returned'],
            where: {
              BookId: bookId,
              UserId: userId
            }
          }
        )
          .then(bookReturned => response.status(200).json({
            bookReturned,
            msg: 'You returned a book.'
          }));
      });
  }
  /**
 *
 * returns borrow history
 *
 * @static
 *
 * @param {any} request
 * @param {any} response
 *
 * @returns {object} user object
 *
 * @memberof BookHistoryController
 */
  static findUserHistory(request, response) {
    const {
      itemsCountPerPage,
      page
    } = request.query;
    const userId = parseInt(request.params[0], 10);
    const whereStatement = { UserId: userId };

    const offset = itemsCountPerPage ? itemsCountPerPage * (page - 1) : 0;
    const limit = itemsCountPerPage || 10;

    if (request.query.returned) {
      whereStatement.returned = false;
    }
    return database.History
      .findAndCountAll({
        where: whereStatement,
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: database.Book, attributes: ['author', 'title'] }
        ],
        order: [['updatedAt', 'DESC']],
        limit,
        offset

      })
      .then((record) => {
        if (record.count === 0) {
          return response.status(404).json({
            msg: 'No record found'
          });
        }
        response.status(200).json({ rows: record.rows, count: record.count });
      });
  }
}
export default BookHistoryController;
