"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _User = _interopRequireDefault(require("../models/User"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _uuid = require("uuid");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _JwtProvider = require("../providers/JwtProvider");
var _formatters = require("../utils/formatters");
var _environment = require("../config/environment");
var _googleAuthLibrary = require("google-auth-library");
var _sequelize = require("sequelize");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(reqBody) {
    var existUser, nameFromEmail, newUser, createdUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 3:
          existUser = _context.sent;
          if (!existUser) {
            _context.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Email already exists!');
        case 6:
          nameFromEmail = reqBody.email.split('@')[0];
          newUser = {
            email: reqBody.email,
            password: _bcryptjs["default"].hashSync(reqBody.password, 8),
            // Tham số thứ 2 là độ phức tạp, giá trị càng cao thì băm càng lâu
            userName: nameFromEmail,
            verifyToken: (0, _uuid.v4)(),
            isActive: false,
            role: 'CLIENT'
          };
          _context.next = 10;
          return _User["default"].create(newUser);
        case 10:
          createdUser = _context.sent;
          return _context.abrupt("return", createdUser.toJSON());
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0.message);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(reqBody) {
    var existUser, userInfo, accessToken, _refreshToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 3:
          existUser = _context2.sent;
          if (existUser) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](406, 'Email hoặc mật khẩu không chính xác!');
        case 6:
          if (_bcryptjs["default"].compareSync(reqBody.password, existUser.password)) {
            _context2.next = 8;
            break;
          }
          throw new _ApiError["default"](406, 'Email hoặc mật khẩu không chính xác!');
        case 8:
          // Tạo token đăng nhập trả về phía FE
          // Tạo thông tin đính kèm JWT token bao gồm _id và email user
          userInfo = {
            id: existUser.id,
            email: existUser.email
          }; // Tạo ra 2 loại token
          _context2.next = 11;
          return _JwtProvider.JwtProvider.generateToken(userInfo, _environment.env.ACCESS_TOKEN_SECRET_SIGNATURE, 15
          // env.ACCESS_TOKEN_LIFE
          );
        case 11:
          accessToken = _context2.sent;
          _context2.next = 14;
          return _JwtProvider.JwtProvider.generateToken(userInfo, _environment.env.REFRESH_TOKEN_SECRET_SIGNATURE,
          // 15
          _environment.env.REFRESH_TOKEN_LIFE);
        case 14:
          _refreshToken = _context2.sent;
          return _context2.abrupt("return", _objectSpread({
            accessToken: accessToken,
            refreshToken: _refreshToken
          }, (0, _formatters.pickUser)(existUser)));
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getProfile = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _User["default"].findByPk(userId, {
            attributes: {
              exclude: ['password', 'verifyToken']
            }
          });
        case 3:
          user = _context3.sent;
          if (user) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 6:
          return _context3.abrupt("return", (0, _formatters.pickUser)(user));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getProfile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var refreshToken = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(clientRefreshToken) {
    var refreshTokenDecoded, userInfo, accessToken;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _JwtProvider.JwtProvider.verifyToken(clientRefreshToken, _environment.env.REFRESH_TOKEN_SECRET_SIGNATURE);
        case 3:
          refreshTokenDecoded = _context4.sent;
          // Đoạn này chỉ lấy thông tin unique để tạo accessToken mới
          userInfo = {
            id: refreshTokenDecoded.id,
            email: refreshTokenDecoded.email
          }; // Tạo accessToken mới
          _context4.next = 7;
          return _JwtProvider.JwtProvider.generateToken(userInfo, _environment.env.ACCESS_TOKEN_SECRET_SIGNATURE,
          // Chuỗi ký accessToken
          // 5
          _environment.env.ACCESS_TOKEN_LIFE // Thời gian sống của accessToken
          );
        case 7:
          accessToken = _context4.sent;
          return _context4.abrupt("return", {
            accessToken: accessToken
          });
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function refreshToken(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var googleLogin = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(googleToken) {
    var client, ticket, payload, email, name, picture, existUser, newUser, userInfo, accessToken, _refreshToken2;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (_environment.env.GOOGLE_CLIENT_ID) {
            _context5.next = 3;
            break;
          }
          throw new _ApiError["default"](500, 'Google Client ID not configured');
        case 3:
          client = new _googleAuthLibrary.OAuth2Client(_environment.env.GOOGLE_CLIENT_ID); // Xác thực Google token
          _context5.next = 6;
          return client.verifyIdToken({
            idToken: googleToken,
            audience: _environment.env.GOOGLE_CLIENT_ID
          });
        case 6:
          ticket = _context5.sent;
          payload = ticket.getPayload();
          email = payload.email, name = payload.name, picture = payload.picture;
          if (email) {
            _context5.next = 11;
            break;
          }
          throw new _ApiError["default"](400, 'Cannot get email from Google token');
        case 11:
          _context5.next = 13;
          return _User["default"].findOne({
            where: {
              email: email
            }
          });
        case 13:
          existUser = _context5.sent;
          if (existUser) {
            _context5.next = 19;
            break;
          }
          newUser = {
            email: email,
            password: _bcryptjs["default"].hashSync((0, _uuid.v4)(), 8),
            // Random password cho Google user
            userName: name || email.split('@')[0],
            avatar: picture || null,
            verifyToken: 'google_verified',
            isActive: true,
            // Google user mặc định đã active
            role: 'CLIENT'
          };
          _context5.next = 18;
          return _User["default"].create(newUser);
        case 18:
          existUser = _context5.sent;
        case 19:
          // Tạo token đăng nhập
          userInfo = {
            id: existUser.id,
            email: existUser.email
          };
          _context5.next = 22;
          return _JwtProvider.JwtProvider.generateToken(userInfo, _environment.env.ACCESS_TOKEN_SECRET_SIGNATURE, _environment.env.ACCESS_TOKEN_LIFE);
        case 22:
          accessToken = _context5.sent;
          _context5.next = 25;
          return _JwtProvider.JwtProvider.generateToken(userInfo, _environment.env.REFRESH_TOKEN_SECRET_SIGNATURE, _environment.env.REFRESH_TOKEN_LIFE);
        case 25:
          _refreshToken2 = _context5.sent;
          return _context5.abrupt("return", _objectSpread({
            accessToken: accessToken,
            refreshToken: _refreshToken2
          }, (0, _formatters.pickUser)(existUser)));
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](0);
          if (!(_context5.t0 instanceof _ApiError["default"])) {
            _context5.next = 33;
            break;
          }
          throw _context5.t0;
        case 33:
          throw new _ApiError["default"](401, 'Invalid Google token');
        case 34:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 29]]);
  }));
  return function googleLogin(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, reqBody, userAvatarFile) {
    var existUser, updateData, emailExists, _yield$import, UploadImageProvider, uploadResult, updatedUser;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _User["default"].findByPk(userId);
        case 3:
          existUser = _context6.sent;
          if (existUser) {
            _context6.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 6:
          updateData = {};
          if (reqBody.userName) updateData.userName = reqBody.userName;
          if (reqBody.address !== undefined) updateData.address = reqBody.address;
          if (!(reqBody.email && reqBody.email !== existUser.email)) {
            _context6.next = 16;
            break;
          }
          _context6.next = 12;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 12:
          emailExists = _context6.sent;
          if (!emailExists) {
            _context6.next = 15;
            break;
          }
          throw new _ApiError["default"](409, 'Email already exists!');
        case 15:
          updateData.email = reqBody.email;
        case 16:
          if (!userAvatarFile) {
            _context6.next = 25;
            break;
          }
          _context6.next = 19;
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("../providers/UploadImageProvider"));
          });
        case 19:
          _yield$import = _context6.sent;
          UploadImageProvider = _yield$import.UploadImageProvider;
          _context6.next = 23;
          return UploadImageProvider.streamUpload(userAvatarFile.buffer, 'users');
        case 23:
          uploadResult = _context6.sent;
          updateData.avatar = uploadResult.secure_url;
        case 25:
          _context6.next = 27;
          return _User["default"].update(updateData, {
            where: {
              id: userId
            }
          });
        case 27:
          _context6.next = 29;
          return _User["default"].findByPk(userId, {
            attributes: {
              exclude: ['password', 'verifyToken']
            }
          });
        case 29:
          updatedUser = _context6.sent;
          return _context6.abrupt("return", (0, _formatters.pickUser)(updatedUser));
        case 33:
          _context6.prev = 33;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;
        case 36:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 33]]);
  }));
  return function update(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

// Admin Functions
var getAllUsers = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var page,
      limit,
      searchTerm,
      offset,
      whereClause,
      _yield$User$findAndCo,
      count,
      rows,
      _args7 = arguments;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          page = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
          limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 10;
          searchTerm = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : '';
          _context7.prev = 3;
          offset = (page - 1) * limit;
          whereClause = {};
          if (searchTerm) {
            whereClause[_sequelize.Op.or] = [{
              email: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchTerm, "%"))
            }, {
              userName: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(searchTerm, "%"))
            }];
          }
          _context7.next = 9;
          return _User["default"].findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
            attributes: {
              exclude: ['password', 'verifyToken']
            }
          });
        case 9:
          _yield$User$findAndCo = _context7.sent;
          count = _yield$User$findAndCo.count;
          rows = _yield$User$findAndCo.rows;
          return _context7.abrupt("return", {
            data: rows,
            count: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
          });
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](3);
          throw _context7.t0;
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 15]]);
  }));
  return function getAllUsers() {
    return _ref7.apply(this, arguments);
  };
}();
var createUserByAdmin = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(reqBody) {
    var existUser, newUser, createdUser, userResponse;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 3:
          existUser = _context8.sent;
          if (!existUser) {
            _context8.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Email already exists!');
        case 6:
          newUser = {
            email: reqBody.email,
            password: _bcryptjs["default"].hashSync(reqBody.password, 8),
            userName: reqBody.userName || reqBody.email.split('@')[0],
            avatar: reqBody.avatar || null,
            address: reqBody.address || null,
            verifyToken: (0, _uuid.v4)(),
            isActive: reqBody.isActive !== undefined ? reqBody.isActive : true,
            role: reqBody.role || 'CLIENT'
          };
          _context8.next = 9;
          return _User["default"].create(newUser);
        case 9:
          createdUser = _context8.sent;
          userResponse = createdUser.toJSON();
          delete userResponse.password;
          delete userResponse.verifyToken;
          return _context8.abrupt("return", userResponse);
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 16]]);
  }));
  return function createUserByAdmin(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUserByAdmin = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(userId, reqBody) {
    var existUser, emailExists, updateData, validRoles, updatedUser;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _User["default"].findByPk(userId);
        case 3:
          existUser = _context9.sent;
          if (existUser) {
            _context9.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 6:
          if (!(reqBody.email && reqBody.email !== existUser.email)) {
            _context9.next = 12;
            break;
          }
          _context9.next = 9;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 9:
          emailExists = _context9.sent;
          if (!emailExists) {
            _context9.next = 12;
            break;
          }
          throw new _ApiError["default"](409, 'Email already exists!');
        case 12:
          updateData = {};
          if (reqBody.email) updateData.email = reqBody.email;
          if (reqBody.userName) updateData.userName = reqBody.userName;
          if (reqBody.avatar) updateData.avatar = reqBody.avatar;
          if (reqBody.address !== undefined) updateData.address = reqBody.address;
          if (reqBody.isActive !== undefined) updateData.isActive = reqBody.isActive;
          if (!reqBody.role) {
            _context9.next = 23;
            break;
          }
          validRoles = ['CLIENT', 'USER', 'ADMIN'];
          if (validRoles.includes(reqBody.role)) {
            _context9.next = 22;
            break;
          }
          throw new _ApiError["default"](400, 'Invalid role! Valid roles are: CLIENT, USER, ADMIN');
        case 22:
          updateData.role = reqBody.role;
        case 23:
          if (reqBody.password) {
            updateData.password = _bcryptjs["default"].hashSync(reqBody.password, 8);
          }
          _context9.next = 26;
          return _User["default"].update(updateData, {
            where: {
              id: userId
            }
          });
        case 26:
          _context9.next = 28;
          return _User["default"].findByPk(userId, {
            attributes: {
              exclude: ['password', 'verifyToken']
            }
          });
        case 28:
          updatedUser = _context9.sent;
          return _context9.abrupt("return", updatedUser);
        case 32:
          _context9.prev = 32;
          _context9.t0 = _context9["catch"](0);
          throw _context9.t0;
        case 35:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 32]]);
  }));
  return function updateUserByAdmin(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();
var deleteUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(userId) {
    var existUser;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _User["default"].findByPk(userId);
        case 3:
          existUser = _context10.sent;
          if (existUser) {
            _context10.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 6:
          _context10.next = 8;
          return _User["default"].destroy({
            where: {
              id: userId
            }
          });
        case 8:
          return _context10.abrupt("return", {
            message: 'User has been deleted permanently'
          });
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function deleteUser(_x12) {
    return _ref10.apply(this, arguments);
  };
}();
var updateProfile = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(userId, reqBody) {
    var existUser, updateData, emailExists, updatedUser;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _User["default"].findByPk(userId);
        case 3:
          existUser = _context11.sent;
          if (existUser) {
            _context11.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 6:
          updateData = {};
          if (reqBody.userName) {
            updateData.userName = reqBody.userName;
          }
          if (reqBody.address !== undefined) {
            updateData.address = reqBody.address;
          }
          if (reqBody.avatar) {
            updateData.avatar = reqBody.avatar;
          }
          if (!(reqBody.email && reqBody.email !== existUser.email)) {
            _context11.next = 17;
            break;
          }
          _context11.next = 13;
          return _User["default"].findOne({
            where: {
              email: reqBody.email
            }
          });
        case 13:
          emailExists = _context11.sent;
          if (!emailExists) {
            _context11.next = 16;
            break;
          }
          throw new _ApiError["default"](409, 'Email already exists!');
        case 16:
          updateData.email = reqBody.email;
        case 17:
          _context11.next = 19;
          return _User["default"].update(updateData, {
            where: {
              id: userId
            }
          });
        case 19:
          _context11.next = 21;
          return _User["default"].findByPk(userId, {
            attributes: {
              exclude: ['password', 'verifyToken']
            }
          });
        case 21:
          updatedUser = _context11.sent;
          return _context11.abrupt("return", (0, _formatters.pickUser)(updatedUser));
        case 25:
          _context11.prev = 25;
          _context11.t0 = _context11["catch"](0);
          throw _context11.t0;
        case 28:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 25]]);
  }));
  return function updateProfile(_x13, _x14) {
    return _ref11.apply(this, arguments);
  };
}();
var updatePassword = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(userId, reqBody) {
    var currentPassword, newPassword, existUser, hashedNewPassword;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          currentPassword = reqBody.currentPassword, newPassword = reqBody.newPassword;
          _context12.next = 4;
          return _User["default"].findByPk(userId);
        case 4:
          existUser = _context12.sent;
          if (existUser) {
            _context12.next = 7;
            break;
          }
          throw new _ApiError["default"](404, 'User not found!');
        case 7:
          if (_bcryptjs["default"].compareSync(currentPassword, existUser.password)) {
            _context12.next = 9;
            break;
          }
          throw new _ApiError["default"](400, 'Current password is incorrect!');
        case 9:
          if (!_bcryptjs["default"].compareSync(newPassword, existUser.password)) {
            _context12.next = 11;
            break;
          }
          throw new _ApiError["default"](400, 'New password must be different from current password!');
        case 11:
          hashedNewPassword = _bcryptjs["default"].hashSync(newPassword, 8);
          _context12.next = 14;
          return _User["default"].update({
            password: hashedNewPassword
          }, {
            where: {
              id: userId
            }
          });
        case 14:
          return _context12.abrupt("return", {
            message: 'Password updated successfully'
          });
        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;
        case 20:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 17]]);
  }));
  return function updatePassword(_x15, _x16) {
    return _ref12.apply(this, arguments);
  };
}();
var userService = exports.userService = {
  register: register,
  login: login,
  refreshToken: refreshToken,
  googleLogin: googleLogin,
  update: update,
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