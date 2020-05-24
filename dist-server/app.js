"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _home = _interopRequireDefault(require("./routes/home.js"));

var _adminDashboard = _interopRequireDefault(require("./routes/admin-dashboard.js"));

var _userDashboard = _interopRequireDefault(require("./routes/user-dashboard.js"));

var _mainRouter = _interopRequireDefault(require("./routes/api/mainRouter.js"));

var _config = require("./config.js");

var _knex = _interopRequireDefault(require("./database/knex.js"));

var _objection = require("objection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_objection.Model.knex(_knex["default"]);

var app = (0, _express["default"])();

var _dirname = _path["default"].resolve(); // view engine setup


app.set('views', _path["default"].join(_dirname, 'views'));
app.set('view engine', 'pug');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(_dirname, 'public')));
app.use('/', _home["default"]);
app.use('/admin-dashboard', _adminDashboard["default"]);
app.use('/dashboard', _userDashboard["default"]);
app.use('/api', _mainRouter["default"]); // catch 404 and forward to error handler

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