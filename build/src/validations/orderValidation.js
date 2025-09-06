"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _httpStatusCodes = require("http-status-codes");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition, errorMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            shippingAddress: _joi["default"].string().trim().min(10).max(500).required().messages({
              'string.base': 'Địa chỉ giao hàng phải là chuỗi',
              'string.empty': 'Địa chỉ giao hàng không được để trống',
              'string.min': 'Địa chỉ giao hàng phải có ít nhất 10 ký tự',
              'string.max': 'Địa chỉ giao hàng không được vượt quá 500 ký tự',
              'any.required': 'Địa chỉ giao hàng là bắt buộc'
            }),
            recipientName: _joi["default"].string().trim().min(1).max(100).required().messages({
              'string.base': 'Họ tên người nhận phải là chuỗi',
              'string.empty': 'Họ tên người nhận không được để trống',
              'string.min': 'Họ tên người nhận không được để trống',
              'string.max': 'Họ tên người nhận không được vượt quá 100 ký tự',
              'any.required': 'Họ tên người nhận là bắt buộc'
            }),
            recipientEmail: _joi["default"].string().trim().email().max(255).required().messages({
              'string.base': 'Email người nhận phải là chuỗi',
              'string.empty': 'Email người nhận không được để trống',
              'string.email': 'Email người nhận không đúng định dạng',
              'string.max': 'Email người nhận không được vượt quá 255 ký tự',
              'any.required': 'Email người nhận là bắt buộc'
            }),
            recipientPhone: _joi["default"].string().trim().pattern(/^[0-9]{10,11}$/).required().messages({
              'string.base': 'Số điện thoại người nhận phải là chuỗi',
              'string.empty': 'Số điện thoại người nhận không được để trống',
              'string.pattern.base': 'Số điện thoại người nhận phải có 10-11 chữ số',
              'any.required': 'Số điện thoại người nhận là bắt buộc'
            }),
            paymentMethod: _joi["default"].string().valid('COD', 'VNPAY').required().messages({
              'string.base': 'Phương thức thanh toán phải là chuỗi',
              'any.only': 'Phương thức thanh toán không hợp lệ (chỉ chấp nhận COD hoặc VNPAY)',
              'any.required': 'Phương thức thanh toán là bắt buộc'
            }),
            notes: _joi["default"].string().trim().max(1000).optional().allow('').messages({
              'string.base': 'Ghi chú phải là chuỗi',
              'string.max': 'Ghi chú không được vượt quá 1000 ký tự'
            }),
            saveAddress: _joi["default"]["boolean"]().optional()["default"](false).messages({
              'boolean.base': 'Lưu địa chỉ phải là boolean'
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
  return function createOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var updateOrderStatus = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var correctCondition, errorMessage;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          correctCondition = _joi["default"].object({
            status: _joi["default"].string().valid('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED').required().messages({
              'string.base': 'Trạng thái phải là chuỗi',
              'any.only': 'Trạng thái không hợp lệ',
              'any.required': 'Trạng thái là bắt buộc'
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
  return function updateOrderStatus(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // Không cần validation gì cả vì không cần lý do hủy
          next();
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function cancelOrder(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var orderValidation = exports.orderValidation = {
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  cancelOrder: cancelOrder
};