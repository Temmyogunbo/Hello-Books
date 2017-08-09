// //import Book from '../models/book';
// const Book = require('../models/book');
import db from '../models';

const booksController = {
  createBook(req, res) {
    const errors = req.validationErrors();
    req.check('title', 'Title is required').notEmpty();
    req.check('author', 'Author is required').notEmpty();
    req.check('category', 'Category is required').notEmpty();
    req.check('quantity', 'Quantity is required').notEmpty();
    if (errors) {
      res.status(400).json({ errors });
    } else {
      db.Book.create({
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        quantity: req.body.quantity
      })
        .then(book => res.status(201).send(book))
        .catch(err => res.status(400).send(err));
    }
  },
  findBooks(req, res) {
    return db.Book.findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(200).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch(err => res.status(404).send(err));
  },
  updateBook(req, res) {
    const errors = req.validationErrors();
    req.check('title', 'Title is required').notEmpty();
    req.check('author', 'Author is required').notEmpty();
    req.check('category', 'Category is required').notEmpty();
    req.check('quantity', 'Quantity is required').notEmpty();
    if (errors) {
      res.status(400).json({ errors });
    } else {
      return db.Book.update({
        category: req.body.category,
        title: req.body.title,
        author: req.body.author,
        quantity: req.body.quantity
      },
      {
        fields: ['category', 'title', 'author', 'quantity'],
        where: {
          id: req.params.bookId
        }
      })
        .then(() => {
          res.status(200).send('Book updated');
        })
        .catch((err) => {
          res.status(405).send(err);
        });
    }
  }
};
export default booksController;
