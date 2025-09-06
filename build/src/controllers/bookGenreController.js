"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookGenreController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bookGenreService = require("../services/bookGenreService");
// import ApiError from '~/utils/ApiError'

var getBookGenres = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$query, page, itemsPerPage, search, bookGenres;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, page = _req$query.page, itemsPerPage = _req$query.itemsPerPage, search = _req$query.search;
          _context.next = 4;
          return _bookGenreService.bookGenreService.getBookGenres(page, itemsPerPage, search);
        case 4:
          bookGenres = _context.sent;
          res.status(200).json(bookGenres);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getBookGenres(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var createdBookGenres;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _bookGenreService.bookGenreService.create(req.body);
        case 3:
          createdBookGenres = _context2.sent;
          res.status(201).json(createdBookGenres);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function create(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var bookGenreId, updatedBookGenre;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          bookGenreId = req.params.id;
          _context3.next = 4;
          return _bookGenreService.bookGenreService.update(bookGenreId, req.body);
        case 4:
          updatedBookGenre = _context3.sent;
          res.status(200).json(updatedBookGenre);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function update(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var bookGenreId, deletedBookGenre;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          bookGenreId = req.params.id;
          _context4.next = 4;
          return _bookGenreService.bookGenreService.deleteById(bookGenreId);
        case 4:
          deletedBookGenre = _context4.sent;
          res.status(204).json(deletedBookGenre);
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
  return function deleteById(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var bookGenreController = exports.bookGenreController = {
  getBookGenres: getBookGenres,
  create: create,
  update: update,
  deleteById: deleteById
};