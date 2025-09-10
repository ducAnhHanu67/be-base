"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CONNECT_DB = exports.CLOSE_DB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _environment = require("./environment");
// Tạo đối tượng Sequelize với cấu hình timezone và chuyển đổi bằng
var sequelize = new _sequelize.Sequelize(_environment.env.DATABASE_NAME, 'root', _environment.env.DATABASE_PASSWORD, {
  host: _environment.env.APP_HOST,
  port: _environment.env.DATABASE_PORT,
  dialect: 'mysql',
  timezone: '+07:00',
  dialectOptions: {
    dateStrings: true,
    // Buộc trả về date/time như string
    typeCast: function typeCast(field, next) {
      // Chỉ typeCast cho DATETIME/TIMESTAMP
      if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
        return field.string();
      }
      return next();
    }
  }
});

// Hàm kiểm tra kết nối
var CONNECT_DB = exports.CONNECT_DB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return sequelize.authenticate();
        case 3:
          console.log('Connection has been established successfully.');
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Unable to connect to the database:', _context.t0);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function CONNECT_DB() {
    return _ref.apply(this, arguments);
  };
}();
var CLOSE_DB = exports.CLOSE_DB = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return sequelize.close();
        case 3:
          console.log('Database connection closed successfully.');
          _context2.next = 9;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error('Error while closing database connection:', _context2.t0);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function CLOSE_DB() {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = sequelize;