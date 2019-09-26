import express from 'express';
import Auth from '../middlewares/Auth'
import User from '../controllers/UserController';
import Loan from '../controllers/loansController';
import Repay from '../controllers/RepaymentController'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Quick Credit');
});

router.post('/api/v1/auth/signup',  User.signUpUser);
// router.post('/api/v1/users/auth/signin',  User.logInUser);
router.get('/api/v1/users', User.getAllUsers);
router.get('/api/v1/users/:id', User.getOneUser);
router.put('/api/v1/users/:id', User.updateUser);
router.patch('/api/v1/users/:id/status', Auth.authenticateUser, User.updateUser);
router.delete('/api/v1/users/:id', User.deleteUser);

router.post('/api/v1/loans', Loan.applyForLoan);
router.get('/api/v1/loans', Loan.getAllLoans);
router.get('/api/v1/loans/:id', Loan.getOneLoan);
router.put('/api/v1/loans/:id', Loan.updateLoan);
router.patch('/api/v1/loans/:id/status', Auth.authenticateAdmin, Loan.updateLoan);
router.delete('/api/v1/loans/:id', Loan.deleteLoan);

router.post('/api/v1/loans/:id/repayment', Repay.repay);
router.get('/api/v1/loans', Loan.getAllLoans);

export default router;
