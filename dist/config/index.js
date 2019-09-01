"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var config = function config(app) {
  var CONFIG_ENV = {
    'development': './development',
    'production': './production',
    'test': './test'
  };
  return require(CONFIG_ENV[app.get('env')]).default;
};

var _default = config;
exports.default = _default;