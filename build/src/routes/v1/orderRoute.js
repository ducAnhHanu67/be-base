"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _orderController = require("../../controllers/orderController");
var _orderValidation = require("../../validations/orderValidation");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();

// User routes - cần authentication
Router.use(_authMiddleware.authMiddleware.isAuthorized);

// Create order from cart - Tạo đơn hàng từ giỏ hàng
Router.route('/').post(_orderValidation.orderValidation.createOrder, _orderController.orderController.createOrder);

// Get user's orders - Lấy danh sách đơn hàng của user
Router.route('/').get(_orderController.orderController.getUserOrders);

// Get specific order - Lấy chi tiết đơn hàng
Router.route('/:id').get(_orderController.orderController.getOrderById);

// Get order by order number - Lấy đơn hàng theo mã đơn hàng
Router.route('/number/:orderNumber').get(_orderController.orderController.getOrderByNumber);

// Cancel order - Hủy đơn hàng (không cần lý do)
Router.route('/:id/cancel').put(_orderController.orderController.cancelOrder);

// Update payment status by order number - Cập nhật trạng thái thanh toán theo mã đơn hàng
Router.route('/payment/:orderNumber').put(_orderController.orderController.updatePaymentStatusByOrderNumber);

// Admin routes - cần quyền admin hoặc user
Router.route('/admin/all').get(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdminOrUser, _orderController.orderController.getAllOrders);
Router.route('/admin/:id').get(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdminOrUser, _orderController.orderController.getOrderByIdAdmin);
Router.route('/admin/:id/status').put(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdminOrUser, _orderValidation.orderValidation.updateOrderStatus, _orderController.orderController.updateOrderStatus);
Router.route('/admin/revenue/last-6-months').get(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdminOrUser, _orderController.orderController.getRevenueLast6Months);
Router.route('/admin/stats/current-month').get(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdminOrUser, _orderController.orderController.getCurrentMonthStats);
var orderRoute = exports.orderRoute = Router;