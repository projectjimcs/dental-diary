"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.port = exports.environment = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Server setup


var environment = process.env.NODE_ENV;
exports.environment = environment;
var port = process.env.PORT;
exports.port = port;