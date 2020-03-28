"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbPassword = exports.dbPort = exports.dbUser = exports.dbName = exports.jwtSecret = exports.port = exports.environment = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Server setup


var environment = process.env.NODE_ENV;
exports.environment = environment;
var port = process.env.PORT; // Tokens

exports.port = port;
var jwtSecret = process.env.JWT_SECRET; // Database 

exports.jwtSecret = jwtSecret;
var dbName = process.env.DB_NAME;
exports.dbName = dbName;
var dbUser = process.env.DB_USER;
exports.dbUser = dbUser;
var dbPort = process.env.DB_PORT;
exports.dbPort = dbPort;
var dbPassword = process.env.DB_PASSWORD;
exports.dbPassword = dbPassword;