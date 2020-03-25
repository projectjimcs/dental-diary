"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _auth = require("../services/auth.js");

var testUsers = [{
  email: 'testadmin@example.com',
  password: 'testadmin!23',
  accountType: 'admin'
}, {
  email: 'testuser@example.com',
  password: 'testuser!23',
  accountType: 'member'
}];
var MILLISECONDS_IN_SECOND = 1000;
var SECONDS_IN_MINUTE = 60;

var login = function login(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  var user = testUsers.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (user) {
    var jwtToken = (0, _auth.generateToken)(user);
    var expiration = 15 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
    res.cookie('jwtToken', jwtToken, {
      maxAge: expiration,
      secure: false,
      httpOnly: true
    });
    res.json(jwtToken);
    return res.end();
  }

  return res.send('No user found');
};

exports.login = login;