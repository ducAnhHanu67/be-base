"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.couponController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = require("http-status-codes");
var _couponService = require("../services/couponService");
var getCoupons = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _couponService.couponService.getCoupons(req.query);
        case 3:
          result = _context.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(result);
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
  return function getCoupons(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getCouponById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var couponId, coupon;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          couponId = req.params.id;
          _context2.next = 4;
          return _couponService.couponService.getCouponById(couponId);
        case 4:
          coupon = _context2.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(coupon);
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
  return function getCouponById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getCouponByCode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var code, coupon;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          code = req.params.code;
          _context3.next = 4;
          return _couponService.couponService.getCouponByCode(code);
        case 4:
          coupon = _context3.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(coupon);
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
  return function getCouponByCode(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var createNew = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var createdCoupon;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _couponService.couponService.create(req.body);
        case 3:
          createdCoupon = _context4.sent;
          res.status(_httpStatusCodes.StatusCodes.CREATED).json(createdCoupon);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function createNew(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var couponId, updatedCoupon;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          couponId = req.params.id;
          _context5.next = 4;
          return _couponService.couponService.update(couponId, req.body);
        case 4:
          updatedCoupon = _context5.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(updatedCoupon);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function update(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var couponId, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          couponId = req.params.id;
          _context6.next = 4;
          return _couponService.couponService.deleteById(couponId);
        case 4:
          result = _context6.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json({
            message: 'Xóa mã giảm giá thành công!',
            deletedCount: result
          });
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
  return function deleteById(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var applyCoupon = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var _req$body, code, orderAmount, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body = req.body, code = _req$body.code, orderAmount = _req$body.orderAmount;
          _context7.next = 4;
          return _couponService.couponService.applyCoupon(code, orderAmount);
        case 4:
          result = _context7.sent;
          res.status(_httpStatusCodes.StatusCodes.OK).json(result);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function applyCoupon(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var couponController = exports.couponController = {
  getCoupons: getCoupons,
  getCouponById: getCouponById,
  getCouponByCode: getCouponByCode,
  createNew: createNew,
  update: update,
  deleteById: deleteById,
  applyCoupon: applyCoupon
};