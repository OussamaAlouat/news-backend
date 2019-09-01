"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var index = function index(req, res) {
  var response = {
    data: {
      message: 'Server up!!'
    }
  };
  res.json(response);
};

exports.index = index;