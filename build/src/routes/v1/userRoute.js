"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _userValidation = require("../../validations/userValidation");
var _userController = require("../../controllers/userController");
var _authMiddleware = require("../../middlewares/authMiddleware");
var Router = _express["default"].Router();

// User routes
Router.route('/register').post(_userValidation.userValidation.createNew, _userController.userController.createNew);
Router.route('/login').post(_userValidation.userValidation.login, _userController.userController.login);
Router.route('/google-login').post(_userValidation.userValidation.googleLogin, _userController.userController.googleLogin);
Router.route('/logout')["delete"](_userController.userController.logout);
Router.route('/refresh-token').get(_userController.userController.refreshToken);
Router.route('/profile').get(_authMiddleware.authMiddleware.isAuthorized, _userController.userController.getProfile).put(_authMiddleware.authMiddleware.isAuthorized, _userValidation.userValidation.update, _userController.userController.update);

// New profile management routes
Router.route('/profile/update').put(_authMiddleware.authMiddleware.isAuthorized, _userValidation.userValidation.updateProfile, _userController.userController.updateProfile);
Router.route('/profile/change-password').put(_authMiddleware.authMiddleware.isAuthorized, _userValidation.userValidation.updatePassword, _userController.userController.updatePassword);

// Admin routes - yêu cầu xác thực và quyền admin
Router.route('/admin/users').get(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdmin, _userController.userController.getAllUsers).post(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdmin, _userValidation.userValidation.createUserByAdmin, _userController.userController.createUserByAdmin);
Router.route('/admin/users/:userId').put(_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdmin, _userValidation.userValidation.validateUserId, _userValidation.userValidation.updateUserByAdmin, _userController.userController.updateUserByAdmin)["delete"](_authMiddleware.authMiddleware.isAuthorized, _authMiddleware.authMiddleware.isAdmin, _userValidation.userValidation.validateUserId, _userController.userController.deleteUser);
var userRoute = exports.userRoute = Router;