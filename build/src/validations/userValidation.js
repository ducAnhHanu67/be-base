"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _validators = require("../utils/validators");
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            password: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message(_validators.PASSWORD_RULE_MESSAGE)
          });
          _context.prev = 1;
          _context.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          next(new _ApiError["default"](422, new Error(_context.t0).message));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function createNew(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var verifyAccount = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            token: _joi["default"].string().required()
          });
          _context2.prev = 1;
          _context2.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          next(new _ApiError["default"](422, new Error(_context2.t0).message));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function verifyAccount(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            password: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message(_validators.PASSWORD_RULE_MESSAGE)
          });
          _context3.prev = 1;
          _context3.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          next(new _ApiError["default"](422, new Error(_context3.t0).message));
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return function login(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          correctCondition = _joi["default"].object({
            displayName: _joi["default"].string().trim().strict(),
            address: _joi["default"].string().trim().max(500).allow('').messages({
              'string.max': 'Address must not exceed 500 characters'
            }),
            current_password: _joi["default"].string().pattern(_validators.PASSWORD_RULE).message("current_password: ".concat(_validators.PASSWORD_RULE_MESSAGE)),
            new_password: _joi["default"].string().pattern(_validators.PASSWORD_RULE).message("new_password: ".concat(_validators.PASSWORD_RULE_MESSAGE))
          });
          _context4.prev = 1;
          _context4.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
          });
        case 4:
          next();
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          next(new _ApiError["default"](422, new Error(_context4.t0).message));
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var googleLogin = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          correctCondition = _joi["default"].object({
            googleToken: _joi["default"].string().required().messages({
              'string.empty': 'Google token is required',
              'any.required': 'Google token is required'
            })
          });
          _context5.prev = 1;
          _context5.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          next(new _ApiError["default"](422, new Error(_context5.t0).message));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 7]]);
  }));
  return function googleLogin(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

// Admin Validations
var createUserByAdmin = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().required().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            password: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message(_validators.PASSWORD_RULE_MESSAGE),
            userName: _joi["default"].string().trim().min(2).max(50).messages({
              'string.min': 'User name must be at least 2 characters',
              'string.max': 'User name must not exceed 50 characters'
            }),
            avatar: _joi["default"].string().uri().allow(null, ''),
            address: _joi["default"].string().trim().max(500).allow('').messages({
              'string.max': 'Address must not exceed 500 characters'
            }),
            isActive: _joi["default"]["boolean"](),
            role: _joi["default"].string().valid('CLIENT', 'USER', 'ADMIN').messages({
              'any.only': 'Role must be CLIENT, USER or ADMIN'
            })
          });
          _context6.prev = 1;
          _context6.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](1);
          next(new _ApiError["default"](422, new Error(_context6.t0).message));
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 7]]);
  }));
  return function createUserByAdmin(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUserByAdmin = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          correctCondition = _joi["default"].object({
            email: _joi["default"].string().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            password: _joi["default"].string().pattern(_validators.PASSWORD_RULE).message(_validators.PASSWORD_RULE_MESSAGE),
            userName: _joi["default"].string().trim().min(2).max(50).messages({
              'string.min': 'User name must be at least 2 characters',
              'string.max': 'User name must not exceed 50 characters'
            }),
            avatar: _joi["default"].string().uri().allow(null, ''),
            address: _joi["default"].string().trim().max(500).allow('').messages({
              'string.max': 'Address must not exceed 500 characters'
            }),
            isActive: _joi["default"]["boolean"](),
            role: _joi["default"].string().valid('CLIENT', 'USER', 'ADMIN').messages({
              'any.only': 'Role must be CLIENT, USER or ADMIN'
            })
          });
          _context7.prev = 1;
          _context7.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: false
          });
        case 4:
          next();
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](1);
          next(new _ApiError["default"](422, new Error(_context7.t0).message));
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 7]]);
  }));
  return function updateUserByAdmin(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var validateUserId = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          correctCondition = _joi["default"].object({
            userId: _joi["default"].number().integer().positive().required().messages({
              'number.base': 'User ID must be a number',
              'number.integer': 'User ID must be an integer',
              'number.positive': 'User ID must be positive',
              'any.required': 'User ID is required'
            })
          });
          _context8.prev = 1;
          _context8.next = 4;
          return correctCondition.validateAsync(req.params, {
            abortEarly: false
          });
        case 4:
          next();
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](1);
          next(new _ApiError["default"](422, new Error(_context8.t0).message));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 7]]);
  }));
  return function validateUserId(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var updateProfile = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          correctCondition = _joi["default"].object({
            userName: _joi["default"].string().trim().min(2).max(50).messages({
              'string.min': 'User name must be at least 2 characters',
              'string.max': 'User name must not exceed 50 characters'
            }),
            email: _joi["default"].string().pattern(_validators.EMAIL_RULE).message(_validators.EMAIL_RULE_MESSAGE),
            address: _joi["default"].string().trim().max(500).allow('').messages({
              'string.max': 'Address must not exceed 500 characters'
            }),
            avatar: _joi["default"].string().uri().allow('').messages({
              'string.uri': 'Avatar must be a valid URL'
            })
          });
          _context9.prev = 1;
          _context9.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
          });
        case 4:
          next();
          _context9.next = 10;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](1);
          next(new _ApiError["default"](422, new Error(_context9.t0).message));
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 7]]);
  }));
  return function updateProfile(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var updatePassword = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          correctCondition = _joi["default"].object({
            currentPassword: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message("Current password: ".concat(_validators.PASSWORD_RULE_MESSAGE)),
            newPassword: _joi["default"].string().required().pattern(_validators.PASSWORD_RULE).message("New password: ".concat(_validators.PASSWORD_RULE_MESSAGE))
          });
          _context10.prev = 1;
          _context10.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](1);
          next(new _ApiError["default"](422, new Error(_context10.t0).message));
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 7]]);
  }));
  return function updatePassword(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var userValidation = exports.userValidation = {
  createNew: createNew,
  verifyAccount: verifyAccount,
  login: login,
  update: update,
  googleLogin: googleLogin,
  // Admin validations
  createUserByAdmin: createUserByAdmin,
  updateUserByAdmin: updateUserByAdmin,
  validateUserId: validateUserId,
  // New user profile validations
  updateProfile: updateProfile,
  updatePassword: updatePassword
};