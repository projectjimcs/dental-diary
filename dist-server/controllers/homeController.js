"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var index = function index(req, res) {
  res.render('index', {
    title: 'Dental Diary'
  });
};

exports.index = index;