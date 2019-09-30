"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _password = _interopRequireDefault(require("../helpers/password"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  }
  /**
   *
   * @returns {object} user object
   */


  _createClass(User, [{
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(formData) {
        var queryString;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "INSERT INTO ".concat(this.users, " ( email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5, $6) returning *");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }() // async signUpUser(signupData) {
    //   const id = uuid();
    //   const password = passwordHelper.passwordHash(signupData.password)
    //   const { email, firstname, lastname, password, address, status,  isadmin, createdon } = signupData;
    //   try {
    //     const { rows } = await this.users.insert(
    //       'id, email, firstname, lastname, password, address', '$1, $2, $3, $4, $5, $6',
    //       [
    //         id, email, firstname, lastname, password, address
    //       ],
    //     );
    //     this.users.push(rows[0]);
    //     return rows[0];
    //   } catch (error) {
    //     throw error
    //   }
    // }
    // findUserById(id) {
    //   try {
    //     const { rows } = await this
    //   }
    //   return this.users.find((user) => user.id === id);
    // }

  }, {
    key: "findAUserByEmail",
    value: function findAUserByEmail(email) {
      return this.users.find(function (user) {
        return user.email === email;
      });
    } // logInUser(email, password) {
    //   const aUser = 'SELECT * FROM this.users WHERE email = $1';
    //   const foundUser = this.findAUserByEmail(email);
    //   if (foundUser  && passwordHelper.comparePasswords(password, foundUser.password)) {
    //     return foundUser;
    //   }
    // }

    /**
     * @returns {object} returns all users
     */

  }, {
    key: "findAllUsers",
    value: function findAllUsers() {
      return this.users;
    }
    /**
     *
     * @param {uuid} id
     * @param {object} data
     */

  }, {
    key: "updateAUser",
    value: function updateAUser(id, data) {
      var user = this.findAUser(id);
      var index = this.users.indexOf(user);
      this.users[index].email = data.email || user.email;
      this.users[index].firstname = data.firstname || user.firstname;
      this.users[index].lastname = data.lastname || user.lastname;
      this.users[index].password = data.password || user.password;
      this.users[index].address = data.address || user.address;
      this.users[index].status = data.status || user.status;
      this.users[index].isadmin = data.isadmin || user.isadmin;
      return this.users[index];
    }
    /**
     *
     * @param {uuid} id
     */

  }, {
    key: "deleteUser",
    value: function deleteUser(id) {
      var user = this.findAUser(id);
      var index = this.users.indexOf(user);
      this.users.splice(index, 1);
      return {};
    }
  }]);

  return User;
}();

var _default = new User();

exports["default"] = _default;