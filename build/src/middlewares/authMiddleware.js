"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _JwtProvider = require("../providers/JwtProvider");
var _environment = require("../config/environment");
var _User = _interopRequireDefault(require("../models/User"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
/**
 * Middleware xác thực người dùng đã đăng nhập
 * Kiểm tra JWT token từ cookie và gán thông tin user vào req.user
 */
var isAuthorized = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$cookies, clientAccessToken, accessTokenDecoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Lấy accessToken từ cookie
          clientAccessToken = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.accessToken; // Nếu không có token, trả về lỗi unauthorized
          if (clientAccessToken) {
            _context.next = 4;
            break;
          }
          throw new _ApiError["default"](401, 'Unauthorized! (token not found)');
        case 4:
          _context.next = 6;
          return _JwtProvider.JwtProvider.verifyToken(clientAccessToken, _environment.env.ACCESS_TOKEN_SECRET_SIGNATURE);
        case 6:
          accessTokenDecoded = _context.sent;
          _context.next = 9;
          return _User["default"].findOne({
            where: {
              id: accessTokenDecoded.id,
              email: accessTokenDecoded.email
            }
          });
        case 9:
          user = _context.sent;
          if (user) {
            _context.next = 12;
            break;
          }
          throw new _ApiError["default"](401, 'User not found!');
        case 12:
          // Gán thông tin user vào req để các middleware/controller tiếp theo sử dụng
          req.user = {
            id: user.id,
            email: user.email,
            userName: user.userName,
            avatar: user.avatar,
            address: user.address,
            role: user.role,
            isActive: user.isActive
          };

          // Lưu thông tin decode để backward compatibility
          req.jwtDecoded = accessTokenDecoded;
          next();
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          // Nếu là lỗi JWT (token hết hạn, không hợp lệ, etc.)
          if (_context.t0.name === 'JsonWebTokenError') {
            next(new _ApiError["default"](401, 'Invalid token!'));
          } else if (_context.t0.name === 'TokenExpiredError') {
            next(new _ApiError["default"](410, 'Need to refresh token.'));
          } else {
            next(_context.t0);
          }
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function isAuthorized(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Middleware kiểm tra quyền admin
 * Phải được sử dụng sau middleware isAuthorized
 */
var isAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (req.user) {
            _context2.next = 3;
            break;
          }
          throw new _ApiError["default"](401, 'Unauthorized! Please login first.');
        case 3:
          if (!(req.user.role !== 'ADMIN')) {
            _context2.next = 5;
            break;
          }
          throw new _ApiError["default"](403, 'Forbidden! Admin access required.');
        case 5:
          next();
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Middleware kiểm tra quyền admin staff (ADMIN hoặc USER)
 * Phải được sử dụng sau middleware isAuthorized
 */
var isAdminOrUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (req.user) {
            _context3.next = 3;
            break;
          }
          throw new _ApiError["default"](401, 'Unauthorized! Please login first.');
        case 3:
          if (!(req.user.role !== 'ADMIN' && req.user.role !== 'USER')) {
            _context3.next = 5;
            break;
          }
          throw new _ApiError["default"](403, 'Forbidden! Admin or User access required.');
        case 5:
          next();
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function isAdminOrUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var authMiddleware = exports.authMiddleware = {
  isAuthorized: isAuthorized,
  isAdmin: isAdmin,
  isAdminOrUser: isAdminOrUser
};