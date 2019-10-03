"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var validInput = {
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  noEmptySpaces: function noEmptySpaces(input) {
    return /^(\S+)/.test(input);
  },
  isValidUserStatus: function isValidUserStatus(status) {
    return /(unverified|verified)/.test(status);
  },
  isValidLoanStatus: function isValidLoanStatus(status) {
    return /approved|rejected|pending/i.test(status);
  }
};
var _default = validInput;
exports["default"] = _default;