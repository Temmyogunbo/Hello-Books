// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import verify from '../authentication/verify';

require('dotenv').config();

const UsersController = {
  createUser(req, res) {
    const {
      fullName,
      userName,
      email,
      password,
    } = req.body;
    req.check('fullName', 'Fullname is required').notEmpty();
    req.check('userName', 'Username is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Please put a valid email').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('password', 'Password must be a mininum of 5 character').isLength({ min: 5 });
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: errors[0] });
    }
    return db.User
      .create({
        fullName,
        userName,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        membership: 'gold',
        role: 'users'
      },
      {
        fields: ['fullName', 'userName', 'password',
          'email', 'membership', 'role']
      })
      .then((user) => {
        const {
          email,
          fullName,
          userName,
          membership,
          id,
          role
        } = user;
        const payload = {
          email,
          fullName,
          userName,
          membership,
          id,
          role,
        };
        const token = verify.getToken(payload);
        res.status(201).json({
          success: true,
          msg: 'Registration successful',
          token
        });
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          if (err.fields.userName) {
            res.status(401).json({
              msg: 'Username must be unique'
            });
          } else {
            res.status(401).json({
              msg: 'Email must be unique'
            });
          }
        } else {
          res.status(401).json({
            msg: 'Something went wrong'
          });
        }
      });
  },
  signUserIn(req, res) {
    req.check('userName', 'Username/Password is required').notEmpty();
    req.check('password', 'Username/Password is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: errors[0] });
    }
    // console.log(req.body.userName, req.body.password)
    return db.User.findOne({
      where: {
        userName: req.body.userName
      },
      attributes: ['userName',
        'password',
        'email', 'membership', 'role']
    })
      .then((user) => {
        if (!user) {
          res.status(401).json({
            msg: 'You are not registered'
          });
        } else if (user) {
          const {
            email,
            fullName,
            userName,
            id,
            role,
            membership,
          } = user;
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              email,
              fullName,
              userName,
              id,
              role,
              membership,
            };
            const token = verify.getToken(payload);
            if (token) {
              res.status(200).json({
                success: true,
                msg: 'You are signed in',
                token
              });
            } else {
              res.status(500).json({
                success: false,
                msg: 'Something went wrong try again'
              });
            }
          } else {
            res.status(401).json({
              success: false,
              msg: 'Wrong username/password.'
            });
          }
        }
      })
      .catch(err => res.status(500).json({
        err
      }));
  }
};

export default UsersController;
