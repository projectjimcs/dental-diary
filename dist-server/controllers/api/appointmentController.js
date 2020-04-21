"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllAppointments = void 0;

var _appointment = _interopRequireDefault(require("../../models/appointment.js"));

var _company = _interopRequireDefault(require("../../models/company.js"));

var _auth = require("../../services/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllAppointments = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userData, companyUuid, company, appointments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userData = (0, _auth.decodeToken)(req.cookies.jwtToken);
            companyUuid = userData.companyUuid;
            _context.prev = 2;
            _context.next = 5;
            return _company["default"].query().findOne({
              uuid: companyUuid
            }).throwIfNotFound();

          case 5:
            company = _context.sent;
            _context.next = 8;
            return _appointment["default"].query().where('company_id', company.id).select('id', 'patient_id', 'title', 'description', 'visible', 'booked_with', 'created_by', 'start_time', 'end_time');

          case 8:
            appointments = _context.sent;
            res.json(appointments);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log('Unsuccessful');

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function getAllAppointments(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllAppointments = getAllAppointments;