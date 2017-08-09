import db from '../models';

const bookHistoryController = {
  borrowBook(req, res) {
    return db.Book.findById(req.params.bookId).then((book) => {
      if (req.body.membership === 'platinum' && req.body.numberOfBook < 2) {
        db.Book.update({
          quantity: book.quantity - req.body.numberOfBook
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        })
          .then(() => {
            db.History.create({
              UserId: req.body.UserId,
              BookId: req.body.BookId,
              quantityBorrowed: req.body.numberOfBook,
              dueDate: (new Date(new Date().getDay() + 2))
            })
              .then(() => res.status(201).send('You successfully borrow a book'))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      } else if (req.body.membership === 'gold' && (req.body.numberOfBook > 2 && req.body.numberOfBook < 4)) {
        db.Book.update({
          quantity: book.quantity - req.body.numberOfBook
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        })
          .then(() => {
            db.History.create({
              UserId: req.body.UserId,
              BookId: req.body.BookId,
              quantityBorrowed: req.body.numberOfBook,
              dueDate: new Date(new Date().getDay() + 4)
            })
              .then(() => res.status(201).send('You successfully borrow a book'))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      } else if (req.body.membership === 'silver' && req.body.numberOfBook < 6) {
        db.Book.update({
          quantity: book.quantity - req.body.numberOfBook
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        }).then(() => {
          db.History.create({
            UserId: req.body.UserId,
            BookId: req.body.BookId,
            quantityBorrowed: req.body.quantity,
            dueDate: new Date(new Date().getDay() + 6)
          })
            .then(() => res.status(201).send('You successfully borrow a book'))
            .catch(err => res.status(400).send(err));
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
        res.status(200).send('No books to be returned');
      } else {
        res.status(200).send(`You have ${history.length} book(s) to be returned`);
      }
    })
      .catch(err => res.status(400).send(err));
  },
  returnBook(req, res) {
  // find book if it exist
    return db.History
      .findOne({
        where: {
          BookId: req.params.bookId
        }
      })
      .then((history) => {
      // if book exist
        db.Book.findOne(
          {
            where: {
              bookId: history.BookId
            }
          }
        )
          .then((book) => {
          // update book if it exist
            db.Book.update(
              {
                quantity: book.quantity + history.quantityBorrowed
              },
              {
                fields: ['quantity'],
                where: {
                  id: history.BookId
                }
              })
              .then(() => {
                db.History.update({
                  returned: true
                },
                {
                  fields: ['returned'],
                  where: {
                    id: history.BookId
                  }
                })
                  .then(() => {
                    res.status(200).send('You return a book');
                  });
              });
          });
      })
      .catch(err => res.status(400).send(err));
  }
};
export default bookHistoryController;
