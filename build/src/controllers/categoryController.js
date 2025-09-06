"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _categoryService = require("../services/categoryService");
// import ApiError from '~/utils/ApiError'

var getCategories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$query, page, itemsPerPage, search, queryFilter, categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, page = _req$query.page, itemsPerPage = _req$query.itemsPerPage, search = _req$query.search;
          queryFilter = search;
          _context.next = 5;
          return _categoryService.categoryService.getCategories(page, itemsPerPage, queryFilter);
        case 5:
          categories = _context.sent;
          res.status(200).json(categories);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getCategories(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getCategoryById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var categoryId, category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          categoryId = req.params.id;
          _context2.next = 4;
          return _categoryService.categoryService.getCategoryById(categoryId);
        case 4:
          category = _context2.sent;
          res.status(200).json(category);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getCategoryById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var createdCategory;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _categoryService.categoryService.create(req.body);
        case 3:
          createdCategory = _context3.sent;
          res.status(201).json(createdCategory);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function create(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var categoryId, updatedCategory;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          categoryId = req.params.id;
          _context4.next = 4;
          return _categoryService.categoryService.update(categoryId, req.body);
        case 4:
          updatedCategory = _context4.sent;
          res.status(200).json(updatedCategory);
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
  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var categoryId, deletedCategory;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          categoryId = req.params.id;
          _context5.next = 4;
          return _categoryService.categoryService.deleteById(categoryId);
        case 4:
          deletedCategory = _context5.sent;
          res.status(204).json(deletedCategory);
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
  return function deleteById(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var categoryController = exports.categoryController = {
  getCategories: getCategories,
  getCategoryById: getCategoryById,
  create: create,
  update: update,
  deleteById: deleteById
};