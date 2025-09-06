"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _reviewController = require("../../controllers/reviewController");
var _reviewValidation = require("../../validations/reviewValidation");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();

// Tạo đánh giá mới (cần đăng nhập)
Router.post('/', _authMiddleware.authMiddleware.isAuthorized, _reviewValidation.reviewValidation.createReviewValidation, _reviewController.reviewController.createReview);

// Lấy danh sách đánh giá của sản phẩm (public)
Router.get('/product/:productId', _reviewValidation.reviewValidation.reviewQueryValidation, _reviewController.reviewController.getProductReviews);

// Lấy thống kê rating của sản phẩm (public)
Router.get('/product/:productId/stats', _reviewController.reviewController.getProductRatingStats);

// Kiểm tra user đã đánh giá sản phẩm chưa (cần đăng nhập)
Router.get('/product/:productId/check', _authMiddleware.authMiddleware.isAuthorized, _reviewController.reviewController.checkUserReview);

// Cập nhật đánh giá (cần đăng nhập)
Router.put('/:reviewId', _authMiddleware.authMiddleware.isAuthorized, _reviewValidation.reviewValidation.updateReviewValidation, _reviewController.reviewController.updateReview);

// Xóa đánh giá (cần đăng nhập)
Router["delete"]('/:reviewId', _authMiddleware.authMiddleware.isAuthorized, _reviewController.reviewController.deleteReview);
var reviewRoute = exports.reviewRoute = Router;