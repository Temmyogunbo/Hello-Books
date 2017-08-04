const Books = require('../models').Books;

module.exports = {
  createBook(req, res) {
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
      .findOne({
        where: {
          author: req.body.author
        }
      })
      .then(books => res.status(200).send(books))
      .catch(err => res.status(400).send(err));
  },
};

