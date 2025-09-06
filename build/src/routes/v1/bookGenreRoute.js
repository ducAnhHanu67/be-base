"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookGenreRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _bookGenreController = require("../../controllers/bookGenreController");
var _bookGenreValidation = require("../../validations/bookGenreValidation");
var Router = _express["default"].Router();
Router.route('/').get(_bookGenreController.bookGenreController.getBookGenres).post(_bookGenreValidation.bookGenreValidation.validate, _bookGenreController.bookGenreController.create);
Router.route('/:id').put(_bookGenreValidation.bookGenreValidation.validate, _bookGenreController.bookGenreController.update)["delete"](_bookGenreController.bookGenreController.deleteById);
var bookGenreRoute = exports.bookGenreRoute = Router;