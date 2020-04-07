"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = require("../services/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MILLISECONDS_IN_SECOND = 1000;
var SECONDS_IN_MINUTE = 60;

var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, user, jwtToken, expiration;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _user["default"].query().where('email', email).first().throwIfNotFound();

          case 4:
            user = _context.sent;

            if (!(user && _bcrypt["default"].compareSync(password, user.password))) {
              _context.next = 15;
              break;
            }

            _context.next = 8;
            return (0, _auth.generateToken)(user);

          case 8:
            jwtToken = _context.sent;
            expiration = 15 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
            res.cookie('jwtToken', jwtToken, {
              maxAge: expiration,
              secure: false,
              httpOnly: true
            });
            res.json(jwtToken);
            return _context.abrupt("return", res.end());

          case 15:
            return _context.abrupt("return", res.send('Wrong email or password'));

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            console.log('User not found');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 18]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;