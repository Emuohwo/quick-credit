"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-env mocha */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('Get Home Route', function () {
  it('It should return Welcome to Quick Loan', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});