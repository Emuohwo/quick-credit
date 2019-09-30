"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db/db"));

var _token = _interopRequireDefault(require("../helpers/token"));

var _validRegex = _interopRequireDefault(require("../helpers/validRegex"));

var _password = _interopRequireDefault(require("../helpers/password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  signUpUser: function () {
    var _signUpUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, columns, columnsValues, _ref, rows, token, _rows$, id, email, firstname, lastname, password, address, status, isadmin, createdon, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_validRegex["default"].isValidEmail(req.body.email)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send('Invalid email. Please check your spellings!'));

            case 2:
              if (_validRegex["default"].noEmptySpaces(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send('Invalid email. Spaces are not allowed before or after email!'));

            case 4:
              hashPassword = _password["default"].passwordHash(req.body.password);
              columns = "INSERT INTO\n    users(email, firstname, lastname, password, address) \n    VALUES($1, $2, $3, $4, $5) returning *";
              columnsValues = [req.body.email, req.body.firstname, req.body.lastname, hashPassword, req.body.address];
              _context.prev = 7;
              _context.next = 10;
              return _db["default"].query(columns, columnsValues);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;
              console.log(rows[0]);
              token = (0, _token["default"])(rows[0].id, rows[0].isadmin);
              _rows$ = rows[0], id = _rows$.id, email = _rows$.email, firstname = _rows$.firstname, lastname = _rows$.lastname, password = _rows$.password, address = _rows$.address, status = _rows$.status, isadmin = _rows$.isadmin, createdon = _rows$.createdon;
              user = {
                id: id,
                email: email,
                firstname: firstname,
                lastname: lastname,
                address: address,
                status: status,
                createdon: createdon
              };
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  user: user,
                  message: 'Account created Successfully'
                }]
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](7);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': 'User already exist'
              }));

            case 23:
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: {
                  message: _context.t0.message
                }
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 19]]);
    }));

    function signUpUser(_x, _x2) {
      return _signUpUser.apply(this, arguments);
    }

    return signUpUser;
  }(),
  logInUser: function () {
    var _logInUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var column, _ref2, rows, _rows$2, id, email, firstname, lastname, password, address, status, isadmin, createdon, user, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              column = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(column, [req.body.email]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(400).send(400, 'User not found'));

            case 8:
              if (_password["default"].comparePasswords(req.body.password, rows[0].password)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(401).send('Incorrect Password'));

            case 10:
              _rows$2 = rows[0], id = _rows$2.id, email = _rows$2.email, firstname = _rows$2.firstname, lastname = _rows$2.lastname, password = _rows$2.password, address = _rows$2.address, status = _rows$2.status, isadmin = _rows$2.isadmin, createdon = _rows$2.createdon;
              user = {
                id: id,
                email: email,
                firstname: firstname,
                lastname: lastname,
                address: address,
                status: status,
                createdon: createdon
              };
              token = (0, _token["default"])(rows[0].id, rows[0].isadmin);
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                data: [{
                  message: "Welcome back ".concat(firstname),
                  token: token,
                  user: user
                }]
              }));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 16]]);
    }));

    function logInUser(_x3, _x4) {
      return _logInUser.apply(this, arguments);
    }

    return logInUser;
  }(),
  getUserById: function () {
    var _getUserById = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM users WHERE id = $1';
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query(text, [req.params.id]);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                message: 'user not found'
              }));

            case 8:
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                data: rows[0]
              }));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                error: 'enter a valid id'
              }));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }));

    function getUserById(_x5, _x6) {
      return _getUserById.apply(this, arguments);
    }

    return getUserById;
  }(),
  getUserByEmail: function () {
    var _getUserByEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var text, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM users WHERE email = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query(text, [req.params.email]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'user not found'
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                data: rows[0]
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                error: 'enter a valid email'
              }));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 11]]);
    }));

    function getUserByEmail(_x7, _x8) {
      return _getUserByEmail.apply(this, arguments);
    }

    return getUserByEmail;
  }(),
  verifyUser: function () {
    var _verifyUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var finduser, updateUser, _ref5, rows, values, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              finduser = 'SELECT * FROM users WHERE email = $1';
              updateUser = "UPDATE users SET status=$1 WHERE email=$2 returning *";
              _context5.prev = 2;
              _context5.next = 5;
              return _db["default"].query(finduser, [req.params.email]);

            case 5:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (_validRegex["default"].isValidUserStatus(rows[0].status)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", 'status can either be "verified or unverified"');

            case 9:
              values = ['verified', req.params.email];
              _context5.next = 12;
              return _db["default"].query(updateUser, values);

            case 12:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(200).send(response.rows[0]));

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send(400, _context5.t0.message));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 16]]);
    }));

    function verifyUser(_x9, _x10) {
      return _verifyUser.apply(this, arguments);
    }

    return verifyUser;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneUser: function getOneUser(req, res) {
    var user = UserModel.findAUser(req.params.id);

    if (!user) {
      return res.status(404).send({
        message: 'user not found'
      });
    }

    return res.status(200).send(user);
  }
};
var _default = User;
exports["default"] = _default;