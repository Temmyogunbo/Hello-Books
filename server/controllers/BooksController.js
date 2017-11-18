import db from '../models';

const findBooksByCategory = (req, res) =>
  db.Book.findAll({
    where: {
      category: req.query.category
    },
    limit: 10
  })
    .then((books) => {
      if (books.length) {
        return res.status(200).json(books);
      }
      return res.status(404).json({
        errors: [{ msg: 'No such book(s) by category' }]
      });
    })
    .catch(() => res.status(500).json({
      errors: [{ msg: 'Operation cannot be performed' }]
    }));

const BooksController = {
  createBook(req, res) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId
    } = req.body;
    req.check('category', 'category is required').notEmpty();
    req.check('imageUrl', 'imageUrl is required').notEmpty();
    req.check('imagePublicId', 'cloudinary public Id is required').notEmpty();
    req.check('description', 'Description is required').notEmpty();
    req.check('title', 'title is required').notEmpty();
    req.check('author', 'author is required').notEmpty();
    req.check('quantity', 'quantity is required').notEmpty();
    req.check('quantity', 'quantity must be an integer').isInt();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.Book.create({
      title,
      category,
      author,
      quantity,
      imageUrl,
      description,
      imagePublicId
    })
      .then(book => res.status(201).json({
        book
      }))
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(400).json({
            msg: 'Category does not exist. Be sure to check categories table.'
          });
        }
        res.status(400).json({
          errors: [{ msg: 'Cannot create book' }]
        });
      });
  },
  createCategory(req, res) {
    req.check('category', 'category is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.Categories.create({
      category: req.body.category
    })
      .then(category => res.status(201).json({
        category
      }))
      .catch(() => res.status(400).json({
        errors: [{ msg: 'Cannot create category' }]
      }));
  },
  findCategory(req, res) {
    return db.Categories.findAll({ limit: 10 })
      .then((category) => {
        if (category.length === 0) {
          return res.status(404).json({
            errors: [{ msg: 'No categories in the library' }]
          });
        }
        return res.status(200).json(category);
      })
      .catch(() => res.status(500).json({
        errors: [{ msg: 'Something went wrong' }]
      }));
  },
  findBook(req, res) {
    const bookId = parseInt(req.params[0], 10);
    if (bookId) {
      return db.Book.findById(bookId)
        .then((book) => {
          if (!book) {
            return res.status(404).json({
              msg: 'Book not found.'
            });
          }
          return res.status(200).json(book);
        })
        .catch(() => res.status(500).json({
          msg: 'An error occurred.'
        }));
    }
  },
  findBooks(req, res) {
    if (req.query.category) {
      return findBooksByCategory(req, res);
    }
    return db.Book.findAll({ limit: 10 })
      .then((books) => {
        if (books.length === 0) {
          return res.status(404).json({
            errors: [{ msg: 'No books in the library' }]
          });
        }
        return res.status(200).json(books);
      })
      .catch(() => res.status(500).json({
        errors: [{ msg: 'Something went wrong' }]
      }));
  },
  updateBook(req, res) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl,
      description
    } = req.body;
    const bookId = parseInt(req.params[0], 10);
    req.check('category', 'category is required').notEmpty();
    req.check('imageUrl', 'imageUrl is required').notEmpty();
    req.check('description', 'imageUrl is required').notEmpty();
    req.check('title', 'title is required').notEmpty();
    req.check('author', 'author is required').notEmpty();
    req.check('quantity', 'quantity is required').notEmpty();
    req.check('quantity', 'quantity must be an integer').isInt();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.Book.update(
      {
        category,
        title,
        author,
        quantity,
        imageUrl,
        description
      },
      {
        where: {
          id: bookId
        }
      }
    )
      .then((book) => {
        if (book[0]) {
          return res.status(204).json({});
        }
        return res.status(404).json({
          msg: 'No such book in the library.'
        });
      })
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(400).json({
            msg: 'Category does not exist. Be sure to check categories table.'
          });
        }
        return res.status(500).json({
          errors: [{ msg: 'Unable to perform operation.' }]
        });
      });
  },
  deleteBook(req, res) {
    const bookId = parseInt(req.params[0], 10);
    return db.Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            errors: [{ msg: 'Book cannot be found' }]
          });
        }
        db.Book.destroy({
          where: {
            id: bookId
          }
        })
          .then(() => res.status(204).json({}))
          .catch(() => res.status(400).json({
            errors: [{ msg: 'Oops!Something went wrong. Check your details' }]
          }));
      });
  },
};
export default BooksController;
