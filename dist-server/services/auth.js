"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(user) {
  var payload = {
    email: user.email,
    accountType: user.accountType
  };

  var jwtToken = _jsonwebtoken["default"].sign(payload, _config.jwtSecret, {
    expiresIn: 900
  });

  return jwtToken;
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(req, res, next) {
  var jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).end();
  }

  _jsonwebtoken["default"].verify(jwtToken, _config.jwtSecret, function (err, userData) {
    if (err) {
      return res.status('403').end();
    }

    req.user = userData;
    next();
  });
};

exports.verifyToken = verifyToken;