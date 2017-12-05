import jwt from 'jsonwebtoken';

require('dotenv').config();

export default {
  getToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: 3600 * 24
    });
  },
  checkIfAdmin(request, response, next) {
    if (request.decoded.role === 'admin') {
      next();
    } else {
      return response.status(403).json({
        errors: [{ msg: 'You are not authorised' }]
      });
    }
  },
  isLoggedIn(request, response, next) {
    const token = request.headers.authorization || request.body.token ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return response.status(401).json({
            errors: [{ msg: 'You are not authenticated' }]
          });
        }
        request.decoded = decoded;
        next();
      });
    } else {
      return response.status(403).json({
        errors: [{ msg: 'You are not logged in.' }]
      });
    }
  },
  validateBookRequest(request, response, next) {
    if (request.url === '/api/v1/category') {
      request.check('category', 'category is required').notEmpty();
      const errors = request.validationErrors();
      if (errors) {
        return response.status(400).json({ error: errors[0] });
      }
      next();
    } else {
      request.check('category', 'category is required').notEmpty();
      request.check('imageUrl', 'imageUrl is required').notEmpty();
      request.check(
        'imagePublicId',
        'cloudinary public Id is required'
      ).notEmpty();
      request.check('description', 'Description is required').notEmpty();
      request.check('title', 'title is required').notEmpty();
      request.check('author', 'author is required').notEmpty();
      request.check('quantity', 'quantity is required').notEmpty();
      request.check('quantity', 'quantity must be an integer').isInt();
      const errors = request.validationErrors();
      if (errors) {
        return response.status(400).json({ error: errors[0] });
      }
      next();
    }
  },
  validateUserRequest(request, response, next) {
    if (request.url === '/api/v1/users/signin') {
      request.check('password', 'Password is required').notEmpty();
      request.check(
        'password',
        'Password must be a mininum of 5 characters'
      ).isLength({ min: 5 });
      request.check('userName', 'Username is required').notEmpty();
      const errors = request.validationErrors();
      if (errors) {
        return response.status(400).json({ error: errors[0] });
      }
      next();
    } else if (request.url === '/api/v1/users/change-password') {
      request.check('oldPassword', 'This field is required').notEmpty();
      request.check('newPassword', 'This field is required').notEmpty();
      request.check(
        'newPassword',
        'New password must be a mininum of 5 characters'
      ).isLength({ min: 5 });
      const errors = request.validationErrors();
      if (errors) {
        return response.status(400).json({ error: errors[0] });
      }
      next();
    } else {
      request.check('fullName', 'Fullname is required').notEmpty();
      request.check('userName', 'Username is required').notEmpty();
      request.check('email', 'Email is required').notEmpty();
      request.check('email', 'Please put a valid email').isEmail();
      request.check('password', 'Password is required').notEmpty();
      request.check(
        'password',
        'Password must be a mininum of 5 characters'
      ).isLength({ min: 5 });
      const errors = request.validationErrors();
      if (errors) {
        return response.status(400).json({ error: errors[0] });
      }
      next();
    }
  }


};
