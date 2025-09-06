"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.couponValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            code: _joi["default"].string().required().min(3).max(50).messages({
              'any.required': 'Mã giảm giá là bắt buộc',
              'string.min': 'Mã giảm giá phải có ít nhất 3 ký tự',
              'string.max': 'Mã giảm giá không được quá 50 ký tự'
            }),
            name: _joi["default"].string().required().min(3).max(255).messages({
              'any.required': 'Tên mã giảm giá là bắt buộc',
              'string.min': 'Tên mã giảm giá phải có ít nhất 3 ký tự',
              'string.max': 'Tên mã giảm giá không được quá 255 ký tự'
            }),
            description: _joi["default"].string().optional().allow(''),
            type: _joi["default"].string().valid('PERCENTAGE', 'FIXED_AMOUNT').required().messages({
              'any.required': 'Loại mã giảm giá là bắt buộc',
              'any.only': 'Loại mã giảm giá phải là PERCENTAGE hoặc FIXED_AMOUNT'
            }),
            value: _joi["default"].number().positive().required().messages({
              'any.required': 'Giá trị giảm giá là bắt buộc',
              'number.positive': 'Giá trị giảm giá phải lớn hơn 0'
            }),
            minOrderAmount: _joi["default"].number().min(0).optional()["default"](0),
            maxDiscountAmount: _joi["default"].number().positive().optional(),
            usageLimit: _joi["default"].number().integer().positive().optional(),
            startDate: _joi["default"].date().required().messages({
              'any.required': 'Ngày bắt đầu là bắt buộc'
            }),
            endDate: _joi["default"].date().required().greater(_joi["default"].ref('startDate')).messages({
              'any.required': 'Ngày kết thúc là bắt buộc',
              'date.greater': 'Ngày kết thúc phải sau ngày bắt đầu'
            }),
            isActive: _joi["default"]["boolean"]().optional()["default"](true)
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
var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          correctCondition = _joi["default"].object({
            code: _joi["default"].string().min(3).max(50).messages({
              'string.min': 'Mã giảm giá phải có ít nhất 3 ký tự',
              'string.max': 'Mã giảm giá không được quá 50 ký tự'
            }),
            name: _joi["default"].string().min(3).max(255).messages({
              'string.min': 'Tên mã giảm giá phải có ít nhất 3 ký tự',
              'string.max': 'Tên mã giảm giá không được quá 255 ký tự'
            }),
            description: _joi["default"].string().optional().allow(''),
            type: _joi["default"].string().valid('PERCENTAGE', 'FIXED_AMOUNT').messages({
              'any.only': 'Loại mã giảm giá phải là PERCENTAGE hoặc FIXED_AMOUNT'
            }),
            value: _joi["default"].number().positive().messages({
              'number.positive': 'Giá trị giảm giá phải lớn hơn 0'
            }),
            minOrderAmount: _joi["default"].number().min(0),
            maxDiscountAmount: _joi["default"].number().positive(),
            usageLimit: _joi["default"].number().integer().positive(),
            startDate: _joi["default"].date(),
            endDate: _joi["default"].date(),
            isActive: _joi["default"]["boolean"]()
          });
          _context2.prev = 1;
          _context2.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true
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
  return function update(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var applyCoupon = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          correctCondition = _joi["default"].object({
            code: _joi["default"].string().required().messages({
              'any.required': 'Mã giảm giá là bắt buộc'
            }),
            orderAmount: _joi["default"].number().positive().required().messages({
              'any.required': 'Tổng tiền đơn hàng là bắt buộc',
              'number.positive': 'Tổng tiền đơn hàng phải lớn hơn 0'
            })
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
  return function applyCoupon(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var couponValidation = exports.couponValidation = {
  createNew: createNew,
  update: update,
  applyCoupon: applyCoupon
};