import db from '../models';

export default (req, res, next, book) => {
  const userId = parseInt(req.params[0], 10);
// gold can borrow 4 books for 6 days
  db.History.findAll({
    where: {
      UserId: userId,
      returned: false
    }
  })
    .then((result) => {
    	const size = result.length;
      if (size === 0) {
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
              dueDate: new Date(new Date().getTime() + (6 * 24 * 3600 * 1000))
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
      } else if (size > 0 && size < 4) {
        // user has borrowed before
        // check if user borrow in the present day
        const borrowDay = result[size - 1].dataValues.borrowedDate.getDate();
        const borrowMonth = result[size - 1].dataValues.borrowedDate.getMonth() + 1;
        const borrowYear = result[size - 1].dataValues.borrowedDate.getFullYear();
        const presentDay = new Date().getDate();
        const presentMonth = new Date().getMonth() + 1;
        const presentYear = new Date().getFullYear();
        if (borrowDay !== presentDay || borrowMonth !== presentMonth || borrowYear !== presentYear) {
          const err = new Error('You have to return the previous book');
          err.status = 403;
          next(err);
        } else {
        // user wants to borrow the same book again
          for (let i = size; i--;) {
            if (parseInt(req.body.bookId, 10) === parseInt(result[i].dataValues.BookId, 10)) {
              const err = new Error('You cannot borrow the same book again');
              err.status = 403;
              next(err);
            }
          }
          // user is borrowing different book and has not exceeded his limit
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
                dueDate: new Date(new Date().getTime() + (6 * 24 * 3600 * 1000))
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
        }
      } else {
        // user wants to borrow more than the allowed book for his membership
        return res.status(403).json({
          message: 'You cannot borrow more than your membership level or you return borrowed books'
        });
      }
    })
    .catch(() => res.status(400).json({
      message: 'Something went wrong'
    }));
};
