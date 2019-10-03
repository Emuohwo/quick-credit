
const validInput = {
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  noEmptySpaces(input) {
    return /^(\S+)/.test(input);
  },
  isValidUserStatus(status) {
    return /(unverified|verified)/.test(status);
  },
  isValidLoanStatus(status) {
    return /approved|rejected|pending/i.test(status);
  },
};

export default validInput;
