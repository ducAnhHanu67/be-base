"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _productValidation = require("../../validations/productValidation");
var _productController = require("../../controllers/productController");
var _multerUploadMiddleware = require("../../middlewares/multerUploadMiddleware");
var Router = _express["default"].Router();
Router.route('/categories').get(_productController.productController.getCategories);
Router.route('/book-genres').get(_productController.productController.getBookGenres);
Router.route('/search').get(_productValidation.productValidation.validateSearch, _productController.productController.searchAndFilterProducts);
Router.route('/').get(_productController.productController.getProducts).post(_multerUploadMiddleware.multerUploadMiddleware.upload.single('coverImageUrl'), _productValidation.productValidation.validate, _productController.productController.create);
Router.route('/trend-products').get(_productController.productController.getProductTrend);
Router.route('/:id').get(_productController.productController.getProductById).put(_multerUploadMiddleware.multerUploadMiddleware.upload.single('coverImageUrl'), _productValidation.productValidation.validate, _productController.productController.update)["delete"](_productController.productController.deleteById);
var productRoute = exports.productRoute = Router;