import db from '../models/db/db';

const validateUser = {

    isValidUserInput (req, res, next) {
        let { email, password, address, firstname, lastname } = req.body;
        if (!email) {
            return res.status(400).send('Email is required')
        }
        if (!password) {
            return res.status(400).send('Password is required')
        }
        if (!address) {
            return res.status(400).send('Address is required')
        }
        if (!firstname) {
            return res.status(400).send('First name is required')
        }
        if (!lastname) {
            return res.status(400).send('Last name is required')
        }
        if (typeof firstname !== 'string' || typeof lastname !== 'string') {
            return res.status(400).send('First and Last name must be in alphabet');
        }
        return next();
    },

    isValidUserUpdate (req, res, next) {
        let { status } = req.body;
        if (status != 'unverified' || status != 'verified') {
            return res.status(400).send('Status can either be unverified or verified');
        } 
        return next();
    },

    async isValidUserId (req, res, next) {
        const findLoan = `SELECT id FROM users WHERE id = $1`;
        const { rows } = await db.query(findLoan, [req.params.id]);
        if (!rows[0]) {
            return res.status(404).send({
                status: 400,
                error: 'User not found'
            })
        }
        return next();
    },

    // async isValidUserEmail (req, res, next) {
    //     const findLoan = `SELECT email FROM users WHERE email = $1`;
    //     const { rows } = await db.query(findLoan, [req.params.email]);
    //     if (!rows[0]) {
    //         return res.status(404).send({
    //             status: 400,
    //             error: 'User not found'
    //         })
    //     }
    //     return next();
    // },

}

export default validateUser;
