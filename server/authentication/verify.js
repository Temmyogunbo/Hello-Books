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
  }
};
