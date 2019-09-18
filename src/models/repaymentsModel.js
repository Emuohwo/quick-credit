import uuid from 'uuid';
import moment from 'moment';

class Repayments {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.repayments = [];
  }

  /**
   *
   * @returns {object} user object
   */
  repay(data) {
    const newRepay = {
      id: uuid.v4(),
      createdon: moment.now(),
      loanId: data.loanId || '',
      amount: data.amount || '',
      paidAmount: data.paidAmount || '',
    };
    newRepay.balance = parseFloat(newRepay.amount - newRepay.paidAmount).toFixed(2);
    this.repayments.push(newRepay);
    return newRepay;
  }

  /**
   *
   * @param {uuid} id
   * @returns {object} user object
   */
  findARepay(id) {
    return this.repayments.find((repay) => repay.id === id);
  }


  findAllRepays() {
    return this.repayments;
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  updateARepay(id, data) {
    const repay = this.findARepay(id);
    const index = this.repayments.indexOf(repay);
    this.repayments[index].amount = data.amount || repay.amount;
    this.repayments[index].paidAmount = data.paidAmount || repay.paidAmount;
    // this.repayments[index].firstname = data.firstname || user.firstname;
    // this.repayments[index].lastname = data.lastname || user.lastname;
    // this.repayments[index].password = data.password || user.password;
    // this.repayments[index].address = data.address || user.address;
    // this.repayments[index].status = data.status || user.status;
    // this.repayments[index].isadmin = data.isadmin || user.isadmin;
    return this.repayments[index];
  }

  /**
   *
   * @param {uuid} id
   */
  deleteRepay(id) {
    const repay = this.findARepay(id);
    const index = this.repayments.indexOf(repay);
    this.repayments.splice(index, 1);
    return {};
  }
}
export default new Repayments();
