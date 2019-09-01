"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = function connect(config) {
  _mongoose.default.Promise = global.Promise;
  return _mongoose.default.connect(config.mongodb).then(function (db) {
    return db;
  }, function (err) {
    console.log(err);
  });
};

var disconnect = function disconnect() {
  _mongoose.default.disconnect();
};

var _default = {
  connect: connect,
  disconnect: disconnect
};
exports.default = _default;