"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cartService = require("../services/cartService");
var getCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userId, cart;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _context.next = 4;
          return _cartService.cartService.getOrCreateCart(userId);
        case 4:
          cart = _context.sent;
          res.status(200).json(cart);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getCart(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var addToCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userId, _req$body, productId, _req$body$quantity, quantity, cart;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _req$body = req.body, productId = _req$body.productId, _req$body$quantity = _req$body.quantity, quantity = _req$body$quantity === void 0 ? 1 : _req$body$quantity;
          if (productId) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Product ID là bắt buộc!'
          }));
        case 5:
          if (!(quantity <= 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Số lượng phải lớn hơn 0!'
          }));
        case 7:
          _context2.next = 9;
          return _cartService.cartService.addToCart(userId, productId, quantity);
        case 9:
          cart = _context2.sent;
          res.status(200).json({
            message: 'Thêm sản phẩm vào giỏ hàng thành công!',
            data: cart
          });
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function addToCart(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var updateCartItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userId, cartItemId, quantity, cart;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          cartItemId = req.params.id;
          quantity = req.body.quantity;
          if (!(!quantity || quantity <= 0)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Số lượng phải lớn hơn 0!'
          }));
        case 6:
          _context3.next = 8;
          return _cartService.cartService.updateCartItem(userId, cartItemId, quantity);
        case 8:
          cart = _context3.sent;
          res.status(200).json({
            message: 'Cập nhật số lượng thành công!',
            data: cart
          });
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function updateCartItem(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var removeFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, cartItemId, cart;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          cartItemId = req.params.id;
          _context4.next = 5;
          return _cartService.cartService.removeFromCart(userId, cartItemId);
        case 5:
          cart = _context4.sent;
          res.status(200).json({
            message: 'Xóa sản phẩm khỏi giỏ hàng thành công!',
            data: cart
          });
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function removeFromCart(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var clearCart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userId, cart;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          _context5.next = 4;
          return _cartService.cartService.clearCart(userId);
        case 4:
          cart = _context5.sent;
          res.status(200).json({
            message: 'Xóa toàn bộ giỏ hàng thành công!',
            data: cart
          });
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
  return function clearCart(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var applyCoupon = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, couponCode, cart;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.user.id;
          couponCode = req.body.couponCode;
          if (couponCode) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Mã giảm giá là bắt buộc!'
          }));
        case 5:
          _context6.next = 7;
          return _cartService.cartService.applyCouponToCart(userId, couponCode);
        case 7:
          cart = _context6.sent;
          res.status(200).json({
            message: 'Áp dụng mã giảm giá thành công!',
            data: cart
          });
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function applyCoupon(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var removeCoupon = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var userId, cart;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.user.id;
          _context7.next = 4;
          return _cartService.cartService.removeCouponFromCart(userId);
        case 4:
          cart = _context7.sent;
          res.status(200).json({
            message: 'Xóa mã giảm giá thành công!',
            data: cart
          });
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
  return function removeCoupon(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var cartController = exports.cartController = {
  getCart: getCart,
  addToCart: addToCart,
  updateCartItem: updateCartItem,
  removeFromCart: removeFromCart,
  clearCart: clearCart,
  applyCoupon: applyCoupon,
  removeCoupon: removeCoupon
};