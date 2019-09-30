"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _repaymentsModel = _interopRequireDefault(require("../models/repaymentsModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  repay: function repay(req, res) {
    if (!req.body.loanId && !req.body.amount) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var loanrepay = _repaymentsModel["default"].repay(req.body);

    return res.status(201).send(loanrepay);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllRepay: function getAllRepay(req, res) {
    var loanrepays = _repaymentsModel["default"].findAllRepays();

    return res.status(200).send(loans);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneLoanRepay: function getOneLoanRepay(req, res) {
    var repay = _repaymentsModel["default"].findARepay(req.params.id);

    if (!repay) {
      return res.status(404).send({
        message: 'repay not found'
      });
    }

    return res.status(200).send(repay);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
  updateARepay: function updateARepay(req, res) {
    var repay = _repaymentsModel["default"].findARepay(req.params.id);

    if (!repay) {
      return res.status(404).send({
        message: 'repay not found'
      });
    }

    var updatedRepay = _repaymentsModel["default"].updateARepay(req.params.id, req.body);

    return res.status(200).send(updatedRepay);
  },

  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  deleteLoan: function deleteLoan(req, res) {
    var repay = _repaymentsModel["default"].findARepay(req.params.id);

    if (!repay) {
      return res.status(404).send({
        message: 'repay not found'
      });
    }

    var ref = _repaymentsModel["default"].deleteRepay(req.params.id);

    return res.status(204).send(ref);
  }
};
var _default = Loan;
exports["default"] = _default;