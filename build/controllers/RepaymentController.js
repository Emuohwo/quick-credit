"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import Loans from './loansController';
var Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  RepaymentOfLoan: function () {
    var _RepaymentOfLoan = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var makePayment, paymentValue, _ref, rows, _rows$, id, loanid, amount, repayment;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // if (!req.body.loanid && !req.body.amount) {
              //   return res.status(400).send({ message: 'All fields are required' });
              // }
              makePayment = "INSERT INTO \n    repayments(loanid, amount) \n    VALUES($1, $2) returning *";
              paymentValue = [req.body.loanid, req.body.amount];
              _context.prev = 2;
              _context.next = 5;
              return _db["default"].query(makePayment, paymentValue);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              _rows$ = rows[0], id = _rows$.id, loanid = _rows$.loanid, amount = _rows$.amount;
              repayment = {
                id: id,
                loanid: loanid,
                amount: amount
              };
              return _context.abrupt("return", res.status(201).send({
                message: 'repayment successful',
                repayment: repayment
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send(_context.t0.message));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 12]]);
    }));

    function RepaymentOfLoan(_x, _x2) {
      return _RepaymentOfLoan.apply(this, arguments);
    }

    return RepaymentOfLoan;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllRepay: function () {
    var _getAllRepay = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var queryRepay, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queryRepay = 'SELECT * FROM repayments';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(queryRepay);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Repayments queried successfully',
                data: rows,
                rowCount: rowCount
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).send({
                status: 500,
                error: _context2.t0.message
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function getAllRepay(_x3, _x4) {
      return _getAllRepay.apply(this, arguments);
    }

    return getAllRepay;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getLoanRepayByUser: function () {
    var _getLoanRepayByUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var userRepayments, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userRepayments = 'SELECT * FROM repayments WHERE loanid=$1';
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query(userRepayments, [req.params.loanid]);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Invalid loan'
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
                error: _context3.t0.message
              }));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }));

    function getLoanRepayByUser(_x5, _x6) {
      return _getLoanRepayByUser.apply(this, arguments);
    }

    return getLoanRepayByUser;
  }()
};
var _default = Loan;
exports["default"] = _default;