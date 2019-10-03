"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import uuid from 'uuid';
// import passwordHelper from '../helpers/password';
// import pool from '../config/config';
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
  // async createUser(formData) {
  // eslint-disable-next-line max-len
  //   const queryString = `INSERT INTO ${this.users} ( email, firstname, lastname, password, address) VALUES($1, $2, $3, $4, $5, $6) returning *`;
  // }
  // async signUpUser(signupData) {
  //   const id = uuid();
  //   const password = passwordHelper.passwordHash(signupData.password)
  // eslint-disable-next-line max-len
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


  _createClass(User, [{
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