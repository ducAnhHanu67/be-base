"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
/**
 * Validation cho tạo đánh giá mới
 */
var createReviewValidation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var schema, _error$details, errorMessages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          schema = _joi["default"].object({
            productId: _joi["default"].number().integer().positive().required().messages({
              'number.base': 'productId phải là số',
              'number.integer': 'productId phải là số nguyên',
              'number.positive': 'productId phải là số dương',
              'any.required': 'productId là bắt buộc'
            }),
            rating: _joi["default"].number().integer().min(1).max(5).required().messages({
              'number.base': 'Rating phải là số',
              'number.integer': 'Rating phải là số nguyên',
              'number.min': 'Rating phải từ 1 đến 5',
              'number.max': 'Rating phải từ 1 đến 5',
              'any.required': 'Rating là bắt buộc'
            }),
            comment: _joi["default"].string().max(1000).optional().messages({
              'string.base': 'Comment phải là chuỗi',
              'string.max': 'Comment không được vượt quá 1000 ký tự'
            })
          });
          _context.next = 4;
          return schema.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          errorMessages = ((_error$details = _context.t0.details) === null || _error$details === void 0 ? void 0 : _error$details.map(function (detail) {
            return detail.message;
          })) || [_context.t0.message];
          return _context.abrupt("return", res.status(400).json({
            message: 'Dữ liệu không hợp lệ!',
            errors: errorMessages
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createReviewValidation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Validation cho cập nhật đánh giá
 */
var updateReviewValidation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var schema, _error$details2, errorMessages;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          schema = _joi["default"].object({
            rating: _joi["default"].number().integer().min(1).max(5).required().messages({
              'number.base': 'Rating phải là số',
              'number.integer': 'Rating phải là số nguyên',
              'number.min': 'Rating phải từ 1 đến 5',
              'number.max': 'Rating phải từ 1 đến 5',
              'any.required': 'Rating là bắt buộc'
            }),
            comment: _joi["default"].string().max(1000).optional().messages({
              'string.base': 'Comment phải là chuỗi',
              'string.max': 'Comment không được vượt quá 1000 ký tự'
            })
          });
          _context2.next = 4;
          return schema.validateAsync(req.body, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 11;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          errorMessages = ((_error$details2 = _context2.t0.details) === null || _error$details2 === void 0 ? void 0 : _error$details2.map(function (detail) {
            return detail.message;
          })) || [_context2.t0.message];
          return _context2.abrupt("return", res.status(400).json({
            message: 'Dữ liệu không hợp lệ!',
            errors: errorMessages
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function updateReviewValidation(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Validation cho query parameters
 */
var reviewQueryValidation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var schema, _error$details3, errorMessages;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          schema = _joi["default"].object({
            page: _joi["default"].number().integer().min(1).optional().messages({
              'number.base': 'Page phải là số',
              'number.integer': 'Page phải là số nguyên',
              'number.min': 'Page phải lớn hơn 0'
            }),
            itemsPerPage: _joi["default"].number().integer().min(1).max(100).optional().messages({
              'number.base': 'ItemsPerPage phải là số',
              'number.integer': 'ItemsPerPage phải là số nguyên',
              'number.min': 'ItemsPerPage phải lớn hơn 0',
              'number.max': 'ItemsPerPage không được vượt quá 100'
            })
          });
          _context3.next = 4;
          return schema.validateAsync(req.query, {
            abortEarly: false
          });
        case 4:
          next();
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          errorMessages = ((_error$details3 = _context3.t0.details) === null || _error$details3 === void 0 ? void 0 : _error$details3.map(function (detail) {
            return detail.message;
          })) || [_context3.t0.message];
          return _context3.abrupt("return", res.status(400).json({
            message: 'Tham số truy vấn không hợp lệ!',
            errors: errorMessages
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function reviewQueryValidation(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var reviewValidation = exports.reviewValidation = {
  createReviewValidation: createReviewValidation,
  updateReviewValidation: updateReviewValidation,
  reviewQueryValidation: reviewQueryValidation
};