"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controller = require("../controller");

var _document = require("../controller/document");

var _check = require("express-validator/check");

var _validation = require("../middleware/validation");

var _default = function _default() {
  var routes = (0, _express.Router)();
  routes.get('/', function (req, res) {
    return (0, _controller.index)(req, res);
  });
  routes.post('/document', [(0, _check.check)('title').isLength({
    min: 4
  }), (0, _check.check)('description').isLength({
    min: 5
  }), (0, _check.check)('date').exists(), (0, _check.check)('content').isLength({
    min: 5
  }), (0, _check.check)('author').isLength({
    min: 5
  }), (0, _check.check)('archiveDate').exists({
    checkNull: false
  }), (0, _check.check)('isArchived').exists({
    checkFalsy: false
  })], function (req, res, next) {
    return (0, _validation.postCheckValidation)(req, res, next);
  }, function (req, res) {
    return (0, _document.postDocument)(req, res);
  });
  routes.get('/documents', _document.getAllDocuments);
  routes.get('/document', [(0, _check.check)('id').isString()], function (req, res, next) {
    return (0, _validation.postCheckValidation)(req, res, next);
  }, function (req, res) {
    return (0, _document.getOneDocument)(req, res);
  });
  routes.delete('/document', [(0, _check.check)('id').isString()], function (req, res, next) {
    return (0, _validation.postCheckValidation)(req, res, next);
  }, function (req, res) {
    return (0, _document.removeOneDocument)(req, res);
  });
  routes.put('/document', [(0, _check.check)('id').isString(), (0, _check.check)('title').isLength({
    min: 4
  }), (0, _check.check)('description').isLength({
    min: 5
  }), (0, _check.check)('content').isLength({
    min: 5
  }), (0, _check.check)('archiveDate').exists({
    checkNull: false
  }), (0, _check.check)('isArchived').exists({
    checkFalsy: false
  })], function (req, res, next) {
    return (0, _validation.postCheckValidation)(req, res, next);
  }, function (req, res) {
    return (0, _document.updateOneDocument)(req, res);
  });
  return routes;
};

exports.default = _default;