import jwt from 'jsonwebtoken';

const apiSecret = process.env.API_SECRET;

/*
 * @class Authenticate User
 * @requires jsonwebtoken
 * @requires '../helpers/errorStrings'
 */
class Auth {
  /**
    * Authenticate users
    * @param {Object} request
    * @param {Object} response
    * @param {callback} next
    */

  static authenticateUser(request, response, next) {
    try {
      const token = request.headers.authorization;
      request.user = Auth.verifyToken(token);
      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        return response.status(419).send({
          status: 419,
          response,
          error: 'Ooops! an error occurred, Kindly login again',
        });
      }
      return response.status(401).send({
        status: 401,
        response,
        error: 'Kindly login to provide token',
      });
    }
  }

  /**
 * check Admin role
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @return {Object}
 */
  static authenticateAdmin(request, response, next) {
    try {
      const token = request.headers.authorization;
      request.user = Auth.verifyToken(token);
      if (request.user.isadmin === false || request.user.isadmin === '') {
        return response.status(403).send({
          status: 403,
          response,
          error: 'Only admin have access to this operation',
        });
      }
      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        return response.status(419).send({
          status: 419,
          response,
          error: 'Ooops! an error occurred, Kindly login again',
        });
      }
      return response.status(401).send({
        status: 401,
        response,
        error: 'Kindly login to provide token',
      });
    }
  }


  /**
 * Verify a token by using a secret key and a public key.
 * @param {Object} token
 * @return {Object} return verified token
 */

  static verifyToken(token) {
    return jwt.verify(token, apiSecret);
  }
}

export default Auth;
