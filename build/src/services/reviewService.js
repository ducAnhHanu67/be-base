"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../models");
var _ApiError = require("../utils/ApiError");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var DEFAULT_PAGE = 1;
var DEFAULT_ITEMS_PER_PAGE = 10;

/**
 * Tạo đánh giá mới
 */
var createReview = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(userId, productId, rating, comment) {
    var product, existingReview, review, createdReview;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _models.Product.findByPk(productId);
        case 3:
          product = _context.sent;
          if (product) {
            _context.next = 6;
            break;
          }
          throw new _ApiError.ApiError(404, 'Sản phẩm không tồn tại!');
        case 6:
          _context.next = 8;
          return _models.Review.findOne({
            where: {
              userId: userId,
              productId: productId
            }
          });
        case 8:
          existingReview = _context.sent;
          if (!existingReview) {
            _context.next = 11;
            break;
          }
          throw new _ApiError.ApiError(400, 'Bạn đã đánh giá sản phẩm này rồi!');
        case 11:
          _context.next = 13;
          return _models.Review.create({
            userId: userId,
            productId: productId,
            rating: rating,
            comment: comment
          });
        case 13:
          review = _context.sent;
          _context.next = 16;
          return _models.Review.findByPk(review.id, {
            include: [{
              model: _models.User,
              as: 'user',
              attributes: ['id', 'userName', 'avatar']
            }]
          });
        case 16:
          createdReview = _context.sent;
          return _context.abrupt("return", createdReview);
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function createReview(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Lấy danh sách đánh giá của sản phẩm
 */
var getProductReviews = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(productId) {
    var page,
      itemsPerPage,
      offset,
      _yield$Review$findAnd,
      data,
      count,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          page = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : DEFAULT_PAGE;
          itemsPerPage = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : DEFAULT_ITEMS_PER_PAGE;
          _context2.prev = 2;
          offset = (page - 1) * itemsPerPage;
          _context2.next = 6;
          return _models.Review.findAndCountAll({
            where: {
              productId: productId
            },
            include: [{
              model: _models.User,
              as: 'user',
              attributes: ['id', 'userName', 'avatar']
            }],
            order: [['created_at', 'DESC']],
            limit: parseInt(itemsPerPage),
            offset: parseInt(offset)
          });
        case 6:
          _yield$Review$findAnd = _context2.sent;
          data = _yield$Review$findAnd.rows;
          count = _yield$Review$findAnd.count;
          return _context2.abrupt("return", {
            data: data,
            count: count
          });
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          throw _context2.t0;
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 12]]);
  }));
  return function getProductReviews(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Cập nhật đánh giá
 */
var updateReview = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(reviewId, userId, rating, comment) {
    var review, updatedReview;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _models.Review.findOne({
            where: {
              id: reviewId,
              userId: userId
            }
          });
        case 3:
          review = _context3.sent;
          if (review) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError.ApiError(404, 'Không tìm thấy đánh giá hoặc bạn không có quyền sửa!');
        case 6:
          _context3.next = 8;
          return review.update({
            rating: rating,
            comment: comment
          });
        case 8:
          _context3.next = 10;
          return _models.Review.findByPk(reviewId, {
            include: [{
              model: _models.User,
              as: 'user',
              attributes: ['id', 'userName', 'avatar']
            }]
          });
        case 10:
          updatedReview = _context3.sent;
          return _context3.abrupt("return", updatedReview);
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function updateReview(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Xóa đánh giá
 */
var deleteReview = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(reviewId, userId) {
    var review;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _models.Review.findOne({
            where: {
              id: reviewId,
              userId: userId
            }
          });
        case 3:
          review = _context4.sent;
          if (review) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError.ApiError(404, 'Không tìm thấy đánh giá hoặc bạn không có quyền xóa!');
        case 6:
          _context4.next = 8;
          return review.destroy();
        case 8:
          return _context4.abrupt("return", review);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function deleteReview(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Lấy rating trung bình và số lượng đánh giá của sản phẩm
 */
var getProductRatingStats = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(productId) {
    var stats, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _models.Review.findAll({
            where: {
              productId: productId
            },
            attributes: [[_mySQL["default"].fn('AVG', _mySQL["default"].col('rating')), 'avgRating'], [_mySQL["default"].fn('COUNT', _mySQL["default"].col('id')), 'totalReviews'], [_mySQL["default"].fn('COUNT', _mySQL["default"].literal('CASE WHEN rating = 5 THEN 1 END')), 'fiveStars'], [_mySQL["default"].fn('COUNT', _mySQL["default"].literal('CASE WHEN rating = 4 THEN 1 END')), 'fourStars'], [_mySQL["default"].fn('COUNT', _mySQL["default"].literal('CASE WHEN rating = 3 THEN 1 END')), 'threeStars'], [_mySQL["default"].fn('COUNT', _mySQL["default"].literal('CASE WHEN rating = 2 THEN 1 END')), 'twoStars'], [_mySQL["default"].fn('COUNT', _mySQL["default"].literal('CASE WHEN rating = 1 THEN 1 END')), 'oneStar']],
            raw: true
          });
        case 3:
          stats = _context5.sent;
          result = stats[0];
          return _context5.abrupt("return", {
            avgRating: parseFloat(result.avgRating) || 0,
            totalReviews: parseInt(result.totalReviews) || 0,
            ratingDistribution: {
              5: parseInt(result.fiveStars) || 0,
              4: parseInt(result.fourStars) || 0,
              3: parseInt(result.threeStars) || 0,
              2: parseInt(result.twoStars) || 0,
              1: parseInt(result.oneStar) || 0
            }
          });
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getProductRatingStats(_x12) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Kiểm tra user đã đánh giá sản phẩm chưa
 */
var checkUserReview = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(userId, productId) {
    var review;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _models.Review.findOne({
            where: {
              userId: userId,
              productId: productId
            },
            include: [{
              model: _models.User,
              as: 'user',
              attributes: ['id', 'userName', 'avatar']
            }]
          });
        case 3:
          review = _context6.sent;
          return _context6.abrupt("return", review);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function checkUserReview(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
var reviewService = exports.reviewService = {
  createReview: createReview,
  getProductReviews: getProductReviews,
  updateReview: updateReview,
  deleteReview: deleteReview,
  getProductRatingStats: getProductRatingStats,
  checkUserReview: checkUserReview
};