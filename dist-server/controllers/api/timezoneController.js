"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimezones = void 0;

var _knex = _interopRequireDefault(require("../../database/knex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getTimezones = function getTimezones(req, res) {
  _knex["default"].pluck('name').from('pg_timezone_names')["catch"](function (error) {
    console.log('Query error');
  }).then(function (timezones) {
    return res.json(timezones);
  })["catch"](function (error) {
    console.log('Error on data');
  });
};

exports.getTimezones = getTimezones;