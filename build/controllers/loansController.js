"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loansModel = _interopRequireDefault(require("../models/loansModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  applyForLoan: function applyForLoan(req, res) {
    if (!req.body.user && !req.body.tenor && !req.body.amount && !req.body.balance) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var loan = _loansModel["default"].create(req.body);

    return res.status(201).send(loan);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllLoans: function getAllLoans(req, res) {
    var loans = _loansModel["default"].findAllLoan();

    return res.status(200).send(loans);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneLoan: function getOneLoan(req, res) {
    var loan = _loansModel["default"].findALoan(req.params.id);

    if (!loan) {
      return res.status(404).send({
        message: 'loan not found'
      });
    }

    return res.status(200).send(loan);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
  updateLoan: function updateLoan(req, res) {
    var loan = _loansModel["default"].findALoan(req.params.id);

    if (!loan) {
      return res.status(404).send({
        message: 'loan not found'
      });
    }

    var updatedLoan = _loansModel["default"].updateALoan(req.params.id, req.body);

    return res.status(200).send(updatedLoan);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  deleteLoan: function deleteLoan(req, res) {
    var loan = _loansModel["default"].findALoan(req.params.id);

    if (!loan) {
      return res.status(404).send({
        message: 'loan not found'
      });
    }

    var ref = _loansModel["default"].deleteLoan(req.params.id);

    return res.status(204).send(ref);
  }
};
var _default = Loan;
exports["default"] = _default;