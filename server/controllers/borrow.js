import db from '../models';

const bookHistoryController = {
  borrowBook(req, res) {
    return db.Book.findById(req.params.bookId).then((book) => {
      if (parseInt(book.quantity) - parseInt(req.body.numberOfBook) < 0) {
        return res.status(404).send('You can not borrow below book limit');
      }
      if (req.body.membership === 'platinum' && req.body.numberOfBook < 4) {
        console.log('...............', req.params.bookId, req.params.userId, req.body.membership, req.body.numberOfBook);
        db.Book.update({
          quantity: parseInt(book.quantity) - parseInt(req.body.numberOfBook)
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        })
          .then(() => {
            db.History.create({
              UserId: req.params.userId,
              BookId: req.params.bookId,
              quantityBorrowed: req.body.numberOfBook,
              dueDate: new Date(new Date().getTime() + (4 * 24 * 3600 * 1000))
            })
              .then(() => res.status(201).send('You successfully borrow a book'))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      } else if (req.body.membership === 'gold' && (req.body.numberOfBook > 4 && req.body.numberOfBook < 8)) {
        db.Book.update({
          quantity: parseInt(book.quantity) - parseInt(req.body.numberOfBook)
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        })
          .then(() => {
            db.History.create({
              UserId: req.params.userId,
              BookId: req.params.bookId,
              quantityBorrowed: req.body.numberOfBook,
              dueDate: new Date(new Date().getTime() + (8 * 24 * 3600 * 1000))
            })
              .then(() => res.status(201).send('You successfully borrow a book'))
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
      } else if (req.body.membership === 'silver' && (req.body.numberOfBook > 8 && req.body.numberOfBook < 16)) {
        db.Book.update({
          quantity: parseInt(book.quantity) - parseInt(req.body.numberOfBook)
        },
        {
          fields: ['quantity'],
          where: {
            id: req.params.bookId
          }
        }).then(() => {
          db.History.create({
            UserId: req.params.userId,
            BookId: req.params.bookId,
            quantityBorrowed: req.body.numberOfBook,
            dueDate: new Date(new Date().getTime() + (16 * 24 * 3600 * 1000))
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
              id: history.dataValues.BookId
            }
          }
        )
          .then((book) => {
          // update book if it exist
            db.Book.update(
              {
                quantity: parseInt(book.quantity) + parseInt(history.quantityBorrowed)
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
                    BookId: history.BookId
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
