"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _route = _interopRequireDefault(require("./src/routes/route.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_route["default"]);
app.listen(port, function () {
  console.log("Server started on port ".concat(port));
});
var _default = app;
exports["default"] = _default;