const User = require('../models').User;

module.exports = {
  createUser(req, res) {
    return User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      })
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err));
  },
  findUser(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err));
  },
};

