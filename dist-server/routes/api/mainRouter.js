"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _company = _interopRequireDefault(require("./company.js"));

var _timezone = _interopRequireDefault(require("./timezone.js"));

var _account = _interopRequireDefault(require("./account.js"));

var _user = _interopRequireDefault(require("./user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/company', _company["default"]);
router.use('/timezone', _timezone["default"]);
router.use('/account', _account["default"]);
router.use('/user', _user["default"]);
var _default = router;
exports["default"] = _default;