import jwt from 'jsonwebtoken';
import db from '../models/db/db';

// const apiSecret = process.env.API_SECRET;

/*
 * @class Authenticate User
 * @requires jsonwebtoken
 * @requires '../helpers/errorStrings'
 */
const Auth = {
  /**
   * Verify Token
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object|void} response object
   */
  async verifyToken(req, res, next) {
      const token = req.headers['x-access-token'];
      if (!token) {
          return res.status(400).send({'message': 'Token is not provided'});
      }
      try {
          const decoded = await jwt.verify(token, process.env.API_SECRET);
          const text = 'SELECT * FROM users WHERE id = $1';
          const { rows } = await db.query(text, [decoded.userId]);
          if (!rows[0]) {
              return res.status(400).send({'meassge': 'The token you provided is invalid'})
          }
          req.user = { id: decoded.userId };
          next();
      } catch(error) {
          return res.status(400).send(error);
      }
  },

  async isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Token is not provided' });
    }
    const decoded = await jwt.verify(token, process.env.API_SECRET);
    if (decoded.isadmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'only admin users have access to this route',
      });
    }
    return next();
  },

  async isVerified(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Token is not provided' });
    }
    const decoded = await jwt.verify(token, process.env.API_SECRET);
    if (decoded.status !== 'verified') {
      return res.status(403).json({
        status: 403,
        error: 'Your account is not verified',
      });
    }
    return next();
  },

}

export default Auth;
