"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _morgan = _interopRequireDefault(require("morgan"));

var _home = _interopRequireDefault(require("./routes/home.js"));

var _config = require("./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var _dirname = _path["default"].resolve(); // view engine setup


app.set('views', _path["default"].join(_dirname, 'views'));
app.set('view engine', 'pug');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(_dirname, 'public')));
app.use('/', _home["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = _config.environment === 'development' ? err : {}; // render the error page

  res.status(err.status || 404);
  res.render('error');
});
var _default = app;
exports["default"] = _default;