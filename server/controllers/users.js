// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import verify from '../middleware/verify';

require('dotenv').config();

const usersController = {
  createUser(req, res) {
    req.check('firstName', 'FirstName is required').notEmpty();
    req.check('userName', 'userName is required').notEmpty();
    req.check('membership', 'membership is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Please put a valid email').isEmail();
    req.check('roleId', 'Id must be an integer').isInt();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be a mininum of 4 character')
      .isLength(5, 50);
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      email: req.body.email,
      membership: req.body.membership,
      roleId: req.body.roleId
    }, {
      fields: ['firstName', 'lastName', 'userName', 'password',
        'email', 'membership', 'roleId']
    })
      .then((user) => {
        const token = verify.getToken(user.dataValues);
        res.status(201).json({
          success: true,
          message: 'Registration successful',
          token
        });
      })
      .catch(err => res.status(400).json({ err }));
  },

  findUser(req, res) {
    req.check('userName', 'userName is required').notEmpty();
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
            res.status(401).send('You are not registered');
          } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              const token = verify.getToken(user.dataValues);
              res.status(200).json({
                success: true,
                message: 'You are signed in',
                token
              });
            } else {
              res.status(401).json({
                success: false,
                message: 'Authentication failed. Wrong password.'
              });
            }
          }
        })
        .catch(err => res.status(400).json({ err }));
    }
  }
};

export default usersController;
