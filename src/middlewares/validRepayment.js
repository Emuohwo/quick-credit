import db from '../models/db/db';

const repaymentValidator = {
  isRequiredInp(req, res, next) {
    const { loanid, amount } = req.body;
    if (!loanid) {
      return res.status(400).send('Loan id is required');
    }
    if (!amount) {
      return res.status(400).send('Amount is required');
    }

    return next();
  },

  async isValidLoan(req, res, next) {
    if (req.body.amount !== 'number') {
      return res.status(400).send('Amount should be a number ');
    }
    const findOneQuery = 'SELECT id FROM loans WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.body.loanid]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: {
          message: 'loan not found',
        },
      });
    }
    return next();
  },
};

export default repaymentValidator;
