import db from '../models';
import BookFunc from '../helper/BookFunc';

const BookHistoryController = {
  borrowBook(req, res) {
    const userId = parseInt(req.params[0], 10);
    const { bookId, membership } = req.body;
    return db.Book.findById(bookId).then((book) => {
      console.log(book)
      if (!book) {
        return res.status(404).json({
          message: 'No such book in the library'
        });
      }
      if (parseInt(book.dataValues.quantity, 10) < 1) {
        return res.status(404).json({
          message: 'No more books in the library'
        });
      }
      if (membership === 'gold' || membership === 'silver'
        || membership === 'platinum') {
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
              numberofBooksBorrowed < numberofBooksAllowedWithDays[0])
              || numberofBooksBorrowed === 0) {
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
                if (borrowDay !== presentDay || borrowMonth !== presentMonth
                  || borrowYear !== presentYear) {
                  BookFunc.returnMessage(res, 400,
                    'You have to return the previous book');
                }
              }
              for (let i = numberofBooksBorrowed; i--;) {
                if (parseInt(bookId, 10) === parseInt(result[i].dataValues.BookId, 10)) {
                  return BookFunc.returnMessage(res, 400,
                    'You cannot borrow the same book again');
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
                .then(() => BookFunc.returnMessage(res, 200,
                  'You successfully borrow a book'))
                .catch(() => BookFunc.returnMessage(res, 400,
                  'Cannot create a record'));
            } else {
              return BookFunc.returnMessage(res, 403,
                'You cannot borrow more than your membership level');
            }
          })
          .catch(() => BookFunc.returnMessage(res, 400,
            'Something went wrong'));
      }
    })
      .catch(() => BookFunc.returnMessage(res, 500, 'Something went wrong'));
  },
  yetToReturn(req, res) {
    return db.History.findAll({
      where: {
        UserId: [req.params.userId],
        returned: false
      }
    }).then((history) => {
      if (history.length === 0) {
        return BookFunc.returnMessage(res, 200, 'No books to be returned');
      }
      return BookFunc.returnMessage(res, 200,
        `You have ${history.length} book(s) to be returned`);
    })
      .catch(() => BookFunc.returnMessage(res, 400,
        'Cannot perform this operation'));
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
            message: 'No record found'
          });
        }
        db.Book.update({
          quantity: parseInt(history.Book.quantity, 10) + 1
        },
        {
          fields: ['quantity'],
          where: {
            id: bookId
          }
        })
          .then(() => {
            db.History.update({
              returned: true
            },
            {
              fields: ['returned'],
              where: {
                BookId: bookId,
                UserId: userId
              }
            })
              .then(() => res.status(200).json({
                message: 'You returned a book'
              }))
              .catch(() => res.status(404).json({
                message: 'Your record cannot be updated'
              }));
          })
          .catch(() => res.status(404).json({
            message: 'Your record cannot be updated. Try later.'
          }));
      })
      .catch(err => res.status(400).send(err));
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
