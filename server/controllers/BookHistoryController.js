import db from '../models';
import BookFunc from '../helper/BookFunc';

const BookHistoryController = {
  borrowBook(req, res) {
    const userId = parseInt(req.params[0], 10);
    const { bookId, membership } = req.body;
    return db.Book.findById(bookId).then((book) => {
      if (!book) {
        return res.status(404).json({
          msg: 'No such book in the library'
        });
      }
      if (parseInt(book.dataValues.quantity, 10) < 1) {
        return res.status(404).json({
          message: 'No more books in the library'
        });
      }
      const numberofBooksAllowedWithDays =
          BookFunc.checkMembership(membership);
      db.History.findAll({
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
              const borrowDay = result[numberofBooksBorrowed - 1]
                .dataValues.borrowedDate.getDate();
              const borrowMonth = result[numberofBooksBorrowed - 1]
                .dataValues.borrowedDate.getMonth() + 1;
              const borrowYear = result[numberofBooksBorrowed - 1]
                .dataValues.borrowedDate.getFullYear();
              const presentDay = new Date().getDate();
              const presentMonth = new Date().getMonth() + 1;
              const presentYear = new Date().getFullYear();
              if (borrowDay !== presentDay || borrowMonth !== presentMonth ||
                  borrowYear !== presentYear) {
                return res.status(400).json({
                  msg: 'You have to return the previous book.'
                });
              }
            }
            for (let i = numberofBooksBorrowed; i--;) {
              if (parseInt(bookId, 10) ===
                parseInt(result[i].dataValues.BookId, 10)) {
                return res.status(400).json({
                  msg: 'You cannot borrow the same book again.'
                });
              }
            }
            // user is borrowing different book and has not exceeded his limit
            db.History
              .create({
                UserId: userId,
                BookId: bookId,
                borrowedDate: new Date(),
                dueDate: new Date(new Date().getTime() +
                    (numberofBooksAllowedWithDays[1] * 24 * 3600 * 1000))
              })
              .then(() => res.status(201).json({
                msg: 'You successfully borrow a book.'
              }))
              .catch(() => res.status(400).json({
                msg: 'Cannot create a record.'
              }));
          } else {
            return res.status(403).json({
              msg: 'You cannot borrow more than your membership level.'
            });
          }
        })
        .catch(() => res.status(500).json({
          msg: 'Something went wrong.'
        }));
    })
      .catch(() => res.status(500).json({
        msg: 'Something went wrong.'
      }));
  },
  yetToReturn(req, res) {
    return db.History.findAll({
      where: {
        UserId: [req.params.userId],
        returned: false
      }
    }).then((history) => {
      if (history.length === 0) {
        return res.status(200).json({
          msg: 'No books to be returned.'
        });
      }
      return res.status(200).json({
        msg: `You have ${history.length} book(s) to be returned`
      });
    })
      .catch(() => res.status(400).json({
        msg: 'This operation cannot be performed.'
      }));
  },
  returnBook(req, res) {
    const bookId = parseInt(req.body.bookId, 10);
    const userId = parseInt(req.params[0], 10);
    return db.History
      .findOne({
        where: {
          UserId: userId,
          BookId: bookId,
          returned: false
        },
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: db.Book }
        ]
      })
      .then((history) => {
        if (history === null) {
          return res.status(404).json({
            msg: 'No record found'
          });
        }
        db.Book.update(
          {
            quantity: parseInt(history.Book.quantity, 10) + 1
          },
          {
            fields: ['quantity'],
            where: {
              id: bookId
            }
          }
        )
          .then(() => {
            db.History.update(
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
              .then(bookReturned => res.status(200).json({
                bookReturned,
                msg: 'You returned a book.'
              }))
              .catch(() => res.status(404).json({
                msg: 'Your record cannot be updated'
              }));
          })
          .catch(() => res.status(404).json({
            msg: 'Your record cannot be updated. Try later.'
          }));
      })
      .catch(() => res.status(400).json({
        msg: 'Something went wrong.'
      }));
  },
  findUserHistory(req, res) {
    const userId = parseInt(req.params[0], 10);
    return db.History
      .findAndCountAll({
        where: {
          UserId: userId
        },
        attributes: ['BookId', 'dueDate', 'borrowedDate', 'returned'],
        include: [
          { model: db.Book, attributes: ['author', 'title'] }
        ]
      })
      .then((result) => {
        res.status(200).json(result.rows);
      })
      .catch(() =>
        res.status(400).json({
          msg: 'Your have no record.'
        }));
  }
};
export default BookHistoryController;
