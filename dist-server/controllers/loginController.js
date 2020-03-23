"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testUsers = [{
  email: 'testadmin@example.com',
  password: 'testadmin!23',
  accountType: 'admin'
}, {
  email: 'testuser@example.com',
  password: 'testuser!23',
  accountType: 'member'
}];

var login = function login(req, res) {
  console.log(req.body);
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  var user = testUsers.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    var userAccessToken = _jsonwebtoken["default"].sign({
      email: user.email,
      accountType: user.accountType
    }, _config.jwtSecret);

    return res.json({
      userAccessToken: userAccessToken
    });
  }

  return res.send('No user found');
};

exports.login = login;