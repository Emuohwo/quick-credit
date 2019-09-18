import loansModel from '../models/loansModel';

const Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  applyForLoan(req, res) {
    if (!req.body.user && !req.body.tenor
        && !req.body.amount && !req.body.balance) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const loan = loansModel.create(req.body);
    return res.status(201).send(loan);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  getAllLoans(req, res) {
    const loans = loansModel.findAllLoan();
    return res.status(200).send(loans);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  getOneLoan(req, res) {
    const loan = loansModel.findALoan(req.params.id);
    if (!loan) {
      return res.status(404).send({ message: 'loan not found' });
    }
    return res.status(200).send(loan);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
  updateLoan(req, res) {
    const loan = loansModel.findALoan(req.params.id);
    if (!loan) {
      return res.status(404).send({ message: 'loan not found' });
    }
    const updatedLoan = loansModel.updateALoan(req.params.id, req.body);
    return res.status(200).send(updatedLoan);
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  deleteLoan(req, res) {
    const loan = loansModel.findALoan(req.params.id);
    if (!loan) {
      return res.status(404).send({ message: 'loan not found' });
    }
    const ref = loansModel.deleteLoan(req.params.id);
    return res.status(204).send(ref);
  },
};

export default Loan;
