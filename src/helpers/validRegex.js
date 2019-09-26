
const validInput = {
    isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  noEmptySpaces(input) {
      return /^(\S+)/.test(input)
  },
  isValidUserStatus(status) {
    status:  'unverified' || 'verified' || '';
    return status;
  }
}

export default validInput;
