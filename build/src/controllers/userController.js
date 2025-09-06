"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userService = require("../services/userService");
var _ms = _interopRequireDefault(require("ms"));
var _formatters = require("../utils/formatters");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var createdUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userService.userService.register(req.body);
        case 3:
          createdUser = _context.sent;
          res.status(201).json(createdUser);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createNew(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var verifyAccount = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _userService.userService.verifyAccount(req.body);
        case 3:
          result = _context2.sent;
          res.status(200).json(result);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next();
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function verifyAccount(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _userService.userService.login(req.body);
        case 3:
          result = _context3.sent;
          /**
           * Xử lý trả về HTTP-only cookie cho phía trình duyệt
           * Về cái maxAge và thư viện ms: https://expressjs.com/en/api.html
           * Đối với cái maxAge - thời gian sống của Cookie thì chúng ta sẽ để tối đa 14 ngày, tùy dự án.
           * Lưu ý thời gian sống của cookie khác với cái thời gian sống của token
           */
          res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: (0, _ms["default"])('14 days')
          });
          res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: (0, _ms["default"])('14 days')
          });
          res.status(200).json((0, _formatters.pickUser)(result));
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function login(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var logout = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          try {
            // Xóa cookie – đơn giản là làm ngược lại so với việc gán cookie ở hàm login
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({
              loggedOut: true
            });
          } catch (_unused2) {
            next();
          }
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function logout(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var refreshToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$cookies, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _userService.userService.refreshToken((_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.refreshToken);
        case 3:
          result = _context5.sent;
          res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: (0, _ms["default"])('14 days')
          });
          res.status(200).json(result);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(new _ApiError["default"](403, 'Please Sign In! (Error from refresh Token)'));
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function refreshToken(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var getProfile = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, userProfile;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.jwtDecoded.id;
          _context6.next = 4;
          return _userService.userService.getProfile(userId);
        case 4:
          userProfile = _context6.sent;
          res.status(200).json(userProfile);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getProfile(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var userId, userAvatarFile, updatedUser;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.jwtDecoded.id;
          userAvatarFile = req.file; // console.log('Controller > userAvatarFile: ', userAvatarFile)
          _context7.next = 5;
          return _userService.userService.update(userId, req.body, userAvatarFile);
        case 5:
          updatedUser = _context7.sent;
          res.status(200).json(updatedUser);
          _context7.next = 12;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          next();
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function update(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var googleLogin = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var googleToken, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          googleToken = req.body.googleToken;
          if (googleToken) {
            _context8.next = 4;
            break;
          }
          throw new _ApiError["default"](400, 'Google token is required');
        case 4:
          _context8.next = 6;
          return _userService.userService.googleLogin(googleToken);
        case 6:
          result = _context8.sent;
          // Set cookies như login thông thường
          res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: (0, _ms["default"])('14 days')
          });
          res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: (0, _ms["default"])('14 days')
          });
          res.status(200).json((0, _formatters.pickUser)(result));
          _context8.next = 15;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 15:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 12]]);
  }));
  return function googleLogin(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

// Admin Controllers
var getAllUsers = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, _req$query$search, search, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit, _req$query$search = _req$query.search, search = _req$query$search === void 0 ? '' : _req$query$search;
          _context9.next = 4;
          return _userService.userService.getAllUsers(page, limit, search);
        case 4:
          result = _context9.sent;
          res.status(200).json(result);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function getAllUsers(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var createUserByAdmin = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var createdUser;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _userService.userService.createUserByAdmin(req.body);
        case 3:
          createdUser = _context10.sent;
          res.status(201).json({
            message: 'User created successfully',
            user: createdUser
          });
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function createUserByAdmin(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var updateUserByAdmin = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var userId, updatedUser;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          userId = req.params.userId;
          _context11.next = 4;
          return _userService.userService.updateUserByAdmin(userId, req.body);
        case 4:
          updatedUser = _context11.sent;
          res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
          });
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return function updateUserByAdmin(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          userId = req.params.userId;
          _context12.next = 4;
          return _userService.userService.deleteUser(userId);
        case 4:
          result = _context12.sent;
          res.status(200).json(result);
          _context12.next = 11;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          next(_context12.t0);
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function deleteUser(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();
var updateProfile = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var userId, updatedUser;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          userId = req.jwtDecoded.id;
          _context13.next = 4;
          return _userService.userService.updateProfile(userId, req.body);
        case 4:
          updatedUser = _context13.sent;
          res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
          });
          _context13.next = 11;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function updateProfile(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();
var updatePassword = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          userId = req.jwtDecoded.id;
          _context14.next = 4;
          return _userService.userService.updatePassword(userId, req.body);
        case 4:
          result = _context14.sent;
          res.status(200).json(result);
          _context14.next = 11;
          break;
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          next(_context14.t0);
        case 11:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 8]]);
  }));
  return function updatePassword(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();
var userController = exports.userController = {
  createNew: createNew,
  verifyAccount: verifyAccount,
  login: login,
  logout: logout,
  refreshToken: refreshToken,
  update: update,
  googleLogin: googleLogin,
  // Admin functions
  getAllUsers: getAllUsers,
  createUserByAdmin: createUserByAdmin,
  updateUserByAdmin: updateUserByAdmin,
  deleteUser: deleteUser,
  // New user profile functions
  updateProfile: updateProfile,
  updatePassword: updatePassword,
  getProfile: getProfile
};