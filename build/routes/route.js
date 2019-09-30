"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Auth = _interopRequireDefault(require("../middlewares/Auth"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _loansController = _interopRequireDefault(require("../controllers/loansController"));

var _RepaymentController = _interopRequireDefault(require("../controllers/RepaymentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res) {
  res.status(200).send('Welcome to Quick Credit');
});
router.post('/api/v1/auth/signup', _UserController["default"].signUpUser);
router.post('/api/v1/auth/signin', _UserController["default"].logInUser);
router.get('/api/v1/users/:email', _UserController["default"].getUserByEmail); // router.get('/api/v1/users/:id', User.getUserById);

router.patch('/api/v1/users/:email/verify', _UserController["default"].verifyUser);
router.post('/api/v1/loans', _loansController["default"].applyForLoan);
router.get('/api/v1/loans', _loansController["default"].getAllLoans);
router.get('/api/v1/loans/:id', _loansController["default"].getOneLoan);
router.put('/api/v1/loans/:id', _loansController["default"].updateLoan);
router.patch('/api/v1/loans/:id/status', _Auth["default"].authenticateAdmin, _loansController["default"].updateLoan);
router["delete"]('/api/v1/loans/:id', _loansController["default"].deleteLoan);
router.post('/api/v1/loans/:id/repayment', _RepaymentController["default"].repay);
router.get('/api/v1/loans', _loansController["default"].getAllLoans);
var _default = router;
exports["default"] = _default;