"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var _sequelize = require("sequelize");
var _models = require("../models");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _constants = require("../utils/constants");
var _VNPayProvider = _interopRequireDefault(require("../providers/VNPayProvider"));
var _addressService = require("./addressService");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var generateOrderNumber = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var year, prefix, lastOrder, nextNumber, lastNumber;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          year = new Date().getFullYear();
          prefix = "HB".concat(year); // Tìm order number cuối cùng trong năm
          _context.next = 4;
          return _models.Order.findOne({
            where: {
              orderNumber: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "".concat(prefix, "%"))
            },
            order: [['orderNumber', 'DESC']]
          });
        case 4:
          lastOrder = _context.sent;
          nextNumber = 1;
          if (lastOrder) {
            lastNumber = parseInt(lastOrder.orderNumber.replace(prefix, ''));
            nextNumber = lastNumber + 1;
          }
          return _context.abrupt("return", "".concat(prefix).concat(nextNumber.toString().padStart(6, '0')));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function generateOrderNumber() {
    return _ref.apply(this, arguments);
  };
}();
var createOrderFromCart = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId, orderData) {
    var clientIp,
      recipientName,
      recipientEmail,
      recipientPhone,
      shippingAddress,
      paymentMethod,
      notes,
      _orderData$saveAddres,
      saveAddress,
      cart,
      _iterator,
      _step,
      item,
      result,
      orderResult,
      paymentUrl,
      _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          clientIp = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '127.0.0.1';
          _context3.prev = 1;
          recipientName = orderData.recipientName, recipientEmail = orderData.recipientEmail, recipientPhone = orderData.recipientPhone, shippingAddress = orderData.shippingAddress, paymentMethod = orderData.paymentMethod, notes = orderData.notes, _orderData$saveAddres = orderData.saveAddress, saveAddress = _orderData$saveAddres === void 0 ? false : _orderData$saveAddres; // Validate recipient information
          if (!(!recipientName || !recipientEmail || !recipientPhone)) {
            _context3.next = 5;
            break;
          }
          throw new _ApiError["default"](400, 'Thông tin người nhận không đầy đủ!');
        case 5:
          if (shippingAddress) {
            _context3.next = 7;
            break;
          }
          throw new _ApiError["default"](400, 'Vui lòng nhập địa chỉ giao hàng!');
        case 7:
          _context3.next = 9;
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
                as: 'product'
              }]
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false
            }]
          });
        case 9:
          cart = _context3.sent;
          if (!(!cart || !cart.items || cart.items.length === 0)) {
            _context3.next = 12;
            break;
          }
          throw new _ApiError["default"](400, 'Giỏ hàng trống!');
        case 12:
          // Kiểm tra stock cho tất cả sản phẩm
          _iterator = _createForOfIteratorHelper(cart.items);
          _context3.prev = 13;
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context3.next = 21;
            break;
          }
          item = _step.value;
          if (!(item.product.stock < item.quantity)) {
            _context3.next = 19;
            break;
          }
          throw new _ApiError["default"](400, "S\u1EA3n ph\u1EA9m \"".concat(item.product.name, "\" ch\u1EC9 c\xF2n ").concat(item.product.stock, " trong kho!"));
        case 19:
          _context3.next = 15;
          break;
        case 21:
          _context3.next = 26;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](13);
          _iterator.e(_context3.t0);
        case 26:
          _context3.prev = 26;
          _iterator.f();
          return _context3.finish(26);
        case 29:
          _context3.next = 31;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(t) {
              var _cart$coupon;
              var orderNumber, order, _iterator2, _step2, item;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return generateOrderNumber();
                  case 2:
                    orderNumber = _context2.sent;
                    _context2.next = 5;
                    return _models.Order.create({
                      orderNumber: orderNumber,
                      userId: userId,
                      recipientName: recipientName,
                      recipientEmail: recipientEmail,
                      recipientPhone: recipientPhone,
                      subtotal: cart.totalAmount,
                      discountAmount: cart.discountAmount,
                      totalAmount: cart.finalAmount,
                      couponId: cart.couponId,
                      couponCode: (_cart$coupon = cart.coupon) === null || _cart$coupon === void 0 ? void 0 : _cart$coupon.code,
                      status: 'PENDING',
                      paymentStatus: 'PENDING',
                      paymentMethod: paymentMethod,
                      shippingAddress: shippingAddress,
                      notes: notes
                    }, {
                      transaction: t
                    });
                  case 5:
                    order = _context2.sent;
                    // Tạo order items và cập nhật stock
                    _iterator2 = _createForOfIteratorHelper(cart.items);
                    _context2.prev = 7;
                    _iterator2.s();
                  case 9:
                    if ((_step2 = _iterator2.n()).done) {
                      _context2.next = 17;
                      break;
                    }
                    item = _step2.value;
                    _context2.next = 13;
                    return _models.OrderItem.create({
                      orderId: order.id,
                      productId: item.productId,
                      productName: item.product.name,
                      productImage: item.product.coverImageUrl,
                      quantity: item.quantity,
                      unitPrice: item.unitPrice,
                      discount: item.discount,
                      totalPrice: item.totalPrice
                    }, {
                      transaction: t
                    });
                  case 13:
                    _context2.next = 15;
                    return _models.Product.update({
                      stock: item.product.stock - item.quantity
                    }, {
                      where: {
                        id: item.productId
                      },
                      transaction: t
                    });
                  case 15:
                    _context2.next = 9;
                    break;
                  case 17:
                    _context2.next = 22;
                    break;
                  case 19:
                    _context2.prev = 19;
                    _context2.t0 = _context2["catch"](7);
                    _iterator2.e(_context2.t0);
                  case 22:
                    _context2.prev = 22;
                    _iterator2.f();
                    return _context2.finish(22);
                  case 25:
                    if (!cart.couponId) {
                      _context2.next = 28;
                      break;
                    }
                    _context2.next = 28;
                    return _models.Coupon.increment('usedCount', {
                      by: 1,
                      where: {
                        id: cart.couponId
                      },
                      transaction: t
                    });
                  case 28:
                    _context2.next = 30;
                    return cart.update({
                      status: 'CONVERTED'
                    }, {
                      transaction: t
                    });
                  case 30:
                    return _context2.abrupt("return", order);
                  case 31:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[7, 19, 22, 25]]);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 31:
          result = _context3.sent;
          if (!saveAddress) {
            _context3.next = 40;
            break;
          }
          _context3.prev = 33;
          _context3.next = 36;
          return _addressService.addressService.createAddress(userId, {
            recipientName: recipientName,
            recipientEmail: recipientEmail,
            recipientPhone: recipientPhone,
            address: shippingAddress,
            isDefault: false
          });
        case 36:
          _context3.next = 40;
          break;
        case 38:
          _context3.prev = 38;
          _context3.t1 = _context3["catch"](33);
        case 40:
          _context3.next = 42;
          return getOrderById(result.id);
        case 42:
          orderResult = _context3.sent;
          if (!(paymentMethod === 'VNPAY')) {
            _context3.next = 46;
            break;
          }
          paymentUrl = _VNPayProvider["default"].createPaymentUrl({
            orderId: result.orderNumber,
            amount: result.totalAmount,
            orderInfo: "Thanh to\xE1n \u0111\u01A1n h\xE0ng ".concat(result.orderNumber),
            ipAddr: clientIp
          });
          return _context3.abrupt("return", _objectSpread(_objectSpread({}, orderResult.toJSON()), {}, {
            paymentUrl: paymentUrl
          }));
        case 46:
          return _context3.abrupt("return", orderResult);
        case 49:
          _context3.prev = 49;
          _context3.t2 = _context3["catch"](1);
          throw _context3.t2;
        case 52:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 49], [13, 23, 26, 29], [33, 38]]);
  }));
  return function createOrderFromCart(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrderById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(orderId) {
    var userId,
      whereCondition,
      order,
      _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          userId = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
          _context4.prev = 1;
          whereCondition = {
            id: orderId
          };
          if (userId) {
            whereCondition.userId = userId;
          }
          _context4.next = 6;
          return _models.Order.findOne({
            where: whereCondition,
            include: [{
              model: _models.OrderItem,
              as: 'orderItems',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'coverImageUrl', 'stock']
              }]
            }, {
              model: _models.User,
              as: 'user',
              attributes: ['id', 'email', 'userName', 'address']
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false,
              attributes: ['id', 'code', 'name', 'type', 'value']
            }]
          });
        case 6:
          order = _context4.sent;
          if (order) {
            _context4.next = 9;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy đơn hàng!');
        case 9:
          return _context4.abrupt("return", order);
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          throw _context4.t0;
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return function getOrderById(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserOrders = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    var page,
      itemsPerPage,
      offset,
      _yield$Order$findAndC,
      data,
      count,
      _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          page = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : _constants.DEFAULT_PAGE;
          itemsPerPage = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : _constants.DEFAULT_ITEMS_PER_PAGE;
          _context5.prev = 2;
          offset = (page - 1) * itemsPerPage;
          _context5.next = 6;
          return _models.Order.findAndCountAll({
            where: {
              userId: userId
            },
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['createdAt', 'DESC']],
            distinct: true,
            col: 'id',
            include: [{
              model: _models.OrderItem,
              as: 'orderItems',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'coverImageUrl']
              }]
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false,
              attributes: ['id', 'code', 'name']
            }]
          });
        case 6:
          _yield$Order$findAndC = _context5.sent;
          data = _yield$Order$findAndC.rows;
          count = _yield$Order$findAndC.count;
          return _context5.abrupt("return", {
            data: data,
            count: count,
            totalPages: Math.ceil(count / itemsPerPage),
            currentPage: parseInt(page)
          });
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](2);
          throw _context5.t0;
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 12]]);
  }));
  return function getUserOrders(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var updateOrderStatus = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(orderId, status) {
    var userId,
      whereCondition,
      order,
      validTransitions,
      updateData,
      _args6 = arguments;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : null;
          _context6.prev = 1;
          whereCondition = {
            id: orderId
          };
          if (userId) {
            whereCondition.userId = userId;
          }
          _context6.next = 6;
          return _models.Order.findOne({
            where: whereCondition
          });
        case 6:
          order = _context6.sent;
          if (order) {
            _context6.next = 9;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy đơn hàng!');
        case 9:
          // Validate status transitions
          validTransitions = {
            PENDING: ['CONFIRMED', 'CANCELLED'],
            CONFIRMED: ['PROCESSING', 'CANCELLED'],
            PROCESSING: ['SHIPPED', 'CANCELLED'],
            SHIPPED: ['DELIVERED', 'RETURNED'],
            DELIVERED: ['RETURNED'],
            CANCELLED: [],
            RETURNED: []
          };
          if (validTransitions[order.status].includes(status)) {
            _context6.next = 12;
            break;
          }
          throw new _ApiError["default"](400, "Kh\xF4ng th\u1EC3 chuy\u1EC3n t\u1EEB tr\u1EA1ng th\xE1i ".concat(order.status, " sang ").concat(status, "!"));
        case 12:
          updateData = {
            status: status
          }; // Set special timestamps
          if (status === 'DELIVERED') {
            updateData.deliveredAt = new Date();
            // Nếu là COD và chuyển thành DELIVERED, tự động đánh dấu đã thanh toán
            if (order.paymentMethod === 'COD' && order.paymentStatus === 'PENDING') {
              updateData.paymentStatus = 'PAID';
              updateData.paidAt = new Date();
            }
          } else if (status === 'CANCELLED') {
            updateData.cancelledAt = new Date();
          }
          _context6.next = 16;
          return order.update(updateData);
        case 16:
          _context6.next = 18;
          return getOrderById(orderId);
        case 18:
          return _context6.abrupt("return", _context6.sent);
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](1);
          throw _context6.t0;
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 21]]);
  }));
  return function updateOrderStatus(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(orderId, userId) {
    var order;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _models.Order.findOne({
            where: {
              id: orderId,
              userId: userId
            },
            include: [{
              model: _models.OrderItem,
              as: 'orderItems'
            }]
          });
        case 3:
          order = _context8.sent;
          if (order) {
            _context8.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy đơn hàng!');
        case 6:
          if (['PENDING', 'CONFIRMED'].includes(order.status)) {
            _context8.next = 8;
            break;
          }
          throw new _ApiError["default"](400, 'Không thể hủy đơn hàng này!');
        case 8:
          _context8.next = 10;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(t) {
              var _iterator3, _step3, item;
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    // Hoàn lại stock
                    _iterator3 = _createForOfIteratorHelper(order.orderItems);
                    _context7.prev = 1;
                    _iterator3.s();
                  case 3:
                    if ((_step3 = _iterator3.n()).done) {
                      _context7.next = 9;
                      break;
                    }
                    item = _step3.value;
                    _context7.next = 7;
                    return _models.Product.increment('stock', {
                      by: item.quantity,
                      where: {
                        id: item.productId
                      },
                      transaction: t
                    });
                  case 7:
                    _context7.next = 3;
                    break;
                  case 9:
                    _context7.next = 14;
                    break;
                  case 11:
                    _context7.prev = 11;
                    _context7.t0 = _context7["catch"](1);
                    _iterator3.e(_context7.t0);
                  case 14:
                    _context7.prev = 14;
                    _iterator3.f();
                    return _context7.finish(14);
                  case 17:
                    if (!order.couponId) {
                      _context7.next = 20;
                      break;
                    }
                    _context7.next = 20;
                    return _models.Coupon.decrement('usedCount', {
                      by: 1,
                      where: {
                        id: order.couponId
                      },
                      transaction: t
                    });
                  case 20:
                    _context7.next = 22;
                    return order.update({
                      status: 'CANCELLED',
                      cancelledAt: new Date()
                    }, {
                      transaction: t
                    });
                  case 22:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[1, 11, 14, 17]]);
            }));
            return function (_x10) {
              return _ref8.apply(this, arguments);
            };
          }());
        case 10:
          _context8.next = 12;
          return getOrderById(orderId);
        case 12:
          return _context8.abrupt("return", _context8.sent);
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function cancelOrder(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();

// Admin functions
var getAllOrders = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var page,
      itemsPerPage,
      filters,
      offset,
      whereCondition,
      _yield$Order$findAndC2,
      data,
      count,
      _args9 = arguments;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          page = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : _constants.DEFAULT_PAGE;
          itemsPerPage = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : _constants.DEFAULT_ITEMS_PER_PAGE;
          filters = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
          _context9.prev = 3;
          offset = (page - 1) * itemsPerPage;
          whereCondition = {}; // Apply filters
          if (filters.status) {
            whereCondition.status = filters.status;
          }
          if (filters.paymentStatus) {
            whereCondition.paymentStatus = filters.paymentStatus;
          }
          if (filters.paymentMethod) {
            whereCondition.paymentMethod = filters.paymentMethod;
          }

          // Add search functionality
          if (filters.search) {
            whereCondition[_sequelize.Op.or] = [{
              orderNumber: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(filters.search, "%"))
            }, {
              recipientName: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(filters.search, "%"))
            }, {
              recipientEmail: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(filters.search, "%"))
            }, {
              recipientPhone: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(filters.search, "%"))
            }];
          }
          _context9.next = 12;
          return _models.Order.findAndCountAll({
            where: whereCondition,
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['createdAt', 'DESC']],
            distinct: true,
            col: 'id',
            include: [{
              model: _models.User,
              as: 'user',
              attributes: ['id', 'email', 'userName', 'address']
            }, {
              model: _models.OrderItem,
              as: 'orderItems',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'coverImageUrl']
              }]
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false,
              attributes: ['id', 'code', 'name']
            }]
          });
        case 12:
          _yield$Order$findAndC2 = _context9.sent;
          data = _yield$Order$findAndC2.rows;
          count = _yield$Order$findAndC2.count;
          return _context9.abrupt("return", {
            data: data,
            count: count,
            totalPages: Math.ceil(count / itemsPerPage),
            currentPage: parseInt(page)
          });
        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](3);
          throw _context9.t0;
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 18]]);
  }));
  return function getAllOrders() {
    return _ref9.apply(this, arguments);
  };
}();
var getOrderByNumber = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(orderNumber, userId) {
    var order;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _models.Order.findOne({
            where: {
              orderNumber: orderNumber,
              userId: userId
            },
            include: [{
              model: _models.OrderItem,
              as: 'orderItems',
              include: [{
                model: _models.Product,
                as: 'product',
                attributes: ['id', 'name', 'coverImageUrl', 'stock']
              }]
            }, {
              model: _models.User,
              as: 'user',
              attributes: ['id', 'email', 'userName', 'address']
            }, {
              model: _models.Coupon,
              as: 'coupon',
              required: false,
              attributes: ['id', 'code', 'name', 'type', 'value']
            }]
          });
        case 3:
          order = _context10.sent;
          if (order) {
            _context10.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy đơn hàng!');
        case 6:
          return _context10.abrupt("return", order);
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function getOrderByNumber(_x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Cập nhật trạng thái thanh toán theo mã đơn hàng (cho VNPay callback)
 */
var updatePaymentStatusByOrderNumber = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(orderNumber, responseCode, transactionNo, amount, payDate) {
    var order, expectedAmount, updateData, year, month, day, hour, minute, second;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _models.Order.findOne({
            where: {
              orderNumber: orderNumber
            },
            include: [{
              model: _models.OrderItem,
              as: 'orderItems'
            }]
          });
        case 3:
          order = _context12.sent;
          if (order) {
            _context12.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy đơn hàng!');
        case 6:
          // Kiểm tra số tiền
          expectedAmount = order.totalAmount * 100; // VNPay amount format
          if (!(parseInt(amount) !== expectedAmount)) {
            _context12.next = 9;
            break;
          }
          throw new _ApiError["default"](400, 'Số tiền không khớp!');
        case 9:
          // Chuẩn bị dữ liệu cập nhật
          updateData = {
            paymentStatus: responseCode === '00' ? 'PAID' : 'FAILED',
            vnpTransactionNo: transactionNo,
            vnpResponseCode: responseCode
          }; // Xử lý theo kết quả thanh toán
          if (!(responseCode === '00')) {
            _context12.next = 17;
            break;
          }
          // Thanh toán thành công
          // Parse payment date
          if (payDate) {
            // Format: yyyyMMddHHmmss
            year = payDate.substring(0, 4);
            month = payDate.substring(4, 6);
            day = payDate.substring(6, 8);
            hour = payDate.substring(8, 10);
            minute = payDate.substring(10, 12);
            second = payDate.substring(12, 14);
            updateData.paidAt = new Date("".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second));
          }

          // Chuyển trạng thái đơn hàng sang CONFIRMED
          updateData.status = 'CONFIRMED';

          // Cập nhật đơn hàng
          _context12.next = 15;
          return order.update(updateData);
        case 15:
          _context12.next = 21;
          break;
        case 17:
          // Thanh toán thất bại
          updateData.status = 'CANCELLED';
          updateData.cancelledAt = new Date();

          // Sử dụng transaction để đảm bảo tính nhất quán
          _context12.next = 21;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(t) {
              var _iterator4, _step4, item;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    // Hoàn lại stock cho tất cả sản phẩm
                    _iterator4 = _createForOfIteratorHelper(order.orderItems);
                    _context11.prev = 1;
                    _iterator4.s();
                  case 3:
                    if ((_step4 = _iterator4.n()).done) {
                      _context11.next = 9;
                      break;
                    }
                    item = _step4.value;
                    _context11.next = 7;
                    return _models.Product.increment('stock', {
                      by: item.quantity,
                      where: {
                        id: item.productId
                      },
                      transaction: t
                    });
                  case 7:
                    _context11.next = 3;
                    break;
                  case 9:
                    _context11.next = 14;
                    break;
                  case 11:
                    _context11.prev = 11;
                    _context11.t0 = _context11["catch"](1);
                    _iterator4.e(_context11.t0);
                  case 14:
                    _context11.prev = 14;
                    _iterator4.f();
                    return _context11.finish(14);
                  case 17:
                    if (!order.couponId) {
                      _context11.next = 20;
                      break;
                    }
                    _context11.next = 20;
                    return _models.Coupon.decrement('usedCount', {
                      by: 1,
                      where: {
                        id: order.couponId
                      },
                      transaction: t
                    });
                  case 20:
                    _context11.next = 22;
                    return order.update(updateData, {
                      transaction: t
                    });
                  case 22:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, null, [[1, 11, 14, 17]]);
            }));
            return function (_x18) {
              return _ref12.apply(this, arguments);
            };
          }());
        case 21:
          _context12.next = 23;
          return getOrderById(order.id);
        case 23:
          return _context12.abrupt("return", _context12.sent);
        case 26:
          _context12.prev = 26;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;
        case 29:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 26]]);
  }));
  return function updatePaymentStatusByOrderNumber(_x13, _x14, _x15, _x16, _x17) {
    return _ref11.apply(this, arguments);
  };
}();
var getRevenueLast6Months = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var sixMonthsAgo, revenueData;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
          sixMonthsAgo.setDate(1);
          _context13.next = 5;
          return _models.Order.findAll({
            attributes: [[_mySQL["default"].fn('DATE_FORMAT', _mySQL["default"].col('created_at'), '%Y-%m'), 'month'], [_mySQL["default"].fn('SUM', _mySQL["default"].col('total_amount')), 'revenue']],
            where: {
              payment_status: 'PAID',
              created_at: (0, _defineProperty2["default"])({}, _sequelize.Op.gte, sixMonthsAgo)
            },
            group: [_mySQL["default"].literal("DATE_FORMAT(created_at, '%Y-%m')")],
            order: [_mySQL["default"].literal("DATE_FORMAT(created_at, '%Y-%m') ASC")]
          });
        case 5:
          revenueData = _context13.sent;
          return _context13.abrupt("return", revenueData.map(function (row) {
            return {
              month: row.get('month'),
              revenue: parseFloat(row.get('revenue'))
            };
          }));
        case 7:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function getRevenueLast6Months() {
    return _ref13.apply(this, arguments);
  };
}();
var getCurrentMonthStats = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var startOfMonth, endOfMonth, _yield$Promise$all, _yield$Promise$all2, totalOrders, successOrders, cancelledOrders, revenueData;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
          _context14.next = 4;
          return Promise.all([_models.Order.count({
            where: {
              created_at: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [startOfMonth, endOfMonth])
            }
          }), _models.Order.count({
            where: {
              payment_status: 'PAID',
              created_at: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [startOfMonth, endOfMonth])
            }
          }), _models.Order.count({
            where: {
              status: 'CANCELLED',
              created_at: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [startOfMonth, endOfMonth])
            }
          }), _models.Order.sum('total_amount', {
            where: {
              payment_status: 'PAID',
              created_at: (0, _defineProperty2["default"])({}, _sequelize.Op.between, [startOfMonth, endOfMonth])
            }
          })]);
        case 4:
          _yield$Promise$all = _context14.sent;
          _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 4);
          totalOrders = _yield$Promise$all2[0];
          successOrders = _yield$Promise$all2[1];
          cancelledOrders = _yield$Promise$all2[2];
          revenueData = _yield$Promise$all2[3];
          return _context14.abrupt("return", {
            totalOrders: totalOrders,
            successOrders: successOrders,
            cancelledOrders: cancelledOrders,
            revenue: revenueData || 0
          });
        case 11:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function getCurrentMonthStats() {
    return _ref14.apply(this, arguments);
  };
}();
var orderService = exports.orderService = {
  createOrderFromCart: createOrderFromCart,
  getOrderById: getOrderById,
  getUserOrders: getUserOrders,
  updateOrderStatus: updateOrderStatus,
  cancelOrder: cancelOrder,
  getAllOrders: getAllOrders,
  getOrderByNumber: getOrderByNumber,
  updatePaymentStatusByOrderNumber: updatePaymentStatusByOrderNumber,
  getRevenueLast6Months: getRevenueLast6Months,
  getCurrentMonthStats: getCurrentMonthStats
};