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
    status: 'unverified' || 'verified' || '';

    return status;
  }
};
var _default = validInput;
exports["default"] = _default;