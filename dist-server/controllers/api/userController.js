"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.create = void 0;

var _user = _interopRequireDefault(require("../../models/user.js"));

var _company = _interopRequireDefault(require("../../models/company.js"));

var _accountType = _interopRequireDefault(require("../../models/accountType.js"));

var _userRole = _interopRequireDefault(require("../../models/userRole.js"));

var _role = _interopRequireDefault(require("../../models/role.js"));

var _uuid = require("uuid");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = require("../../services/auth.js");

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
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, companyUuid = _req$body.companyUuid, email = _req$body.email, phone = _req$body.phone, address = _req$body.address, password = _req$body.password, selectedRoles = _req$body.selectedRoles, accountTypeKey = _req$body.accountTypeKey;
            _context4.prev = 1;
            _context4.next = 4;
            return _company["default"].query().where('uuid', companyUuid).select('id').throwIfNotFound().then(function (companies) {
              return companies.map(function (company) {
                return company.id;
              })[0];
            });

          case 4:
            companyId = _context4.sent;
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            console.log('Company not found');
            res.status('404').end();

          case 11:
            _context4.prev = 11;
            _context4.next = 14;
            return _accountType["default"].query().select('id').where('key', accountTypeKey).throwIfNotFound().then(function (accountTypes) {
              return accountTypes.map(function (accountType) {
                return accountType.id;
              })[0];
            });

          case 14:
            accountTypeId = _context4.sent;
            _context4.next = 21;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t1 = _context4["catch"](11);
            console.log('Account Type not found');
            res.status('404').end();

          case 21:
            uuid = (0, _uuid.v4)();
            hashedPassword = _bcrypt["default"].hashSync(password, 12);
            _context4.prev = 23;
            _context4.next = 26;
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

          case 26:
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

            _context4.next = 34;
            break;

          case 30:
            _context4.prev = 30;
            _context4.t2 = _context4["catch"](23);
            console.log(_context4.t2);
            console.log('Unsucessful user creation');

          case 34:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7], [11, 17], [23, 30]]);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;

var getUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var validRoles, userData, companyUuid, company, users, _users;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            validRoles = ['admin', 'doctor', 'employee'];
            userData = (0, _auth.decodeToken)(req.cookies.jwtToken);
            companyUuid = userData.companyUuid;
            _context5.next = 5;
            return _company["default"].query().findOne({
              uuid: companyUuid
            });

          case 5:
            company = _context5.sent;

            if (!(req.query.role && validRoles.includes(req.query.role))) {
              _context5.next = 17;
              break;
            }

            _context5.prev = 7;
            _context5.next = 10;
            return _user["default"].query().select('id', 'uuid', 'firstname', 'lastname', 'color').withGraphFetched('roles').modifyGraph('roles', function (builder) {
              builder.where('key', req.query.role);
            }).then(function (users) {
              return users.filter(function (user) {
                return user.roles.length;
              });
            });

          case 10:
            users = _context5.sent;
            return _context5.abrupt("return", res.json(users));

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](7);
            console.log('Users not found');

          case 17:
            _context5.prev = 17;
            _context5.next = 20;
            return _user["default"].query().where('company_id', company.id).select('id', 'uuid', 'firstname', 'lastname').throwIfNotFound();

          case 20:
            _users = _context5.sent;
            return _context5.abrupt("return", res.json(_users));

          case 24:
            _context5.prev = 24;
            _context5.t1 = _context5["catch"](17);
            console.log('Users not found');

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[7, 14], [17, 24]]);
  }));

  return function getUsers(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;