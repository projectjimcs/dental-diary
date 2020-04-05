"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _user = _interopRequireDefault(require("../../models/user.js"));

var _company = _interopRequireDefault(require("../../models/company.js"));

var _accountType = _interopRequireDefault(require("../../models/accountType.js"));

var _userRole = _interopRequireDefault(require("../../models/userRole.js"));

var _uuid = require("uuid");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, firstName, lastName, companyUuid, email, phone, address, password, selectedRoles, accountTypeKey, companyId, accountTypeId, uuid, hashedPassword, newUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('create user');
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, companyUuid = _req$body.companyUuid, email = _req$body.email, phone = _req$body.phone, address = _req$body.address, password = _req$body.password, selectedRoles = _req$body.selectedRoles, accountTypeKey = _req$body.accountTypeKey;
            _context4.prev = 2;
            _context4.next = 5;
            return _company["default"].query().where('uuid', companyUuid).select('id').throwIfNotFound().then(function (companies) {
              return companies.map(function (company) {
                return company.id;
              })[0];
            });

          case 5:
            companyId = _context4.sent;
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            console.log('Company not found');
            res.status('404').end();

          case 12:
            _context4.prev = 12;
            _context4.next = 15;
            return _accountType["default"].query().select('id').where('key', accountTypeKey).throwIfNotFound().then(function (accountTypes) {
              return accountTypes.map(function (accountType) {
                return accountType.id;
              })[0];
            });

          case 15:
            accountTypeId = _context4.sent;
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](12);
            console.log('Account Type not found');
            res.status('404').end();

          case 22:
            uuid = (0, _uuid.v4)();
            hashedPassword = _bcrypt["default"].hashSync(password, 12);
            console.log(hashedPassword);
            _context4.prev = 25;
            _context4.next = 28;
            return _user["default"].transaction( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(trx) {
                var newUser;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _user["default"].query(trx).insert({
                          company_id: companyId,
                          uuid: uuid,
                          password: hashedPassword,
                          firstname: firstName,
                          lastname: lastName,
                          email: email,
                          phone: phone || null,
                          address: address || null,
                          account_type_id: accountTypeId,
                          status: 'active'
                        });

                      case 2:
                        newUser = _context.sent;
                        return _context.abrupt("return", newUser);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 28:
            newUser = _context4.sent;
            selectedRoles.forEach( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(role) {
                var newRole;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _userRole["default"].transaction( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(trx) {
                            var newRole;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.next = 2;
                                    return _userRole["default"].query(trx).insert({
                                      user_id: newUser.id,
                                      role_id: role
                                    });

                                  case 2:
                                    newRole = _context2.sent;
                                    return _context2.abrupt("return", newRole);

                                  case 4:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x5) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 2:
                        newRole = _context3.sent;

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()); // Insert response here

            _context4.next = 36;
            break;

          case 32:
            _context4.prev = 32;
            _context4.t2 = _context4["catch"](25);
            console.log(_context4.t2);
            console.log('Unsucessful user creation');

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8], [12, 18], [25, 32]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;