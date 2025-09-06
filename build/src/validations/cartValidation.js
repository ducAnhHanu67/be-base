"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _httpStatusCodes = require("http-status-codes");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var addToCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition, errorMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            productId: _joi["default"].number().integer().min(1).required().messages({
              'number.base': 'Product ID phải là số',
              'number.integer': 'Product ID phải là số nguyên',
              'number.min': 'Product ID phải lớn hơn 0',
              'any.required': 'Product ID là bắt buộc'
            }),
            quantity: _joi["default"].number().integer().min(1).max(999).optional()["default"](1).messages({
              'number.base': 'Số lượng phải là số',
              'number.integer': 'Số lượng phải là số nguyên',
              'number.min': 'Số lượng phải lớn hơn 0',
              'number.max': 'Số lượng không được vượt quá 999'
            })
          });
          _context.prev = 1;
          _context.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          errorMessage = _context.t0.details.map(function (detail) {
            return detail.message;
          });
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function addToCart(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var updateCartItem = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition, errorMessage;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          correctCondition = _joi["default"].object({
            quantity: _joi["default"].number().integer().min(1).max(999).required().messages({
              'number.base': 'Số lượng phải là số',
              'number.integer': 'Số lượng phải là số nguyên',
              'number.min': 'Số lượng phải lớn hơn 0',
              'number.max': 'Số lượng không được vượt quá 999',
              'any.required': 'Số lượng là bắt buộc'
            })
          });
          _context2.prev = 1;
          _context2.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 11;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          errorMessage = _context2.t0.details.map(function (detail) {
            return detail.message;
          });
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 7]]);
  }));
  return function updateCartItem(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var applyCoupon = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var correctCondition, errorMessage;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          correctCondition = _joi["default"].object({
            couponCode: _joi["default"].string().trim().min(1).max(50).required().messages({
              'string.base': 'Mã giảm giá phải là chuỗi',
              'string.empty': 'Mã giảm giá không được để trống',
              'string.min': 'Mã giảm giá không được để trống',
              'string.max': 'Mã giảm giá không được vượt quá 50 ký tự',
              'any.required': 'Mã giảm giá là bắt buộc'
            })
          });
          _context3.prev = 1;
          _context3.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          errorMessage = _context3.t0.details.map(function (detail) {
            return detail.message;
          });
          next(new _ApiError["default"](_httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY, errorMessage));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return function applyCoupon(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var cartValidation = exports.cartValidation = {
  addToCart: addToCart,
  updateCartItem: updateCartItem,
  applyCoupon: applyCoupon
};