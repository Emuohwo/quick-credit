import db from '../models/db/db';

// const spaces = (obj) => {
//     const stringStatus = obj.status.trim();
//     if (stringStatus.length < 1) {
//         return true;
//     }
//     return false;
// }

const loanValidator = {
    async isValidPostType (req, res, next) {
        const { useremail, tenor, amount} = req.body;
        if (typeof tenor !== 'number' || typeof amount !== 'number') {
            return res.status(400).send({
                status: 400,
                error : {
                    message: 'invalid input type',
                },
            });
        }
        if (tenor > 12 || tenor < 0) {
            return res.status(400).send('Tenor range is 0 - 12 months')
        }
        const findLoan = `SELECT email FROM users WHERE email = $1`;
        const { rows } = await db.query(findLoan, [useremail]);
        if (!rows[0]) {
            return res.status(404).send({
                status: 400,
                error: 'Invalid email'
            })
        }
        return next();
    },

    postLoan (req, res, next) {
        let { useremail, tenor, amount } = req.body;
        let errorMessages = [];

        if (!useremail) {
            let error = {error: 'Your email is required'};
            errorMessages.push(error)
        }

        if (!tenor) {
            let error = {error: 'Tenor is required'};
            errorMessages.push(error)
        }

        if (!amount) {
            let error = {error: 'Amount is required'};
            errorMessages.push(error)
        }

        if (errorMessages.length !== 0) {
            return res.status(400).send({
                status: 400,
                error: errorMessages,
            });
        }
        return next()
    },

    async isValidLoanId (req, res, next) {
        const findLoan = `SELECT id FROM loans WHERE id = $1`;
        const { rows } = await db.query(findLoan, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).send({
                status: 400,
                error: 'Loan not found'
            })
        }
        return next();
    },

    async isValidLoanUser (req, res, next) {
        const findLoan = `SELECT email FROM users WHERE email = $1`;
        const { rows } = await db.query(findLoan, [req.body.useremail]);
        if (!rows[0]) {
            return res.status(404).send({
                status: 400,
                error: 'Invalid email'
            })
        }
        return next();
    },
    
    isValidLoanUpdate (req, res, next) {
        let { tenor, amount, repaid, status} = req.body;
        if (status !== 'pending' || status !== 'approved' || status !== 'rejected') {
            return res.status(400).send('Status should be pending, approved or rejected');
        }
        if(typeof tenor !== 'number' || typeof repaid !== Boolean || typeof amount !== 'number') {
            return res.status(400).send('Check input for invalid type');
        }
        

        return next();
    }

}

export default loanValidator;
