import db from '../models/db/db';
// import Loans from './loansController';

const Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  async RepaymentOfLoan(req, res) {
    // if (!req.body.loanid && !req.body.amount) {
    //   return res.status(400).send({ message: 'All fields are required' });
    // }


    const makePayment = `INSERT INTO 
    repayments(loanid, amount) 
    VALUES($1, $2) returning *`;

    const paymentValue = [
      req.body.loanid,
      req.body.amount,
    ];

    try {
      const { rows } = await db.query(makePayment, paymentValue);
      const { id, loanid, amount } = rows[0];
      const repayment = {
        id,
        loanid,
        amount,
      };
      return res.status(201).send({
        message: 'repayment successful',
        repayment,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflections array
     */
  async getAllRepay(req, res) {
    const queryRepay = 'SELECT * FROM repayments';
    try {
      const { rows, rowCount } = await db.query(queryRepay);
      return res.status(200).send({
        status: 200,
        message: 'Repayments queried successfully',
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  async getLoanRepayByUser(req, res) {
    const userRepayments = 'SELECT * FROM repayments WHERE loanid=$1';
    try {
      const { rows } = await db.query(userRepayments, [req.params.loanid]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Invalid loan',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
      });
    }
  },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} updated loan
     */
  // updateARepay(req, res) {
  //   const repay = repaymentsModel.findARepay(req.params.id);
  //   if (!repay) {
  //     return res.status(404).send({ message: 'repay not found' });
  //   }
  //   const updatedRepay = repaymentsModel.updateARepay(req.params.id, req.body);
  //   return res.status(200).send(updatedRepay);
  // },
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void} return statuc code 204
     */
  // deleteLoan(req, res) {
  //   const repay = repaymentsModel.findARepay(req.params.id);
  //   if (!repay) {
  //     return res.status(404).send({ message: 'repay not found' });
  //   }
  //   const ref = repaymentsModel.deleteRepay(req.params.id);
  //   return res.status(204).send(ref);
  // },
};

export default Loan;
