"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOneDocument = exports.removeOneDocument = exports.getOneDocument = exports.getAllDocuments = exports.postDocument = void 0;

var _document = _interopRequireDefault(require("../model/document"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postDocument = function postDocument(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      description = _req$body.description,
      date = _req$body.date,
      content = _req$body.content,
      author = _req$body.author,
      archiveDate = _req$body.archiveDate,
      isArchived = _req$body.isArchived; //If there are one document with the same title, description, content and author is because is the same document that
  //we will put in our database.

  _document.default.find({
    title: title,
    description: description,
    author: author,
    content: content
  }).then(function (response) {
    if (response.length > 0) {
      var errorMessage = 'This document already exists on database';
      res.status(409).json({
        message: errorMessage
      });
    } else {
      var newDocument = new _document.default({
        title: title,
        description: description,
        date: date,
        content: content,
        author: author,
        archiveDate: archiveDate,
        isArchived: isArchived
      });
      newDocument.save(function (err, data) {
        if (err) {
          res.json(err);
        } else {
          var returnData = {
            data: data,
            message: 'Document created correctly'
          };
          res.status(201).json(returnData);
        }
      });
    }
  });
};

exports.postDocument = postDocument;

var getAllDocuments = function getAllDocuments(req, res) {
  var state = req.query.state;

  if (!state) {
    _document.default.find().then(function (response) {
      res.status(200).json({
        data: response
      });
    });
  } else {
    var petition = state === 'archived';

    _document.default.find({
      isArchived: petition
    }).then(function (response) {
      res.status(200).json({
        data: response
      });
    });
  }
};

exports.getAllDocuments = getAllDocuments;

var getOneDocument = function getOneDocument(req, res) {
  var id = req.body.id;

  _document.default.findById(id).then(function (result) {
    res.status(200).json({
      data: result
    });
  }).catch(function (err) {
    res.status(200).json({
      data: []
    });
  });
};

exports.getOneDocument = getOneDocument;

var removeOneDocument = function removeOneDocument(req, res) {
  var id = req.query.id;

  _document.default.findByIdAndRemove(id).then(function (result) {
    var response = {
      message: 'Document was delete',
      document_id: result._id
    };
    res.status(200).json({
      response: response
    });
  }).catch(function (err) {
    res.status(200).json({
      message: 'Document not found'
    });
  });
};

exports.removeOneDocument = removeOneDocument;

var updateOneDocument = function updateOneDocument(req, res) {
  var _req$body2 = req.body,
      id = _req$body2.id,
      title = _req$body2.title,
      description = _req$body2.description,
      content = _req$body2.content,
      archiveDate = _req$body2.archiveDate,
      isArchived = _req$body2.isArchived;

  _document.default.findByIdAndUpdate(id, {
    title: title,
    description: description,
    content: content,
    archiveDate: archiveDate,
    isArchived: isArchived
  }).then(function (result) {
    var response = {
      message: "Document updated"
    };
    res.status(200).json(response);
  }).catch(function (err) {
    var response = {
      message: "Document not found"
    };
    res.status(200).json(response);
  });
};

exports.updateOneDocument = updateOneDocument;