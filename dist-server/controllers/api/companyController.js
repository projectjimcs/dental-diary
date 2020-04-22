"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanies = exports.update = exports.create = void 0;

var _company = _interopRequireDefault(require("../../models/company.js"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getCompanies = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var companies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _company["default"].query().select('uuid', 'name', 'email', 'phone', 'address', 'timezone', 'status');

          case 3:
            companies = _context.sent;
            return _context.abrupt("return", res.json(companies));

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

  return function getCompanies(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCompanies = getCompanies;

var create = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, companyName, companyEmail, companyPhone, companyAddress, companyTimezone, uuid, newCompany;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, companyName = _req$body.companyName, companyEmail = _req$body.companyEmail, companyPhone = _req$body.companyPhone, companyAddress = _req$body.companyAddress, companyTimezone = _req$body.companyTimezone;
            uuid = (0, _uuid.v4)(); // No point doing transaction here, delete later

            _context3.prev = 2;
            _context3.next = 5;
            return _company["default"].transaction( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(trx) {
                var newCompany;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _company["default"].query(trx).insert({
                          name: companyName,
                          uuid: uuid,
                          email: companyEmail || null,
                          phone: companyPhone || null,
                          address: companyAddress || null,
                          timezone: companyTimezone,
                          status: 'active'
                        });

                      case 2:
                        newCompany = _context2.sent;
                        return _context2.abrupt("return", newCompany);

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 5:
            newCompany = _context3.sent;
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);
            console.log('Unsucessful');

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 8]]);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var update = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, companyName, companyEmail, companyPhone, companyAddress, companyTimezone, updateData, company;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, companyName = _req$body2.companyName, companyEmail = _req$body2.companyEmail, companyPhone = _req$body2.companyPhone, companyAddress = _req$body2.companyAddress, companyTimezone = _req$body2.companyTimezone;
            updateData = {
              name: companyName,
              email: companyEmail || null,
              phone: companyPhone || null,
              address: companyAddress || null,
              timezone: companyTimezone
            };
            _context4.prev = 2;
            _context4.next = 5;
            return _company["default"].query().where('uuid', req.params.companyUuid).patch(updateData).throwIfNotFound();

          case 5:
            company = _context4.sent;
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            res.status('404').end();

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8]]);
  }));

  return function update(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.update = update;