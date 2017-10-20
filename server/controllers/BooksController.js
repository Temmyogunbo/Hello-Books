import db from '../models';

const BooksController = {
  createBook(req, res) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl
    } = req.body;
    req.check('category', 'category is required').notEmpty();
    req.check('imageUrl', 'imageUrl is required').notEmpty();
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
      imageUrl
    })
      .then(book => res.status(201).json({
        book
      }))
      .catch(() => res.status(400).json({
        errors: [{ msg: 'Cannot create book' }]
      }));
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
      .then(result => res.status(201).json({
        result
      }))
      .catch(() => res.status(400).json({
        errors: [{ msg: 'Cannot create category' }]
      }));
  },
  findBooks(req, res) {
    return db.Book.findAll({
  
      limit: 10 })
      .then((books) => {
        if (books.length === 0) {
          return res.status(404).json({
            errors: [{ msg: 'No books in the library' }]
          });
        }
        return res.status(200).json(books);
      })
      .catch(err => res.status(500).json({ err }));
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
      .catch(err => res.status(404).json({ err }));
  },
  updateBook(req, res) {
    const {
      title,
      category,
      author,
      quantity,
      imageUrl
    } = req.body;
    const bookId = parseInt(req.params[0], 10);
    return db.Book.update({
      category,
      title,
      author,
      quantity,
      imageUrl
    },
    {
      where: {
        id: bookId
      }
    })
      .then(book => res.status(201).json({ book })
      )
      .catch(() => {
        res.status(403).json({
          errors: [{ msg: 'Please specify your details correctly' }]
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
          .then(() => res.status(200).json({
            errors: [{ msg: 'Book succesfully deleted' }]
          }))
          .catch(() => res.status(400).json({
            errors: [{ msg: 'Oops!Something went wrong. Check your details' }]
          }));
      });
  },
};
export default BooksController;
