"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../models");
var _couponService = require("./couponService");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var getOrCreateCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var cart;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _models.Cart.findOne({
            where: {
              userId: userId,
              status: 'ACTIVE'
            },
            include: [{
              model: _models.CartItem,
              as: 'items',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'discount', 'stock', 'coverImageUrl'],
                include: [{
                  model: _models.ProductImage,
                  as: 'productImages',
                  attributes: ['imageUrl']
                }]
              }]
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false
            }]
          });
        case 3:
          cart = _context.sent;
          if (cart) {
            _context.next = 8;
            break;
          }
          _context.next = 7;
          return _models.Cart.create({
            userId: userId,
            totalAmount: 0,
            discountAmount: 0,
            finalAmount: 0,
            status: 'ACTIVE'
          });
        case 7:
          cart = _context.sent;
        case 8:
          return _context.abrupt("return", cart);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getOrCreateCart(_x) {
    return _ref.apply(this, arguments);
  };
}();
var addToCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(userId, productId) {
    var quantity,
      product,
      cart,
      existingCartItem,
      newQuantity,
      totalPrice,
      _totalPrice,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          quantity = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 1;
          _context2.prev = 1;
          _context2.next = 4;
          return _models.Product.findByPk(productId);
        case 4:
          product = _context2.sent;
          if (product) {
            _context2.next = 7;
            break;
          }
          throw new _ApiError["default"](404, 'Sản phẩm không tồn tại!');
        case 7:
          if (!(product.stock < quantity)) {
            _context2.next = 9;
            break;
          }
          throw new _ApiError["default"](400, "Ch\u1EC9 c\xF2n ".concat(product.stock, " s\u1EA3n ph\u1EA9m trong kho!"));
        case 9:
          _context2.next = 11;
          return getOrCreateCart(userId);
        case 11:
          cart = _context2.sent;
          _context2.next = 14;
          return _models.CartItem.findOne({
            where: {
              cartId: cart.id,
              productId: productId
            }
          });
        case 14:
          existingCartItem = _context2.sent;
          if (!existingCartItem) {
            _context2.next = 24;
            break;
          }
          // Cập nhật quantity
          newQuantity = existingCartItem.quantity + quantity; // Kiểm tra stock với quantity mới
          if (!(product.stock < newQuantity)) {
            _context2.next = 19;
            break;
          }
          throw new _ApiError["default"](400, "Ch\u1EC9 c\xF3 th\u1EC3 th\xEAm t\u1ED1i \u0111a ".concat(product.stock - existingCartItem.quantity, " s\u1EA3n ph\u1EA9m n\u1EEFa!"));
        case 19:
          totalPrice = newQuantity * product.price * (100 - product.discount) / 100;
          _context2.next = 22;
          return existingCartItem.update({
            quantity: newQuantity,
            totalPrice: totalPrice
          });
        case 22:
          _context2.next = 27;
          break;
        case 24:
          // Tạo mới cart item
          _totalPrice = quantity * product.price * (100 - product.discount) / 100;
          _context2.next = 27;
          return _models.CartItem.create({
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            unitPrice: product.price,
            discount: product.discount,
            totalPrice: _totalPrice
          });
        case 27:
          _context2.next = 29;
          return updateCartTotals(cart.id);
        case 29:
          _context2.next = 31;
          return getCartWithItems(cart.id);
        case 31:
          return _context2.abrupt("return", _context2.sent);
        case 34:
          _context2.prev = 34;
          _context2.t0 = _context2["catch"](1);
          throw _context2.t0;
        case 37:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 34]]);
  }));
  return function addToCart(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var updateCartItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId, cartItemId, quantity) {
    var cartItem, totalPrice;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _models.CartItem.findOne({
            where: {
              id: cartItemId
            },
            include: [{
              model: _models.Cart,
              as: 'cart',
              where: {
                userId: userId,
                status: 'ACTIVE'
              }
            }, {
              model: _models.Product,
              as: 'product'
            }]
          });
        case 3:
          cartItem = _context3.sent;
          if (cartItem) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm trong giỏ hàng!');
        case 6:
          if (!(cartItem.product.stock < quantity)) {
            _context3.next = 8;
            break;
          }
          throw new _ApiError["default"](400, "Ch\u1EC9 c\xF2n ".concat(cartItem.product.stock, " s\u1EA3n ph\u1EA9m trong kho!"));
        case 8:
          // Cập nhật quantity và totalPrice
          totalPrice = quantity * cartItem.unitPrice * (100 - cartItem.discount) / 100;
          _context3.next = 11;
          return cartItem.update({
            quantity: quantity,
            totalPrice: totalPrice
          });
        case 11:
          _context3.next = 13;
          return updateCartTotals(cartItem.cart.id);
        case 13:
          _context3.next = 15;
          return getCartWithItems(cartItem.cart.id);
        case 15:
          return _context3.abrupt("return", _context3.sent);
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function updateCartItem(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var removeFromCart = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, cartItemId) {
    var cartItem, cartId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _models.CartItem.findOne({
            where: {
              id: cartItemId
            },
            include: [{
              model: _models.Cart,
              as: 'cart',
              where: {
                userId: userId,
                status: 'ACTIVE'
              }
            }]
          });
        case 3:
          cartItem = _context4.sent;
          if (cartItem) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm trong giỏ hàng!');
        case 6:
          cartId = cartItem.cart.id;
          _context4.next = 9;
          return cartItem.destroy();
        case 9:
          _context4.next = 11;
          return updateCartTotals(cartId);
        case 11:
          _context4.next = 13;
          return getCartWithItems(cartId);
        case 13:
          return _context4.abrupt("return", _context4.sent);
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return function removeFromCart(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var clearCart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    var cart;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _models.Cart.findOne({
            where: {
              userId: userId,
              status: 'ACTIVE'
            }
          });
        case 3:
          cart = _context5.sent;
          if (cart) {
            _context5.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy giỏ hàng!');
        case 6:
          _context5.next = 8;
          return _models.CartItem.destroy({
            where: {
              cartId: cart.id
            }
          });
        case 8:
          _context5.next = 10;
          return cart.update({
            totalAmount: 0,
            discountAmount: 0,
            finalAmount: 0,
            couponId: null
          });
        case 10:
          _context5.next = 12;
          return getCartWithItems(cart.id);
        case 12:
          return _context5.abrupt("return", _context5.sent);
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 15]]);
  }));
  return function clearCart(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var applyCouponToCart = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, couponCode) {
    var cart, couponResult;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _models.Cart.findOne({
            where: {
              userId: userId,
              status: 'ACTIVE'
            },
            include: [{
              model: _models.CartItem,
              as: 'items'
            }]
          });
        case 3:
          cart = _context6.sent;
          if (cart) {
            _context6.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy giỏ hàng!');
        case 6:
          if (!(!cart.items || cart.items.length === 0)) {
            _context6.next = 8;
            break;
          }
          throw new _ApiError["default"](400, 'Giỏ hàng trống!');
        case 8:
          _context6.next = 10;
          return _couponService.couponService.applyCoupon(couponCode, cart.totalAmount);
        case 10:
          couponResult = _context6.sent;
          _context6.next = 13;
          return cart.update({
            couponId: couponResult.coupon.id,
            discountAmount: couponResult.discountAmount,
            finalAmount: cart.totalAmount - couponResult.discountAmount
          });
        case 13:
          _context6.next = 15;
          return getCartWithItems(cart.id);
        case 15:
          return _context6.abrupt("return", _context6.sent);
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function applyCouponToCart(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var removeCouponFromCart = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(userId) {
    var cart;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _models.Cart.findOne({
            where: {
              userId: userId,
              status: 'ACTIVE'
            }
          });
        case 3:
          cart = _context7.sent;
          if (cart) {
            _context7.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy giỏ hàng!');
        case 6:
          _context7.next = 8;
          return cart.update({
            couponId: null,
            discountAmount: 0,
            finalAmount: cart.totalAmount
          });
        case 8:
          _context7.next = 10;
          return getCartWithItems(cart.id);
        case 10:
          return _context7.abrupt("return", _context7.sent);
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function removeCouponFromCart(_x12) {
    return _ref7.apply(this, arguments);
  };
}();
var getCartWithItems = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(cartId) {
    var cart;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _models.Cart.findByPk(cartId, {
            include: [{
              model: _models.CartItem,
              as: 'items',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'discount', 'stock', 'coverImageUrl', 'type'],
                include: [{
                  model: _models.ProductImage,
                  as: 'productImages',
                  attributes: ['imageUrl']
                }]
              }]
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false,
              attributes: ['id', 'code', 'name', 'type', 'value']
            }]
          });
        case 3:
          cart = _context8.sent;
          return _context8.abrupt("return", cart);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getCartWithItems(_x13) {
    return _ref8.apply(this, arguments);
  };
}();
var updateCartTotals = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(cartId) {
    var cart, totalAmount, discountAmount, finalAmount, couponId, couponResult;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _models.Cart.findByPk(cartId, {
            include: [{
              model: _models.CartItem,
              as: 'items'
            }, {
              model: _models.Coupon,
              as: 'coupon'
            }]
          });
        case 3:
          cart = _context9.sent;
          if (cart) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return");
        case 6:
          // Tính tổng tiền
          totalAmount = cart.items.reduce(function (sum, item) {
            return sum + parseFloat(item.totalPrice);
          }, 0); // Tính lại discount nếu có coupon
          discountAmount = 0;
          finalAmount = totalAmount;
          couponId = cart.couponId;
          if (!(cart.couponId && cart.coupon)) {
            _context9.next = 24;
            break;
          }
          _context9.prev = 11;
          _context9.next = 14;
          return _couponService.couponService.applyCoupon(cart.coupon.code, totalAmount);
        case 14:
          couponResult = _context9.sent;
          discountAmount = couponResult.discountAmount;
          finalAmount = totalAmount - discountAmount;
          _context9.next = 24;
          break;
        case 19:
          _context9.prev = 19;
          _context9.t0 = _context9["catch"](11);
          // Nếu coupon không còn hợp lệ, xóa coupon khỏi cart
          couponId = null;
          discountAmount = 0;
          finalAmount = totalAmount;
        case 24:
          _context9.next = 26;
          return cart.update({
            totalAmount: totalAmount,
            discountAmount: discountAmount,
            finalAmount: finalAmount,
            couponId: couponId
          });
        case 26:
          _context9.next = 31;
          break;
        case 28:
          _context9.prev = 28;
          _context9.t1 = _context9["catch"](0);
          throw _context9.t1;
        case 31:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 28], [11, 19]]);
  }));
  return function updateCartTotals(_x14) {
    return _ref9.apply(this, arguments);
  };
}();
var cartService = exports.cartService = {
  getOrCreateCart: getOrCreateCart,
  addToCart: addToCart,
  updateCartItem: updateCartItem,
  removeFromCart: removeFromCart,
  clearCart: clearCart,
  applyCouponToCart: applyCouponToCart,
  removeCouponFromCart: removeCouponFromCart,
  getCartWithItems: getCartWithItems
};