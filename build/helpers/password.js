"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var passwordHash = function passwordHash(password) {
  return _bcrypt["default"].hashSync(password, Number(process.env.SALT));
};

var comparePasswords = function comparePasswords(userPass, hashedPass) {
  return _bcrypt["default"].compareSync(userPass, hashedPass);
};

var _default = {
  passwordHash: passwordHash,
  comparePasswords: comparePasswords
};
exports["default"] = _default;