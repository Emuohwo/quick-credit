"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db/db"));

var _validRegex = _interopRequireDefault(require("../helpers/validRegex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  applyForLoan: function () {
    var _applyForLoan = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var loanColumns, amountInput, tenorInput, calInterest, addAmountInterest, installment, calBalance, loanValues, _ref, rows, _rows$, id, useremail, tenor, amount, paymentinstallment, interest, balance, createdon, status, repaid, loan;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.tenor && !req.body.amount)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'All fields are required'
              }));

            case 2:
              loanColumns = "INSERT INTO\n    loans(useremail, tenor, amount, paymentinstallment, interest, balance)\n      VALUES($1, $2, $3, $4, $5, $6) returning *"; // let { tenor, amount } = req.body;

              amountInput = req.body.amount;
              tenorInput = req.body.tenor;
              tenorInput = parseInt(tenorInput, 10);
              calInterest = amountInput * 0.05;
              addAmountInterest = parseFloat(amountInput + calInterest).toFixed(2);
              installment = parseFloat(addAmountInterest / tenorInput).toFixed(2);
              calBalance = parseFloat(installment * tenorInput).toFixed(2);
              loanValues = [req.body.useremail, tenorInput, amountInput, installment, calInterest, calBalance];
              _context.prev = 11;
              _context.next = 14;
              return _db["default"].query(loanColumns, loanValues);

            case 14:
              _ref = _context.sent;
              rows = _ref.rows;
              _rows$ = rows[0], id = _rows$.id, useremail = _rows$.useremail, tenor = _rows$.tenor, amount = _rows$.amount, paymentinstallment = _rows$.paymentinstallment, interest = _rows$.interest, balance = _rows$.balance, createdon = _rows$.createdon, status = _rows$.status, repaid = _rows$.repaid;
              loan = {
                id: id,
                useremail: useremail,
                createdon: createdon,
                status: status,
                repaid: repaid,
                tenor: tenor,
                amount: amount,
                paymentinstallment: paymentinstallment,
                interest: interest,
                balance: balance
              };
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                loan: loan,
                message: 'Loan created successfully'
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](11);
              return _context.abrupt("return", res.status(400).send(_context.t0.message));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[11, 21]]);
    }));

    function applyForLoan(_x, _x2) {
      return _applyForLoan.apply(this, arguments);
    }

    return applyForLoan;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllLoans: function () {
    var _getAllLoans = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var queryLoans, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queryLoans = 'SELECT * FROM loans';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(queryLoans);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Loans queried successfully',
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

    function getAllLoans(_x3, _x4) {
      return _getAllLoans.apply(this, arguments);
    }

    return getAllLoans;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getLoanById: function () {
    var _getLoanById = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM loans WHERE id = $1';
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
                message: 'loan not found'
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

    function getLoanById(_x5, _x6) {
      return _getLoanById.apply(this, arguments);
    }

    return getLoanById;
  }(),

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
  updateLoan: function () {
    var _updateLoan = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findLoan, updateLoan, _ref4, rows, updatedLoanValues, resp;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_validRegex["default"].isValidLoanStatus(req.body.status)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", 'Status can only be approved or rejected or remain pending');

            case 2:
              findLoan = 'SELECT * FROM loans WHERE id = $1';
              updateLoan = 'UPDATE loan SET status=$1, repaid=$2 WHERE id=$3';
              _context4.prev = 4;
              _context4.next = 7;
              return _db["default"].query(findLoan, [req.params.id]);

            case 7:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              updatedLoanValues = [req.body.status || rows[0].status, req.body.repaid || rows[0].repaid, req.params.id];
              _context4.next = 12;
              return _db["default"].query(updateLoan, updatedLoanValues);

            case 12:
              resp = _context4.sent;
              return _context4.abrupt("return", res.status(200).send(resp.rows[0]));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](4);
              return _context4.abrupt("return", res.status(400).send(_context4.t0.message));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 16]]);
    }));

    function updateLoan(_x7, _x8) {
      return _updateLoan.apply(this, arguments);
    }

    return updateLoan;
  }(),
  getAllRepaidLoans: function () {
    var _getAllRepaidLoans = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var repaidLoans, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              repaidLoans = 'SELECT * FROM loans WHERE status=approved AND repaid=true';
              _context5.prev = 1;
              _context5.next = 4;
              return _db["default"].query(repaidLoans);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Loans successfully repaid',
                data: rows,
                rowCount: rowCount
              }));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(500).send({
                status: 500,
                error: _context5.t0.message
              }));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 10]]);
    }));

    function getAllRepaidLoans(_x9, _x10) {
      return _getAllRepaidLoans.apply(this, arguments);
    }

    return getAllRepaidLoans;
  }(),
  getAllLoansNotRepaid: function () {
    var _getAllLoansNotRepaid = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var repaidLoans, _ref6, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              repaidLoans = 'SELECT * FROM loans WHERE status=approved AND repaid=false';
              _context6.prev = 1;
              _context6.next = 4;
              return _db["default"].query(repaidLoans);

            case 4:
              _ref6 = _context6.sent;
              rows = _ref6.rows;
              rowCount = _ref6.rowCount;
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Loans not fully repaid',
                data: rows,
                rowCount: rowCount
              }));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(500).send({
                status: 500,
                error: _context6.t0.message
              }));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 10]]);
    }));

    function getAllLoansNotRepaid(_x11, _x12) {
      return _getAllLoansNotRepaid.apply(this, arguments);
    }

    return getAllLoansNotRepaid;
  }()
};
var _default = Loan;
exports["default"] = _default;