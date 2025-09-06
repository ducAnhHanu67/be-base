"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _cartController = require("../../controllers/cartController");
var _cartValidation = require("../../validations/cartValidation");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();

// Tất cả routes cart đều cần authentication
Router.use(_authMiddleware.authMiddleware.isAuthorized);

// Get cart - Lấy giỏ hàng hiện tại
Router.route('/').get(_cartController.cartController.getCart);

// Add to cart - Thêm sản phẩm vào giỏ hàng
Router.route('/add').post(_cartValidation.cartValidation.addToCart, _cartController.cartController.addToCart);

// Update cart item - Cập nhật số lượng sản phẩm trong giỏ hàng
Router.route('/items/:id').put(_cartValidation.cartValidation.updateCartItem, _cartController.cartController.updateCartItem);

// Remove from cart - Xóa sản phẩm khỏi giỏ hàng
Router.route('/items/:id')["delete"](_cartController.cartController.removeFromCart);

// Clear cart - Xóa toàn bộ giỏ hàng
Router.route('/clear')["delete"](_cartController.cartController.clearCart);

// Apply coupon - Áp dụng mã giảm giá
Router.route('/coupon').post(_cartValidation.cartValidation.applyCoupon, _cartController.cartController.applyCoupon);

// Remove coupon - Xóa mã giảm giá
Router.route('/coupon')["delete"](_cartController.cartController.removeCoupon);
var cartRoute = exports.cartRoute = Router;