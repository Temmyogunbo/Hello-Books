import db from '../models';

const booksController = {
  createBook(req, res) {
    req.check('category', 'category is required').notEmpty();
    req.check('title', 'title is required').notEmpty();
    req.check('author', 'author is required').notEmpty();
    req.check('quantity', 'quantity is required').notEmpty();
    req.check('quantity', 'quantity must be an integer').isInt();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.Book.create({
      title: req.body.title,
      category: req.body.category,
      author: req.body.author,
      quantity: req.body.quantity
    })
      .then(() => res.status(201).json({
        msg: 'You have a record successful'
      }))
      .catch(() => res.status(400).json({
        errors: [{ msg: 'Cannot create book' }]
      }));
  },
  findBooks(req, res) {
    return db.Book.findAll({ limit: 10 })
      .then((books) => {
        if (books.length === 0) {
          return res.status(404).json({
            msg: 'No books in the library'
          });
        }
        return res.status(200).json(books);
      })
      .catch(err => res.status(404).json({ err }));
  },
  updateBook(req, res) {
    const bookId = parseInt(req.params[0], 10);
    return db.Book.update({
      category: req.body.category,
      title: req.body.title,
      author: req.body.author,
      quantity: req.body.quantity
    },
    {
      fields: ['category', 'title', 'author', 'quantity'],
      where: {
        id: bookId
      }
    })
      .then(() => {
        return res.status(200).json({
          msg: 'You updated a book'
        });
      })
      .catch(() => {
        res.status(403).json({
          msg: 'Invalid details'
        });
      });
  },
  deleteBook(req, res) {
    const bookId = parseInt(req.params[0], 10);
    return db.Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            msg: 'Book cannot be found'
          });
        }
        db.Book.destroy({
          where: {
            id: bookId
          }
        })
          .then(() => res.status(200).json({
            msg: 'Book successfully deleted!'
          }))
          .catch(() => res.status(400).json({
            msg: 'Oops!Something went wrong. Check your details'
          }));
      });
  },
};
export default booksController;
