import express from 'express';
import Auth from '../middlewares/Auth';
import User from '../controllers/UserController';
import Loan from '../controllers/loansController';
import Repay from '../controllers/RepaymentController';
import validLoan from '../middlewares/validLoans';
import validUser from '../middlewares/validUser';
import validRepayment from '../middlewares/validRepayment';

const router = express.Router();

const admin = [
  Auth.verifyToken,
  Auth.isVerified,
  Auth.isAdmin,
];
const isAuthenticated = [
  Auth.verifyToken,
];

const verifiedUser = [
  Auth.verifyToken,
  Auth.isVerified,
];

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Quick Credit');
});

router.post('/api/v1/auth/signup', validUser.isValidUserInput, User.signUpUser);
router.post('/api/v1/auth/signin', User.logInUser);
router.get('/api/v1/users/:email', User.getUserByEmail);
// router.get('/api/v1/users/:id', User.getUserById);
router.patch('/api/v1/users/:email/verify', admin, validUser.isValidUserUpdate, User.verifyUser);

router.post('/api/v1/loans', verifiedUser, validLoan.postLoan, validLoan.isValidPostType, Loan.applyForLoan);
router.get('/api/v1/loans', isAuthenticated, Loan.getAllLoans);
router.get('/api/v1/loans/:id', isAuthenticated, Loan.getLoanById);
router.get('/api/v1/loans?status=approved&repaid=false', isAuthenticated, Loan.getAllLoansNotRepaid);
router.get('/api/v1/loans?status=approved&repaid=true', isAuthenticated, Loan.getAllRepaidLoans);
// router.put('/api/v1/loans/:id', Loan.updateLoan);
// router.patch('/api/v1/loans/:id/status', Auth.authenticateAdmin, Loan.updateLoan);
// router.delete('/api/v1/loans/:id', Loan.deleteLoan);

router.post('/api/v1/repayment', admin, validRepayment.isRequiredInp, validRepayment.isValidLoan, Repay.RepaymentOfLoan);
// router.get('/api/v1/loans', Loan.getAllLoans);

export default router;
