
import db from '../models';
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersController = {
  createUser(req, res) {
    req.check('firstName', 'FirstName is required').notEmpty();
    req.check('userName', 'userName is required').notEmpty();
    req.check('membership', 'membership is required').notEmpty();
    req.check('membership', 'membership must either be silver, gold, or platinum').isMember();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Please put a valid email').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be a mininum of 4 character')
      .isLength(5, 50);
    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({ errors });
    } else {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email: req.body.email,
        membership: req.body.membership
      })
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).send(err.errors[0].message));
    }
  },

  findUser(req, res) {
    req.check('userName', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({ errors });
    } else {
      return db.User.findOne({
        where: {
          userName: req.body.userName
        }
      })
        .then((user) => {
          if (!user) {
            res.status(200).send('You are not registered');
          } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              const payLoad = ({
                email: user.email,
                id: user.id,
                userName: user.userName,
                password: user.password,
                role: user.role
              });
              const token = jwt.sign(payLoad, config.secretKey, {
                expiresIn: 3600 * 24
              });
              res.status(201).json({
                success: true,
                token,
              });
            } else {
              res.status(401).send('Wrong password');
            }
          }
        })
        .catch(err => res.status(400).send(err));
    }
  }
};

export default usersController;