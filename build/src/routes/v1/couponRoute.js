"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.couponRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _couponValidation = require("../../validations/couponValidation");
var _couponController = require("../../controllers/couponController");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();
Router.route('/').get(_couponController.couponController.getCoupons).post(_authMiddleware.authMiddleware.isAuthorized, _couponValidation.couponValidation.createNew, _couponController.couponController.createNew);
Router.route('/:id').get(_couponController.couponController.getCouponById).put(_authMiddleware.authMiddleware.isAuthorized, _couponValidation.couponValidation.update, _couponController.couponController.update)["delete"](_authMiddleware.authMiddleware.isAuthorized, _couponController.couponController.deleteById);
Router.route('/code/:code').get(_couponController.couponController.getCouponByCode);
Router.route('/apply').post(_couponValidation.couponValidation.applyCoupon, _couponController.couponController.applyCoupon);
var couponRoute = exports.couponRoute = Router;