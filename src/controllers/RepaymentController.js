import repaymentsModel from '../models/repaymentsModel';

const Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  repay(req, res) {
    if (!req.body.loanId && !req.body.amount) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const loanrepay = repaymentsModel.repay(req.body);
    return res.status(201).send(loanrepay);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllRepay(req, res) {
    const loanrepays = repaymentsModel.findAllRepays();
    return res.status(200).send(loans);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneLoanRepay(req, res) {
    const repay = repaymentsModel.findARepay(req.params.id);
    if (!repay) {
      return res.status(404).send({ message: 'repay not found' });
    }
    return res.status(200).send(repay);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
    updateARepay(req, res) {
        const repay = repaymentsModel.findARepay(req.params.id);
        if (!repay) {
      return res.status(404).send({ message: 'repay not found' });
    }
    const updatedRepay = repaymentsModel.updateARepay(req.params.id, req.body);
    return res.status(200).send(updatedRepay);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  deleteLoan(req, res) {
    const repay = repaymentsModel.findARepay(req.params.id);
    if (!repay) {
      return res.status(404).send({ message: 'repay not found' });
    }
    const ref = repaymentsModel.deleteRepay(req.params.id);
    return res.status(204).send(ref);
  },
};

export default Loan;
