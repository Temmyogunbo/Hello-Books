import bcrypt from 'bcrypt';

import models from '../models';
import Authentication from '../Authentication/Authentication';

require('dotenv').config();
/**
 * Class methodf for user
 *
 * @class UsersController
 */
class UsersController {
/**
 * Create a user
 *
 * @static
 *
 * @param {object} request
 * @param {object} response
 *
 * @returns {object} returns object
 *
 * @memberof UsersController
 */
  static createUser(request, response) {
    const {
      fullName,
      userName,
      email,
      password,
    } = request.body;

    return models.User
      .create(
        {
          fullName,
          userName,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          membership: 'gold',
          role: 'users',
        },
        {
          fields: ['fullName', 'userName', 'password',
            'email', 'membership', 'role'],
        },
      )
      .then((user) => {
        const {
          email,
          fullName,
          userName,
          membership,
          id,
          role,
        } = user;
        const token = Authentication.getToken({
          email,
          fullName,
          userName,
          membership,
          id,
          role,
        });
        response.status(201).json({
          success: true,
          message: 'Registration successful',
          email,
          fullName,
          userName,
          membership,
          id,
          role,
          token,
        });
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.userName) {
            response.status(409).json({
              message: 'Username already exist.',
            });
          } else if (error.fields.email) {
            response.status(409).json({
              message: 'Email has been taken.',
            });
          } else {
            response.status(500).json({
              message: 'An error occured',
            });
          }
        }
      });
  }
  /**
 * Signs in a user and get a token
 *
 * @static
 *
 * @param {object} request
 * @param {object} response
 *
 * @returns {object} return object
 *
 * @memberof UsersController
 */
  static signUserIn(request, response) {
    return models.User.findOne({
      where: {
        userName: request.body.userName,
      },
      attributes: ['userName',
        'password',
        'email', 'membership', 'role', 'id', 'fullName'],
      limit: 1,
    })
      .then((user) => {
        if (!user) {
          return response.status(401).json({
            message: 'You are not registered',
          });
        }
        const {
          email,
          userName,
          fullName,
          id,
          role,
          membership,
        } = user;
        if (bcrypt.compareSync(request.body.password, user.password)) {
          const token = Authentication.getToken({
            email,
            userName,
            fullName,
            id,
            role,
            membership,
          });
          if (token) {
            response.status(200).json({
              success: true,
              message: 'You are signed in',
              email,
              userName,
              fullName,
              id,
              role,
              membership,
              token,
            });
          }
        } else {
          return response.status(401).json({
            success: false,
            message: 'Wrong username/password.',
          });
        }
      })
      .catch(() => {
        response.status(500).json({
          message: 'An error occured',
        });
      });
  }
  /**
 * Change user password
 *
 * @static
 *
 * @param {object} request
 * @param {object} response
 *
 * @returns {object} returns object
 *
 * @memberof UsersController
 */
  static changePassword(request, response) {
    const {
      newPassword,
      oldPassword,
      userName,
    } = request.body;
    return models.User.findOne({
      where: {
        userName,
      },
      attributes: ['password'],
      limit: 1,
    })
      .then((password) => {
        if (bcrypt.compareSync(oldPassword, password.password)) {
          return models.User.update(
            {
              password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
            },
            {
              where: {
                userName,
              },
              returning: true,
              plain: true,
            },
          )
            .then(newUpdate => response.status(200)
              .json(newUpdate[1].dataValues))
            .catch(() =>
              response.status(500)
                .json({ message: 'An error occured' }));
        }
        return response.status(400).json({
          message: 'Your old password is incorrect.',
        });
      })
      .catch(() =>
        response.status(500)
          .json({ message: 'An error occured' }));
  }
}

export default UsersController;
