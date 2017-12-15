import bcrypt from 'bcrypt';
import database from '../models';
import verify from '../authentication/verify';


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
 * @param {any} request
 * @param {any} response
 * @returns {object} returns object
 * @memberof UsersController
 */
  static createUser(request, response) {
    const {
      fullName,
      userName,
      email,
      password,
    } = request.body;

    return database.User
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
        response.status(201).json({
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
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          if (error.fields.userName) {
            response.status(401).json({
              msg: 'Username must be unique'
            });
          } else {
            response.status(401).json({
              msg: 'Email must be unique'
            });
          }
        }
      });
  }
  /**
 * Signs in a user and get a token
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @returns {object} return object
 * @memberof UsersController
 */
  static signUserIn(request, response) {
    return database.User.findOne({
      where: {
        userName: request.body.userName
      },
      attributes: ['userName',
        'password',
        'email', 'membership', 'role', 'id', 'fullName'],
      limit: 1
    })
      .then((user) => {
        const {
          email,
          userName,
          fullName,
          id,
          role,
          membership,
        } = user;
        if (bcrypt.compareSync(request.body.password, user.password)) {
          const token = verify.getToken({
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
          return response.status(401).json({
            success: false,
            msg: 'Wrong username/password.'
          });
        }
      })
      .catch(() => response.status(401).json({
        msg: 'You are not registered'
      }));
  }
  /**
 * Change user password
 *
 * @static
 * @param {any} request
 * @param {any} response
 * @returns {object} returns object
 * @memberof UsersController
 */
  static changePassword(request, response) {
    const {
      newPassword,
      oldPassword,
      userName
    } = request.body;
    return database.User.findOne({
      where: {
        userName
      },
      attributes: ['password'],
      limit: 1
    })
      .then((password) => {
        if (bcrypt.compareSync(oldPassword, password.password)) {
          return database.User.update(
            {
              password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
            },
            {
              where: {
                userName
              }
            }
          )
            .then(newUpdate => response.status(204).json(newUpdate))
            .catch(() => response.status(400)
              .json({ msg: 'Your password cannot be updated.' }));
        }
        return response.status(403).json({
          msg: 'Your old password is incorrect.'
        });
      })
      .catch(() => response.status(400)
        .json({ msg: 'You are not a valid user.' }));
  }
}

export default UsersController;
