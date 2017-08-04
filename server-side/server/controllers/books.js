const Books = require('../models').Books;

module.exports = {
  createBook(req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const author = req.body.author;
    const quantity = req.body.quantity;
    const quantityBorrowed = req.body.quantityBorrowed;
    if (!title || !category || !author || !quantity || !quantityBorrowed) {
      res.status(401).send('Inavlid logins details');
    }
    return Books
      .create({
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        quantity: req.body.quantity,
        quantityBorrowed: req.body.quantityBorrowed,
      })
      .then(book => res.status(201).send(book))
      .catch(err => res.status(400).send(err));
  },
  findBooks(req, res) {
    return Books
      .findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(200).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch(err => res.status(404).send(err));
  },
  updateBook(req, res) {
    return Books
      .findOne({
        where: {
          id: req.params.bookId
        }
      })
      .then((user) => {
        user.updateAttributes({
          category: req.body.category
        })
          .then(resp => res.status(200).send(resp));
      })
      .catch(err => res.status(400).send(err));
  }
};

