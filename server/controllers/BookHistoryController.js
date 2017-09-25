import db from '../models';
import gold from '../helper/gold';
import silver from '../helper/silver';

const BookHistoryController = {
  borrowBook(req, res, next) {
    const userId = parseInt(req.params[0], 10);
    return db.Book.findById(req.body.bookId).then((book) => {
      // book doesn't exist
      if (!book) {
        return res.status(404).json({
          message: 'No such book in the library'
        });
      }
      // Make sure there are books that can be borrowed
      if (parseInt(book.dataValues.quantity, 10) < 1) {
        return res.status(404).json({
          message: 'No more books'
        });
      }
      if (req.body.membership === 'platinum') {
        // platinum cannot borrow more than 2 books for 4 days
        // only one book can be borrow at a time but max of 2 once i.e a day
        db.History.findAll({
          where: {
            UserId: userId,
            returned: false
          }
        })
          .then((result) => {
            if (result.length === 0) {
              // user has not borrowed before
              // update book table
              db.Book.update({
                quantity: parseInt(book.dataValues.quantity, 10) - 1
              },
              {
                fields: ['quantity'],
                where: {
                  id: req.body.bookId
                }
              })
                .then(() => {
                  db.History.create({
                    UserId: userId,
                    BookId: req.body.bookId,
                    borrowedDate: new Date(),
                    dueDate: new Date(new Date()
                      .getTime() + (4 * 24 * 3600 * 1000))
                  })
                    .then(() => res.status(200).json({
                      message: 'You successfully borrow a book'
                    }))
                    .catch(() => res.status(400).json({
                      message: 'Cannot create a record'
                    }));
                })
                .catch(() => res.status(400).json({
                  message: 'Cannot update book'
                }));
            } else if (result.length === 1) {
              // user has borrowed before
              // check if user borrow in the present day
              if (result[0].dataValues.borrowedDate.getDate() === new Date().getDate() && result[0].dataValues.borrowedDate.getMonth() + 1 === new Date().getMonth() + 1 && result[0].dataValues.borrowedDate.getFullYear() === new Date().getFullYear()) {
                // user wants to borrow the same book again
                if (req.body.bookId === result[0].dataValues.bookId) {
                  return res.status(403).json({
                    message: 'You cannot borrow the same book again'
                  });
                }
                // user is borrowing different book and 
                // has not exceeded his limit
                db.Book.update({
                  quantity: parseInt(book.quantity, 10) - 1
                },
                {
                  fields: ['quantity'],
                  where: {
                    id: req.body.bookId
                  }
                })
                  .then(() => {
                    db.History.create({
                      UserId: userId,
                      BookId: req.body.bookId,
                      borrowedDate: new Date(),
                      dueDate: new Date(new Date()
                        .getTime() + (4 * 24 * 3600 * 1000))
                    })
                      .then(() => res.status(200).json({
                        message: 'You successfully borrow a book'
                      }))
                      .catch(() => res.status(400).json({
                        message: 'Cannot create a record'
                      }));
                  })
                  .catch(() => res.status(400).json({
                    message: 'Cannot update book'
                  }));
              } else {
                return res.status(403).json({
                  message: 'You have to return the previous book or you read online'
                });
              }
            } else {
              // user wants to borrow more than the allowed book 
              // for his membership
              return res.status(403).json({
                message: 'You cannot borrow more than your membership level'
              });
            }
          })
          .catch(() => res.status(400).send('Something went wrong'));
      } else if (req.body.membership === 'gold') {
        gold(req, res, next, book);
      } else if (req.body.membership === 'silver') {
        silver(req, res, next, book);
      } else {
        return res.status(403).json({
          message: 'You have to declare your membership'
        });
      }
    });
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
          message: 'No books to be returned'
        });
      }
      return res.status(200).json({
        message: `You have ${history.length} book(s) to be returned`
      });
    })
      .catch(() => res.status(400).json({
        message: 'Cannot perform this operation'
      }));
  },
  returnBook(req, res) {
  // find book if it exists in the history table
    return db.History
      .findOne({
        where: {
          BookId: req.body.bookId,
          UserId: req.params[0],
          returned: false
        }
      })
      .then((history) => {
      // find book if it exists in the Books table
      // console.log("i made it here alive", history.dataValues.BookId)
        db.Book.findOne(
          {
            where: {
              id: history.dataValues.BookId
            }
          }
        )
          .then((book) => {
          // update book if it exist
            db.Book.update(
              {
                quantity: parseInt(book.quantity, 10) + 1
              },
              {
                fields: ['quantity'],
                where: {
                  id: book.id
                }
              })
              .then(() => {
                db.History.update({
                  returned: true
                },
                {
                  fields: ['returned'],
                  where: {
                    BookId: history.BookId,
                    UserId: req.params[0]
                  }
                })
                  .then(() => res.status(200).json({
                    message: 'You return a book'
                  }))
                  .catch(() => res.status(404).json({
                    message: 'Something went wrong'
                  }));
              })
              .catch(() => res.status(500).json({
                message: 'Something went wrong'
              }));
          })
          .catch(() => res.status(404).json({
            message: 'No record for such book'
          }));
      })
      .catch(() => res.status(404).json({
        message: 'No record for borrowed book'
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
      });
  }
};
export default BookHistoryController;
