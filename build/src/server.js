"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _environment = require("./config/environment");
var _cors = _interopRequireDefault(require("cors"));
var _cors2 = require("./config/cors");
var _mySQL = require("./config/mySQL");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _asyncExitHook = _interopRequireDefault(require("async-exit-hook"));
var _v = require("./routes/v1");
var _errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _sockets = require("./sockets");
var START_SERVER = function START_SERVER() {
  var app = (0, _express["default"])();

  // Fix Cache from disk của ExpressJS
  // https://stackoverflow.com/a/53240717/832417
  app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.use((0, _cookieParser["default"])());

  // Handle CORS
  app.use((0, _cors["default"])(_cors2.corsOptions));

  // Enable req.body json data
  app.use(_express["default"].json());

  // Use APIs V1
  app.use('/v1', _v.APIs_V1);

  // Middleware xử lý lỗi tập trung
  app.use(_errorHandlingMiddleware.errorHandlingMiddleware);
  app.use('/images', _express["default"]["static"](_path["default"].join(__dirname, '..', 'public', 'images')));
  var server = _http["default"].createServer(app);
  var io = new _socket.Server(server, {
    cors: {
      origin: '*'
    }
  });
  (0, _sockets.initSocketServer)(io); // 👉 Gọi logic socket bạn đã viết

  server.listen(_environment.env.APP_PORT, function () {
    // eslint-disable-next-line no-console
    console.log("3. Hi ".concat(_environment.env.AUTHOR, ", Back-end Server is running successfully at ").concat(_environment.env.APP_HOST, ":").concat(_environment.env.APP_PORT));
  });


};
(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        console.log('1. Connecting to MySQL...');
        _context.next = 4;
        return (0, _mySQL.CONNECT_DB)();
      case 4:
        console.log('2. Connected to MySQL');

        // Khởi động server back-end sau khi đã connect database thành công
        START_SERVER();
        _context.next = 12;
        break;
      case 8:
        _context.prev = 8;
        _context.t0 = _context["catch"](0);
        console.error(_context.t0);
        process.exit(0);
      case 12:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 8]]);
}))();