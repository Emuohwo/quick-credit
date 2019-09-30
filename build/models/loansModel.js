"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Loan =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Loan() {
    _classCallCheck(this, Loan);

    this.loans = [];
  }
  /**
   *
   * @returns {object} user object
   */


  _createClass(Loan, [{
    key: "create",
    value: function create(data) {
      var newLoan = {
        id: _uuid["default"].v4(),
        user: data.user || '',
        createdon: _moment["default"].now(),
        status: 'pending',
        repaid: false,
        tenor: parseInt(data.tenor, 10),
        amount: parseFloat(data.amount),
        balance: data.balance || ''
      };
      newLoan.interest = newLoan.amount * 0.05;
      newLoan.paymentInstallment = parseFloat((newLoan.amount + newLoan.interest) / newLoan.tenor).toFixed(2);
      newLoan.paymentInstallment;
      this.loans.push(newLoan);
      return newLoan;
    }
    /**
     *
     * @param {uuid} id
     * @returns {object} loan object
     */

  }, {
    key: "findALoan",
    value: function findALoan(id) {
      return this.loans.find(function (loan) {
        return loan.id === id;
      });
    }
    /**
     * @returns {object} returns all loans
     */

  }, {
    key: "findAllLoan",
    value: function findAllLoan() {
      return this.loans;
    }
    /**
     *
     * @param {uuid} id
     * @param {object} data
     */

  }, {
    key: "updateALoan",
    value: function updateALoan(id, data) {
      var loan = this.findALoan(id);
      var index = this.loans.indexOf(loan);
      this.loans[index].user = data.user || loan.user;
      this.loans[index].status = data.status || loan.status;
      this.loans[index].repaid = data.repaid || loan.repaid;
      this.loans[index].password = data.password || loan.password;
      this.loans[index].tenor = data.tenor || loan.tenor;
      this.loans[index].amount = data.amount || loan.amount;
      this.loans[index].balance = data.balance || loan.balance;
      return this.loans[index];
    }
    /**
     *
     * @param {uuid} id
     */

  }, {
    key: "deleteLoan",
    value: function deleteLoan(id) {
      var loan = this.findALoan(id);
      var index = this.loans.indexOf(loan);
      this.loans.splice(index, 1);
      return {};
    }
  }]);

  return Loan;
}();

var _default = new Loan();

exports["default"] = _default;