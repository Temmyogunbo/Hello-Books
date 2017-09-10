// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import verify from '../middleware/verify';

require('dotenv').config();

const usersController = {
  createUser(req, res) {
    req.check('fullName', 'fullName is required').notEmpty();
    req.check('userName', 'userName is required').notEmpty();
    // req.check('membership', 'membership is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Please put a valid email').isEmail();
    // req.check('roleId', 'Id must be an integer').isInt();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be a mininum of 4 character')
      .isLength(5, 50);
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ errors });
    }
    return db.User
      .create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        email: req.body.email,
        membership: 'silver',
        roleId: 0
      },
      {
        fields: ['fullName', 'userName', 'password',
          'email', 'membership', 'roleId']
      })
      .then((user) => {
        const payload = {
          email: user.email,
          fullName: user.fullName,
          userName: user.userName,
          membership: user.membership,
          id: user.id,
          roleId: user.roleId
        };
        const token = verify.getToken(payload);
        res.status(201).json({
          success: true,
          message: 'Registration successful',
          token
        });
      })
      .catch((err) => {
        if (err.errors[0].path === 'userName') {
          res.status(401).json({
            message: 'Username must be unique'
          });
        } else if (err.errors[0].path === 'email') {
          res.status(401).json({
            message: 'Email must be unique'
          });
        } else {
          res.status(401).json({
            message: 'Something went wrong'
          });
        }
      });
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
            res.status(401).send({
              message: 'You are not registered'
            });
          } else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              const payload = {
                email: user.email,
                fullName: user.fullName,
                userName: user.userName,
                id: user.id,
                roleId: user.roleId
              };
              const token = verify.getToken(payload);
              res.status(200).send({
                success: true,
                message: 'You are signed in',
                token
              });
            } else {
              res.status(401).send({
                success: false,
                message: 'Authentication failed. Wrong password.'
              });
            }
          }
        })
        .catch(() => res.status(500).json({
          message: 'Something went wrong'
        }));
    }
  }
};

export default usersController;
