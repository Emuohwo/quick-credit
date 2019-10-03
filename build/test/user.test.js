"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-env mocha */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var validUser = {
  email: ' Mikegold@gmail.com',
  firstname: 'Mike',
  lastname: 'Gold',
  password: 'Mike',
  address: '11a, lagos, Nigeria',
  isadmin: false
};
var wrongUserEmailformat = {
  email: 'Mikegold@gmailcom ',
  firstname: 'Mike',
  lastname: 'Gold',
  password: 'Mike',
  address: '11a, lagos, Nigeria',
  status: 'verified',
  isadmin: false
};
var userWithNoFirstname = {
  email: 'Mikegold@gmailcom',
  lastname: 'Gold',
  password: 'Mike',
  address: '11a, lagos, Nigeria',
  status: 'verified',
  isadmin: false
};
var userWithNoPassword = {
  email: ' Mikegold@gmail.com',
  firstname: 'Mike',
  lastname: 'Gold',
  address: '11a, lagos, Nigeria',
  status: 'verified',
  isadmin: false
};
var invalidUserStatus = {
  email: ' Mikegold@gmail.com',
  firstname: 'Mike',
  lastname: 'Gold',
  address: '11a, lagos, Nigeria',
  status: 'alive',
  isadmin: false
};
describe('Create a User', function () {
  it('should return a success status 201 when submitted', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(validUser).end(function (err, res) {
      res.should.have.status(201);
      done();
    });
  });
  it('should return a bad request status 400 when submitted, wrong email format', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(wrongUserEmailformat).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should return a bad request status 400 when submitted, for no firstname', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(userWithNoFirstname).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should return a bad request status 400 when submitted, for no password', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(userWithNoPassword).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should return a bad request status 400 when submitted, for invalid Status', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(invalidUserStatus).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
});