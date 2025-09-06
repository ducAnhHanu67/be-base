"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _orderService = require("../services/orderService");
var createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userId, orderData, clientIp, order, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          orderData = req.body;
          clientIp = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || '127.0.0.1';
          _context.next = 6;
          return _orderService.orderService.createOrderFromCart(userId, orderData, clientIp);
        case 6:
          order = _context.sent;
          // Kiểm tra nếu có paymentUrl (VNPay) thì trả về message khác
          message = order.paymentUrl ? 'Đặt hàng thành công! Vui lòng thanh toán.' : 'Đặt hàng thành công!';
          res.status(201).json({
            message: message,
            data: order
          });
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function createOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getOrderById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var orderId, userId, order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          orderId = req.params.id;
          userId = req.user.id;
          _context2.next = 5;
          return _orderService.orderService.getOrderById(orderId, userId);
        case 5:
          order = _context2.sent;
          res.status(200).json(order);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getOrderById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrderByNumber = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var orderNumber, userId, order;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          orderNumber = req.params.orderNumber;
          userId = req.user.id;
          _context3.next = 5;
          return _orderService.orderService.getOrderByNumber(orderNumber, userId);
        case 5:
          order = _context3.sent;
          res.status(200).json({
            data: order
          });
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getOrderByNumber(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getUserOrders = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, _req$query, page, itemsPerPage, orders;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _req$query = req.query, page = _req$query.page, itemsPerPage = _req$query.itemsPerPage;
          _context4.next = 5;
          return _orderService.orderService.getUserOrders(userId, page, itemsPerPage);
        case 5:
          orders = _context4.sent;
          res.status(200).json(orders);
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
  return function getUserOrders(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var orderId, userId, order;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          orderId = req.params.id;
          userId = req.user.id;
          _context5.next = 5;
          return _orderService.orderService.cancelOrder(orderId, userId);
        case 5:
          order = _context5.sent;
          res.status(200).json({
            message: 'Hủy đơn hàng thành công!',
            data: order
          });
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function cancelOrder(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

// Admin controllers
var getAllOrders = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$query2, page, itemsPerPage, status, paymentStatus, paymentMethod, search, filters, orders;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$query2 = req.query, page = _req$query2.page, itemsPerPage = _req$query2.itemsPerPage, status = _req$query2.status, paymentStatus = _req$query2.paymentStatus, paymentMethod = _req$query2.paymentMethod, search = _req$query2.search;
          filters = {
            status: status,
            paymentStatus: paymentStatus,
            paymentMethod: paymentMethod,
            search: search
          };
          _context6.next = 5;
          return _orderService.orderService.getAllOrders(page, itemsPerPage, filters);
        case 5:
          orders = _context6.sent;
          res.status(200).json(orders);
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function getAllOrders(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var getOrderByIdAdmin = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var orderId, order;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          orderId = req.params.id;
          _context7.next = 4;
          return _orderService.orderService.getOrderById(orderId);
        case 4:
          order = _context7.sent;
          res.status(200).json(order);
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
  return function getOrderByIdAdmin(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var updateOrderStatus = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var orderId, status, order;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          orderId = req.params.id;
          status = req.body.status;
          _context8.next = 5;
          return _orderService.orderService.updateOrderStatus(orderId, status);
        case 5:
          order = _context8.sent;
          res.status(200).json({
            message: 'Cập nhật trạng thái đơn hàng thành công!',
            data: order
          });
          _context8.next = 12;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function updateOrderStatus(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

// VNPay payment controllers
var updatePaymentStatusByOrderNumber = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var orderNumber, _req$body, responseCode, transactionNo, amount, payDate, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          orderNumber = req.params.orderNumber;
          _req$body = req.body, responseCode = _req$body.responseCode, transactionNo = _req$body.transactionNo, amount = _req$body.amount, payDate = _req$body.payDate;
          _context9.next = 5;
          return _orderService.orderService.updatePaymentStatusByOrderNumber(orderNumber, responseCode, transactionNo, amount, payDate);
        case 5:
          result = _context9.sent;
          res.status(200).json({
            message: 'Cập nhật trạng thái thanh toán thành công!',
            data: result
          });
          _context9.next = 12;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function updatePaymentStatusByOrderNumber(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var getRevenueLast6Months = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _orderService.orderService.getRevenueLast6Months();
        case 3:
          result = _context10.sent;
          res.status(200).json({
            success: true,
            data: result
          });
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function getRevenueLast6Months(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var getCurrentMonthStats = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var stats;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _orderService.orderService.getCurrentMonthStats();
        case 3:
          stats = _context11.sent;
          return _context11.abrupt("return", res.status(200).json({
            success: true,
            data: stats
          }));
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          console.error('Error in getCurrentMonthStats:', _context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            success: false,
            message: 'Server error'
          }));
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function getCurrentMonthStats(_x31, _x32) {
    return _ref11.apply(this, arguments);
  };
}();
var orderController = exports.orderController = {
  createOrder: createOrder,
  getOrderById: getOrderById,
  getOrderByNumber: getOrderByNumber,
  getUserOrders: getUserOrders,
  cancelOrder: cancelOrder,
  getAllOrders: getAllOrders,
  getOrderByIdAdmin: getOrderByIdAdmin,
  updateOrderStatus: updateOrderStatus,
  updatePaymentStatusByOrderNumber: updatePaymentStatusByOrderNumber,
  getRevenueLast6Months: getRevenueLast6Months,
  getCurrentMonthStats: getCurrentMonthStats
};