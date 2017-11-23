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

    return db.User
      .create(
        {
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
        }
      )
      .then((user) => {
        const {
          email,
          fullName,
          userName,
          membership,
          id,
          role
        } = user;
        const token = verify.getToken({
          email,
          fullName,
          userName,
          membership,
          id,
          role
        });
        res.status(201).json({
          success: true,
          msg: 'Registration successful',
          email,
          fullName,
          userName,
          membership,
          id,
          role,
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
          res.status(500).json({
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
    return db.User.findOne({
      where: {
        userName: req.body.userName
      },
      attributes: ['userName',
        'password',
        'email', 'membership', 'role', 'id', 'fullName'],
      limit: 1
    })
      .then((user) => {
        if (!user) {
          res.status(401).json({
            msg: 'You are not registered'
          });
        } else if (user) {
          const {
            email,
            userName,
            fullName,
            id,
            role,
            membership,
          } = user;
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = verify.getToken({
              email,
              userName,
              fullName,
              id,
              role,
              membership,
            });
            if (token) {
              res.status(200).json({
                success: true,
                msg: 'You are signed in',
                email,
                userName,
                fullName,
                id,
                role,
                membership,
                token
              });
            }
          } else {
            return res.status(401).json({
              success: false,
              msg: 'Wrong username/password.'
            });
          }
        }
      })
      .catch(() => res.status(500).json({
        success: false,
        msg: 'Something went wrong try again'
      }));
  },
  changePassword(req, res) {
    const {
      newPassword,
      oldPassword,
      userName
    } = req.body;
    req.check('oldPassword', 'This field is required').notEmpty();
    req.check('newPassword', 'This field is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: errors[0] });
    }
    return db.User.findOne({
      where: {
        userName: userName
      },
      attributes: ['password'],
      limit: 1
    })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(oldPassword, user.password)) {
            return db.User.update(
              {
                password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
              },
              {
                where: {
                  userName: userName
                }
              }
            )
              .then((newUpdate) => res.status(204).json(newUpdate))
              .catch(() => res.status(403)
                .json({ msg: 'User doesn\'t exist.' }));
          } else {
            return res.status(403).json({
              msg: 'Your password is wrong.'
            });
          }
        }
      })
      .catch(() => res.status(500)
        .json({ msg: 'Cannot change password.Try again.' }));
  }
};

export default UsersController;
