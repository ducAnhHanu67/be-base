"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _categoryController = require("../../controllers/categoryController");
var _categoryValidation = require("../../validations/categoryValidation");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();
Router.route('/').get(_authMiddleware.authMiddleware.isAuthorized, _categoryController.categoryController.getCategories).post(_categoryValidation.categoryValidation.validate, _categoryController.categoryController.create);
Router.route('/:id').get(_categoryController.categoryController.getCategoryById).put(_categoryValidation.categoryValidation.validate, _categoryController.categoryController.update)["delete"](_categoryController.categoryController.deleteById);
var categoryRoute = exports.categoryRoute = Router;