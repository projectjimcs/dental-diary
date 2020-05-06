"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;

var _accountType = _interopRequireDefault(require("../models/accountType.js"));

var _company = _interopRequireDefault(require("../models/company.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var generateToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var accountType, payload, company, jwtToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _accountType["default"].query().findById(user.account_type_id);

          case 2:
            accountType = _context.sent;
            payload = {
              email: user.email,
              accountType: accountType.key
            };

            if (!user.company_id) {
              _context.next = 9;
              break;
            }

            _context.next = 7;
            return _company["default"].query().findById(user.company_id);

          case 7:
            company = _context.sent;
            payload['companyUuid'] = company.uuid;

          case 9:
            jwtToken = _jsonwebtoken["default"].sign(payload, _config.jwtSecret, {
              expiresIn: 900
            });
            return _context.abrupt("return", jwtToken);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

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
}; // This code might need refactoring for later


exports.verifyToken = verifyToken;

var decodeToken = function decodeToken(token) {
  var tokenParts = token.split('.');
  return JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('ascii'));
};

exports.decodeToken = decodeToken;