"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var apiSecret = process.env.API_SECRET;

var generateToken = function generateToken(_ref) {
  var id = _ref.id,
      isadmin = _ref.isadmin;
  return _jsonwebtoken["default"].sign({
    id: id,
    isadmin: isadmin
  }, apiSecret, {
    expiresIn: '3d'
  });
};

var _default = generateToken;
exports["default"] = _default;