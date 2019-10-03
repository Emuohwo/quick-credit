import uuid from 'uuid';
import moment from 'moment';

class Loan {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.loans = [];
  }

  /**
   *
   * @returns {object} user object
   */
  create(data) {
    const newLoan = {
      id: uuid.v4(),
      user: data.user || '',
      createdon: moment.now(),
      status: 'pending',
      repaid: false,
      tenor: parseInt(data.tenor, 10),
      amount: parseFloat(data.amount),
      balance: data.balance || '',
    };
    newLoan.interest = newLoan.amount * 0.05;

    // eslint-disable-next-line max-len
    newLoan.paymentInstallment = parseFloat((newLoan.amount + newLoan.interest) / newLoan.tenor).toFixed(2);
    // newLoan.paymentInstallment;
    this.loans.push(newLoan);
    return newLoan;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} loan object
   */
  findALoan(id) {
    return this.loans.find((loan) => loan.id === id);
  }

  /**
   * @returns {object} returns all loans
   */
  findAllLoan() {
    return this.loans;
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  updateALoan(id, data) {
    const loan = this.findALoan(id);
    const index = this.loans.indexOf(loan);
    this.loans[index].user = data.user || loan.user;
    this.loans[index].status = data.status || loan.status;
    this.loans[index].repaid = data.repaid || loan.repaid;
    this.loans[index].password = data.password || loan.password;
    this.loans[index].tenor = data.tenor || loan.tenor;
    this.loans[index].amount = data.amount || loan.amount;
    this.loans[index].balance = data.balance || loan.balance;
    return this.loans[index];
  }

  /**
   *
   * @param {uuid} id
   */
  deleteLoan(id) {
    const loan = this.findALoan(id);
    const index = this.loans.indexOf(loan);
    this.loans.splice(index, 1);
    return {};
  }
}
export default new Loan();
