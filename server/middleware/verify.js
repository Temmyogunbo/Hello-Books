import jwt from 'jsonwebtoken';

require('dotenv').config();

// defining class for token
export default {
  getToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: 3600 * 24
    });
  },
  verifyOrdinaryUser(request, response, next) {
    const token = request.headers.authorization || request.body.token ||
     request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          const err = new Error('You are not authenticated');
          err.status = 401;
          next(err);
        } else {
          request.decoded = decoded;
          if (request.decoded.roleId === 1) {
            next();
          } else {
            const err = new Error('You are not authorised');
            err.status = 403;
            return next(err);
          }
        }
      });
    } else {
      // No token provided
      const err = new Error('No token provided');
      err.status = 403;
      return next(err);
    }
  }
};
