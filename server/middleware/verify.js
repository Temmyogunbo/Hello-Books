import jwt from 'jsonwebtoken';

require('dotenv').config();

// defining class for token
export default {
  getToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: 3600 * 24
    });
  },
  verifyOrdinaryUser(req, res, next) {
    const token = req.headers.authorization || req.body.token ||
     req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          const err = new Error('You are not authenticated');
          err.status = 401;
          return next(err);
        } else {
          req.decoded = decoded;
          if (req.decoded.roleId === 1) {
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
}
//const verify = new Token();
//export default verify;

