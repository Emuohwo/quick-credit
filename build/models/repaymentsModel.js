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

var Repayments =
/*#__PURE__*/
function () {
  /**
   * class constructor
   * @param {object} data
   */
  function Repayments() {
    _classCallCheck(this, Repayments);

    this.repayments = [];
  }
  /**
   *
   * @returns {object} user object
   */


  _createClass(Repayments, [{
    key: "repay",
    value: function repay(data) {
      var newRepay = {
        id: _uuid["default"].v4(),
        createdon: _moment["default"].now(),
        loanId: data.loanId || '',
        amount: data.amount || '',
        paidAmount: data.paidAmount || ''
      };
      newRepay.balance = parseFloat(newRepay.amount - newRepay.paidAmount).toFixed(2);
      this.repayments.push(newRepay);
      return newRepay;
    }
    /**
     *
     * @param {uuid} id
     * @returns {object} user object
     */

  }, {
    key: "findARepay",
    value: function findARepay(id) {
      return this.repayments.find(function (repay) {
        return repay.id === id;
      });
    }
  }, {
    key: "findAllRepays",
    value: function findAllRepays() {
      return this.repayments;
    }
    /**
     *
     * @param {uuid} id
     * @param {object} data
     */

  }, {
    key: "updateARepay",
    value: function updateARepay(id, data) {
      var repay = this.findARepay(id);
      var index = this.repayments.indexOf(repay);
      this.repayments[index].amount = data.amount || repay.amount;
      this.repayments[index].paidAmount = data.paidAmount || repay.paidAmount; // this.repayments[index].firstname = data.firstname || user.firstname;
      // this.repayments[index].lastname = data.lastname || user.lastname;
      // this.repayments[index].password = data.password || user.password;
      // this.repayments[index].address = data.address || user.address;
      // this.repayments[index].status = data.status || user.status;
      // this.repayments[index].isadmin = data.isadmin || user.isadmin;

      return this.repayments[index];
    }
    /**
     *
     * @param {uuid} id
     */

  }, {
    key: "deleteRepay",
    value: function deleteRepay(id) {
      var repay = this.findARepay(id);
      var index = this.repayments.indexOf(repay);
      this.repayments.splice(index, 1);
      return {};
    }
  }]);

  return Repayments;
}();

var _default = new Repayments();

exports["default"] = _default;