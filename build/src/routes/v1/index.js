"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIs_V1 = void 0;
var _express = _interopRequireDefault(require("express"));
var _userRoute = require("./userRoute");
var _categoryRoute = require("./categoryRoute");
var _bookGenreRoute = require("./bookGenreRoute");
var _productRoute = require("./productRoute");
var _couponRoute = require("./couponRoute");
var _cartRoute = require("./cartRoute");
var _orderRoute = require("./orderRoute");
var _reviewRoute = require("./reviewRoute");
var _addressRoute = require("./addressRoute");
var Router = _express["default"].Router();

// Check API v1/status
Router.get('/status', function (req, res) {
  res.status(200).json({
    message: 'APIs V1 are ready to use. dau lam day'
  });
});

// User API
Router.use('/users', _userRoute.userRoute);
Router.use('/categories', _categoryRoute.categoryRoute);
Router.use('/book-genres', _bookGenreRoute.bookGenreRoute);
Router.use('/products', _productRoute.productRoute);
Router.use('/coupons', _couponRoute.couponRoute);
Router.use('/cart', _cartRoute.cartRoute);
Router.use('/orders', _orderRoute.orderRoute);
Router.use('/reviews', _reviewRoute.reviewRoute);
Router.use('/addresses', _addressRoute.addressRoute);
var APIs_V1 = exports.APIs_V1 = Router;