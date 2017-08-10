import jwt from 'jsonwebtoken';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

const verify = {
  getToken(user) {
    return jwt.sign(user, config.secretKey, {
      expiresIn: 3600
    });
  },
  verifyOrdinaryUser(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, jwt, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }
};
export default verify;

