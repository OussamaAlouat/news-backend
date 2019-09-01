"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCheckValidation = void 0;

var _check = require("express-validator/check");

var postCheckValidation = function postCheckValidation(req, res, next) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  next();
};

exports.postCheckValidation = postCheckValidation;