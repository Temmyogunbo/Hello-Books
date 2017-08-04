const User = require('../models').User;

module.exports = {
  createUser(req, res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userName = req.body.username;
    const passWord = req.body.password;
    const email = req.body.email;
    if (!firstName || !lastName || !userName || !passWord || !email) {
      res.status(401).send('Inavlid logins');
    }
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
      .then((user) => {
        if (!user) {
          res.status(200).send('You are not registered');
        }
        else if (user.password !== req.body.password) {
          res.status(401).send('Wrong password');
        }
        res.status(200).send('Welcome to HelloBooks');
      })
      .catch(err => res.status(400).send(err));
  },
};

