"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import pool from '../../config/config';
var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

var createUsers =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var userQuery;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userQuery = "\n    CREATE TABLE users(\n        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n        email VARCHAR(255) UNIQUE NOT NULL,\n        firstname VARCHAR(100) NOT NULL,\n        lastname VARCHAR(100) NOT NULL,\n        password VARCHAR(255) NOT NULL,\n        address VARCHAR(255) NOT NULL,\n        status VARCHAR(20) NOT NULL DEFAULT 'unverified',\n        isadmin BOOLEAN NOT NULL DEFAULT false,\n        createdon TIMESTAMP NOT NULL DEFAULT NOW()\n    )\n    ";
            _context.next = 3;
            return pool.query(userQuery).then(function (res) {
              // eslint-disable-next-line no-console
              console.log(res);
            })["catch"](function (error) {
              // eslint-disable-next-line no-console
              console.log(error.message);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUsers() {
    return _ref.apply(this, arguments);
  };
}();

var createLoans =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var loanQuery;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            loanQuery = "\n    CREATE TABLE IF NOT EXISTS \n    loans(\n        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n        useremail VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,\n        createdon TIMESTAMP NOT NULL DEFAULT NOW(),\n        status VARCHAR(50) NOT NULL DEFAULT 'pending',\n        repaid BOOLEAN NOT NULL DEFAULT false,\n        tenor SMALLINT NOT NULL,\n        amount NUMERIC(10, 2) NOT NULL,\n        paymentinstallment NUMERIC(10, 2) NOT NULL,\n        balance NUMERIC(10, 2) NOT NULL,\n        interest NUMERIC(10, 2) NOT NULL\n    )\n    ";
            _context2.next = 3;
            return pool.query(loanQuery).then(function (res) {
              // eslint-disable-next-line no-console
              console.log(res);
            })["catch"](function (error) {
              // eslint-disable-next-line no-console
              console.log(error.message);
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createLoans() {
    return _ref2.apply(this, arguments);
  };
}();

var createRepayments =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return pool.query("\n        CREATE TABLE repayments(\n            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n            createdon TIMESTAMP NOT NULL DEFAULT NOW(),\n            loanid UUID NOT NULL REFERENCES loans(id) ON DELETE CASCADE,\n            amount NUMERIC(10, 2) NOT NULL\n        );\n        \n    ").then(function (res) {
              // eslint-disable-next-line no-console
              console.log(res);
              pool.end();
            })["catch"](function (err) {
              // eslint-disable-next-line no-console
              console.log(err.message);
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createRepayments() {
    return _ref3.apply(this, arguments);
  };
}();

var createAdmin =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var adminQuery;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            adminQuery = "\n    INSERT INTO users (\n        id, email, firstname, lastname, address, password, status, isadmin\n    ) VALUES (\n        'ca6b7e7e-65d9-4bca-a5dc-76572dd97435',\n        'isaac@ewarri.com',\n        'Isaac',\n        'Warri',\n        '120 Lagos-Ibadan ExpressWay',\n        '$2b$08$DPJMyv4DkeuMjYys0/91m.3eyA6HPPSFk/K6gpq6Vd4zBS3XrKu3',\n        'verified',\n        true\n    )\n    ";
            _context4.next = 3;
            return pool.query(adminQuery).then(function (res) {
              // eslint-disable-next-line no-console
              console.log(res);
            })["catch"](function (error) {
              // eslint-disable-next-line no-console
              console.log(error.message);
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createAdmin() {
    return _ref4.apply(this, arguments);
  };
}();

createUsers();
createLoans();
createAdmin();
createRepayments(); // export default createTables;