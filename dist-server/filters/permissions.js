"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdministrator = void 0;

var isAdministrator = function isAdministrator(req, res, next) {
  var accountType = req.user.accountType;

  if (accountType !== 'admin') {
    return res.status('403').end();
  }

  next();
};

exports.isAdministrator = isAdministrator;