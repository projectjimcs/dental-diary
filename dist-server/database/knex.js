"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = require("../config.js");

var config = require('../../knexfile.js')[_config.environment];

var knex = require('knex')(config);

var _default = knex;
exports["default"] = _default;