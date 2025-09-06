"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _reviewService = require("../services/reviewService");
/**
 * Tạo đánh giá mới
 */
var createReview = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userId, _req$body, productId, rating, comment, review;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$body = req.body, productId = _req$body.productId, rating = _req$body.rating, comment = _req$body.comment;
          if (!(!productId || !rating)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'productId và rating là bắt buộc!'
          }));
        case 5:
          if (!(rating < 1 || rating > 5)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Rating phải từ 1 đến 5!'
          }));
        case 7:
          _context.next = 9;
          return _reviewService.reviewService.createReview(userId, productId, rating, comment);
        case 9:
          review = _context.sent;
          res.status(201).json({
            message: 'Tạo đánh giá thành công!',
            data: review
          });
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function createReview(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lấy danh sách đánh giá của sản phẩm
 */
var getProductReviews = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var productId, _req$query, _req$query$page, page, _req$query$itemsPerPa, itemsPerPage, reviews;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          productId = req.params.productId;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$itemsPerPa = _req$query.itemsPerPage, itemsPerPage = _req$query$itemsPerPa === void 0 ? 10 : _req$query$itemsPerPa;
          _context2.next = 5;
          return _reviewService.reviewService.getProductReviews(productId, page, itemsPerPage);
        case 5:
          reviews = _context2.sent;
          res.status(200).json({
            message: 'Lấy danh sách đánh giá thành công!',
            data: reviews.data,
            count: reviews.count,
            pagination: {
              currentPage: parseInt(page),
              totalPages: Math.ceil(reviews.count / itemsPerPage),
              itemsPerPage: parseInt(itemsPerPage)
            }
          });
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
  return function getProductReviews(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Cập nhật đánh giá
 */
var updateReview = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userId, reviewId, _req$body2, rating, comment, review;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          reviewId = req.params.reviewId;
          _req$body2 = req.body, rating = _req$body2.rating, comment = _req$body2.comment;
          if (rating) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Rating là bắt buộc!'
          }));
        case 6:
          if (!(rating < 1 || rating > 5)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Rating phải từ 1 đến 5!'
          }));
        case 8:
          _context3.next = 10;
          return _reviewService.reviewService.updateReview(reviewId, userId, rating, comment);
        case 10:
          review = _context3.sent;
          res.status(200).json({
            message: 'Cập nhật đánh giá thành công!',
            data: review
          });
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function updateReview(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Xóa đánh giá
 */
var deleteReview = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, reviewId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          reviewId = req.params.reviewId;
          _context4.next = 5;
          return _reviewService.reviewService.deleteReview(reviewId, userId);
        case 5:
          res.status(200).json({
            message: 'Xóa đánh giá thành công!'
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function deleteReview(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Lấy thống kê rating của sản phẩm
 */
var getProductRatingStats = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var productId, stats;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          productId = req.params.productId;
          _context5.next = 4;
          return _reviewService.reviewService.getProductRatingStats(productId);
        case 4:
          stats = _context5.sent;
          res.status(200).json({
            message: 'Lấy thống kê rating thành công!',
            data: stats
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
  return function getProductRatingStats(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Kiểm tra user đã đánh giá sản phẩm chưa
 */
var checkUserReview = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, productId, review;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.user.id;
          productId = req.params.productId;
          _context6.next = 5;
          return _reviewService.reviewService.checkUserReview(userId, productId);
        case 5:
          review = _context6.sent;
          res.status(200).json({
            message: 'Kiểm tra đánh giá thành công!',
            data: review
          });
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
  return function checkUserReview(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var reviewController = exports.reviewController = {
  createReview: createReview,
  getProductReviews: getProductReviews,
  updateReview: updateReview,
  deleteReview: deleteReview,
  getProductRatingStats: getProductRatingStats,
  checkUserReview: checkUserReview
};