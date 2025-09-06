"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var validate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var correctCondition;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          correctCondition = _joi["default"].object({
            // name: Joi.string().required().max(50).trim().messages({
            //   'any.required': 'Tên danh mục là bắt buộc',
            //   'string.empty': 'Tên danh mục không cho phép trống',
            //   'string.max': 'Tên danh mục phải ít hơn hoặc bằng 50 ký tự',
            //   'string.trim': 'Tên danh mục không có khoảng trống ở đầu và cuối'
            // }),
            name: _joi["default"].string().required().min(3).max(50).trim()
          }).required();
          _context.prev = 1;
          _context.next = 4;
          return correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: false
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
  return function validate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var categoryValidation = exports.categoryValidation = {
  validate: validate
};