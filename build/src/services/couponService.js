"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.couponService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Coupon = _interopRequireDefault(require("../models/Coupon"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _sequelize = require("sequelize");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var getCoupons = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(queryFilters) {
    var _queryFilters$page, page, _queryFilters$limit, limit, search, isActive, type, status, offset, whereClause, currentDate, searchConditions, usageLimitConditions, _yield$Coupon$findAnd, count, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _queryFilters$page = queryFilters.page, page = _queryFilters$page === void 0 ? 1 : _queryFilters$page, _queryFilters$limit = queryFilters.limit, limit = _queryFilters$limit === void 0 ? 10 : _queryFilters$limit, search = queryFilters.search, isActive = queryFilters.isActive, type = queryFilters.type, status = queryFilters.status;
          offset = (page - 1) * limit;
          whereClause = {};
          currentDate = new Date(); // Build search conditions
          searchConditions = [];
          if (search) {
            searchConditions.push({
              code: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.like, "%".concat(search, "%"))
            }, {
              name: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.like, "%".concat(search, "%"))
            });
          }
          if (isActive !== undefined) {
            whereClause.isActive = isActive === 'true';
          }
          if (type) {
            whereClause.type = type;
          }

          // Filter for active status - chỉ lấy voucher thực sự có thể sử dụng
          if (status === 'active') {
            whereClause.isActive = true; // Voucher phải được active
            whereClause.startDate = (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.lte, currentDate); // Đã đến hạn sử dụng
            whereClause.endDate = (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.gte, currentDate); // Chưa quá hạn

            // Thêm điều kiện cho voucher chưa sử dụng hết
            usageLimitConditions = [{
              usageLimit: null
            }, // Không giới hạn số lần sử dụng
            (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.and, [{
              usageLimit: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.not, null)
            }, _sequelize.Sequelize.where(_sequelize.Sequelize.col('usedCount'), _sequelize.Sequelize.Op.lt, _sequelize.Sequelize.col('usageLimit'))])]; // Combine search and usage limit conditions properly
            if (searchConditions.length > 0) {
              whereClause[_sequelize.Sequelize.Op.and] = [(0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.or, searchConditions), (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.or, usageLimitConditions)];
            } else {
              whereClause[_sequelize.Sequelize.Op.or] = usageLimitConditions;
            }
          } else if (searchConditions.length > 0) {
            // Only search conditions, no active status filter
            whereClause[_sequelize.Sequelize.Op.or] = searchConditions;
          }
          _context.next = 12;
          return _Coupon["default"].findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
          });
        case 12:
          _yield$Coupon$findAnd = _context.sent;
          count = _yield$Coupon$findAnd.count;
          rows = _yield$Coupon$findAnd.rows;
          return _context.abrupt("return", {
            coupons: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
          });
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return function getCoupons(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getCouponById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(couponId) {
    var coupon;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Coupon["default"].findByPk(couponId);
        case 3:
          coupon = _context2.sent;
          if (coupon) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy mã giảm giá!');
        case 6:
          return _context2.abrupt("return", coupon);
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getCouponById(_x2) {
    return _ref5.apply(this, arguments);
  };
}();
var getCouponByCode = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(code) {
    var coupon;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Coupon["default"].findOne({
            where: {
              code: code.toUpperCase()
            }
          });
        case 3:
          coupon = _context3.sent;
          if (coupon) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Mã giảm giá không tồn tại!');
        case 6:
          return _context3.abrupt("return", coupon);
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getCouponByCode(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(reqBody) {
    var existCoupon, couponData, createdCoupon;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Coupon["default"].findOne({
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('UPPER', _sequelize.Sequelize.col('code')), reqBody.code.toUpperCase())
          });
        case 3:
          existCoupon = _context4.sent;
          if (!existCoupon) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Mã giảm giá đã tồn tại!');
        case 6:
          if (!(reqBody.type === 'PERCENTAGE' && reqBody.value > 100)) {
            _context4.next = 8;
            break;
          }
          throw new _ApiError["default"](422, 'Giá trị phần trăm không được vượt quá 100%');
        case 8:
          couponData = _objectSpread(_objectSpread({}, reqBody), {}, {
            code: reqBody.code.toUpperCase()
          });
          _context4.next = 11;
          return _Coupon["default"].create(couponData);
        case 11:
          createdCoupon = _context4.sent;
          return _context4.abrupt("return", createdCoupon);
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function create(_x4) {
    return _ref7.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(couponId, reqBody) {
    var existCoupon, duplicateCoupon, updateData, updatedCoupon;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Coupon["default"].findByPk(couponId);
        case 3:
          existCoupon = _context5.sent;
          if (existCoupon) {
            _context5.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy mã giảm giá!');
        case 6:
          if (!reqBody.code) {
            _context5.next = 12;
            break;
          }
          _context5.next = 9;
          return _Coupon["default"].findOne({
            where: {
              code: reqBody.code.toUpperCase(),
              id: (0, _defineProperty2["default"])({}, _sequelize.Sequelize.Op.ne, couponId)
            }
          });
        case 9:
          duplicateCoupon = _context5.sent;
          if (!duplicateCoupon) {
            _context5.next = 12;
            break;
          }
          throw new _ApiError["default"](409, 'Mã giảm giá đã tồn tại!');
        case 12:
          if (!(reqBody.type === 'PERCENTAGE' && reqBody.value > 100)) {
            _context5.next = 14;
            break;
          }
          throw new _ApiError["default"](422, 'Giá trị phần trăm không được vượt quá 100%');
        case 14:
          if (!(reqBody.endDate && reqBody.startDate && new Date(reqBody.endDate) <= new Date(reqBody.startDate))) {
            _context5.next = 16;
            break;
          }
          throw new _ApiError["default"](422, 'Ngày kết thúc phải sau ngày bắt đầu');
        case 16:
          updateData = _objectSpread({}, reqBody);
          if (reqBody.code) {
            updateData.code = reqBody.code.toUpperCase();
          }
          _context5.next = 20;
          return _Coupon["default"].update(updateData, {
            where: {
              id: couponId
            }
          });
        case 20:
          _context5.next = 22;
          return _Coupon["default"].findByPk(couponId);
        case 22:
          updatedCoupon = _context5.sent;
          return _context5.abrupt("return", updatedCoupon);
        case 26:
          _context5.prev = 26;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 26]]);
  }));
  return function update(_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(couponId) {
    var existCoupon, deletedCount;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Coupon["default"].findByPk(couponId);
        case 3:
          existCoupon = _context6.sent;
          if (existCoupon) {
            _context6.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy mã giảm giá!');
        case 6:
          _context6.next = 8;
          return _Coupon["default"].destroy({
            where: {
              id: couponId
            }
          });
        case 8:
          deletedCount = _context6.sent;
          if (deletedCount) {
            _context6.next = 11;
            break;
          }
          throw new _ApiError["default"](409, 'Xóa thất bại!');
        case 11:
          return _context6.abrupt("return", deletedCount);
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function deleteById(_x7) {
    return _ref9.apply(this, arguments);
  };
}();
var applyCoupon = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(code, orderAmount) {
    var coupon, currentDate, discountAmount;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return getCouponByCode(code);
        case 3:
          coupon = _context7.sent;
          if (coupon.isActive) {
            _context7.next = 6;
            break;
          }
          throw new _ApiError["default"](400, 'Mã giảm giá đã bị vô hiệu hóa!');
        case 6:
          currentDate = new Date();
          if (!(currentDate < new Date(coupon.startDate))) {
            _context7.next = 9;
            break;
          }
          throw new _ApiError["default"](400, 'Mã giảm giá chưa có hiệu lực!');
        case 9:
          if (!(currentDate > new Date(coupon.endDate))) {
            _context7.next = 11;
            break;
          }
          throw new _ApiError["default"](400, 'Mã giảm giá đã hết hạn!');
        case 11:
          if (!(coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)) {
            _context7.next = 13;
            break;
          }
          throw new _ApiError["default"](400, 'Mã giảm giá đã hết lượt sử dụng!');
        case 13:
          if (!(orderAmount < coupon.minOrderAmount)) {
            _context7.next = 15;
            break;
          }
          throw new _ApiError["default"](400, "\u0110\u01A1n h\xE0ng t\u1ED1i thi\u1EC3u ".concat(coupon.minOrderAmount.toLocaleString('vi-VN'), "\u0111 \u0111\u1EC3 \xE1p d\u1EE5ng m\xE3 gi\u1EA3m gi\xE1 n\xE0y"));
        case 15:
          discountAmount = 0;
          if (coupon.type === 'PERCENTAGE') {
            discountAmount = orderAmount * coupon.value / 100;
            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
              discountAmount = coupon.maxDiscountAmount;
            }
          } else {
            // FIXED_AMOUNT
            discountAmount = coupon.value;
            // Apply maxDiscountAmount limit for FIXED_AMOUNT as well
            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
              discountAmount = coupon.maxDiscountAmount;
            }
            if (discountAmount > orderAmount) {
              discountAmount = orderAmount;
            }
          }
          return _context7.abrupt("return", {
            coupon: coupon,
            discountAmount: Math.round(discountAmount),
            finalAmount: orderAmount - Math.round(discountAmount)
          });
        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 20]]);
  }));
  return function applyCoupon(_x8, _x9) {
    return _ref10.apply(this, arguments);
  };
}();
var incrementUsedCount = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(couponId) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Coupon["default"].increment('usedCount', {
            where: {
              id: couponId
            }
          });
        case 3:
          _context8.next = 8;
          break;
        case 5:
          _context8.prev = 5;
          _context8.t0 = _context8["catch"](0);
          throw _context8.t0;
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 5]]);
  }));
  return function incrementUsedCount(_x10) {
    return _ref11.apply(this, arguments);
  };
}();
var couponService = exports.couponService = {
  getCoupons: getCoupons,
  getCouponById: getCouponById,
  getCouponByCode: getCouponByCode,
  create: create,
  update: update,
  deleteById: deleteById,
  applyCoupon: applyCoupon,
  incrementUsedCount: incrementUsedCount
};