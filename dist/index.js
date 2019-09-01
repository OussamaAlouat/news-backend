"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

var _db = _interopRequireDefault(require("./db"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); //CONFIG ---------------

exports.app = app;
var config = (0, _config.default)(app);
app.use((0, _bodyParser.default)());
app.use((0, _cors.default)()); //DATABASE CONNECTION

_db.default.connect(config); //ROUTES----------------


app.use('/', (0, _routes.default)()); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = Error('Not Found');
  err.status = 404;
  next(err);
}); // catch 500 internal sever error

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json(err);
});
app.listen(process.env.PORT || config.port, function () {
  var listeningPort = process.env.PORT || config.port;
  console.log('Server listening on port ' + listeningPort);
});