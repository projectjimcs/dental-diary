"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(res, user) {
  var expiration = _config.environment === 'development' ? 100 : 604800000;

  var jwtToken = _jsonwebtoken["default"].sign({
    email: user.email,
    accountType: user.accountType
  });
};