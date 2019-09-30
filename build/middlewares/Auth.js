"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var apiSecret = process.env.API_SECRET;
/*
 * @class Authenticate User
 * @requires jsonwebtoken
 * @requires '../helpers/errorStrings'
 */

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "authenticateUser",

    /**
      * Authenticate users
      * @param {Object} request
      * @param {Object} response
      * @param {callback} next
      */
    value: function authenticateUser(request, response, next) {
      try {
        var token = request.headers.authorization;
        request.user = Auth.verifyToken(token);
        return next();
      } catch (error) {
        if (error.message === 'jwt expired') {
          return response.status(419).send({
            status: 419,
            response: response,
            error: 'Ooops! an error occurred, Kindly login again'
          });
        }

        return response.status(401).send({
          status: 401,
          response: response,
          error: 'Kindly login to provide token'
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

  }, {
    key: "authenticateAdmin",
    value: function authenticateAdmin(request, response, next) {
      try {
        var token = request.headers.authorization;
        request.user = Auth.verifyToken(token);

        if (request.user.isadmin === false || request.user.isadmin === "") {
          return response.status(403).send({
            status: 403,
            response: response,
            error: 'Only admin have access to this operation'
          });
        }

        return next();
      } catch (error) {
        if (error.message === 'jwt expired') {
          return response.status(419).send({
            status: 419,
            response: response,
            error: 'Ooops! an error occurred, Kindly login again'
          });
        }

        return response.status(401).send({
          status: 401,
          response: response,
          error: 'Kindly login to provide token'
        });
      }
    }
    /**
    * Verify a token by using a secret key and a public key.
    * @param {Object} token
    * @return {Object} return verified token
    */

  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      return _jsonwebtoken["default"].verify(token, apiSecret);
    }
  }]);

  return Auth;
}();

var _default = Auth;
exports["default"] = _default;