import db from '../models/db/db';
// import userController from './UserController';
import validRules from '../helpers/validRegex';

const Loan = {
  /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  async applyForLoan(req, res) {
    if (!req.body.tenor && !req.body.amount) {
      return res.status(400).send({ message: 'All fields are required' });
    }


    const loanColumns = `INSERT INTO
    loans(useremail, tenor, amount, paymentinstallment, interest, balance)
      VALUES($1, $2, $3, $4, $5, $6) returning *`;

    // let { tenor, amount } = req.body;
    const amountInput = req.body.amount;
    let tenorInput = req.body.tenor;
    tenorInput = parseInt(tenorInput, 10);
    const calInterest = amountInput * 0.05;
    const addAmountInterest = parseFloat(amountInput + calInterest).toFixed(2);
    const installment = parseFloat(addAmountInterest / tenorInput).toFixed(2);
    const calBalance = parseFloat(installment * tenorInput).toFixed(2);
    const loanValues = [
      req.body.useremail,
      tenorInput,
      amountInput,
      installment,
      calInterest,
      calBalance,
    ];
    try {
      const { rows } = await db.query(loanColumns, loanValues);
      const {
        id, useremail, tenor, amount, paymentinstallment, interest, balance,
        createdon, status, repaid,
      } = rows[0];
      const loan = {
        id,
        useremail,
        createdon,
        status,
        repaid,
        tenor,
        amount,
        paymentinstallment,
        interest,
        balance,
      };


      return res.status(201).send({
        status: 201,
        loan,
        message: 'Loan created successfully',
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
  async getAllLoans(req, res) {
    const queryLoans = 'SELECT * FROM loans';
    try {
      const { rows, rowCount } = await db.query(queryLoans);
      return res.status(200).send({
        status: 200,
        message: 'Loans queried successfully',
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
  async getLoanById(req, res) {
    const text = 'SELECT * FROM loans WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'loan not found',
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
  async updateLoan(req, res) {
    if (!validRules.isValidLoanStatus(req.body.status)) {
      return 'Status can only be approved or rejected or remain pending';
    }
    const findLoan = 'SELECT * FROM loans WHERE id = $1';
    const updateLoan = 'UPDATE loan SET status=$1, repaid=$2 WHERE id=$3';
    try {
      const { rows } = await db.query(findLoan, [req.params.id]);
      const updatedLoanValues = [
        req.body.status || rows[0].status,
        req.body.repaid || rows[0].repaid,
        req.params.id,
      ];
      const resp = await db.query(updateLoan, updatedLoanValues);
      return res.status(200).send(resp.rows[0]);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },

  async getAllRepaidLoans(req, res) {
    const repaidLoans = 'SELECT * FROM loans WHERE status=approved AND repaid=true';
    try {
      const { rows, rowCount } = await db.query(repaidLoans);
      return res.status(200).send({
        status: 200,
        message: 'Loans successfully repaid',
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

  async getAllLoansNotRepaid(req, res) {
    const repaidLoans = 'SELECT * FROM loans WHERE status=approved AND repaid=false';
    try {
      const { rows, rowCount } = await db.query(repaidLoans);
      return res.status(200).send({
        status: 200,
        message: 'Loans not fully repaid',
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

};

export default Loan;
