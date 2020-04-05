"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccountTypes = exports.getRoles = void 0;

var _accountType = _interopRequireDefault(require("../../models/accountType.js"));

var _Role = _interopRequireDefault(require("../../models/Role.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAccountTypes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var accountTypes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _accountType["default"].query();

          case 3:
            accountTypes = _context.sent;
            res.json(accountTypes);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log('Unsuccessful');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAccountTypes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAccountTypes = getAccountTypes;

var getRoles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var roles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Role["default"].query();

          case 3:
            roles = _context2.sent;
            res.json(roles);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log('Unsuccessful');

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getRoles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getRoles = getRoles;