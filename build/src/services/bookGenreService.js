"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookGenreService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _BookGenre = _interopRequireDefault(require("../models/BookGenre"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _constants = require("../utils/constants");
var getBookGenres = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(page, itemsPerPage, queryFilter) {
    var offset, whereClause, _yield$BookGenre$find, data, count;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (!page) page = _constants.DEFAULT_PAGE;
          if (!itemsPerPage) itemsPerPage = _constants.DEFAULT_ITEMS_PER_PAGE;
          offset = (page - 1) * itemsPerPage;
          whereClause = queryFilter ? {
            name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(queryFilter, "%"))
          } : {};
          _context.next = 7;
          return _BookGenre["default"].findAndCountAll({
            where: whereClause,
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['updatedAt', 'DESC']]
          });
        case 7:
          _yield$BookGenre$find = _context.sent;
          data = _yield$BookGenre$find.rows;
          count = _yield$BookGenre$find.count;
          return _context.abrupt("return", {
            data: data,
            count: count
          });
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function getBookGenres(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(reqBody) {
    var existBookGenre, createdBookGenre;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _BookGenre["default"].findOne({
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase())
          });
        case 3:
          existBookGenre = _context2.sent;
          if (!existBookGenre) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Thể loại sách đã tồn tại!');
        case 6:
          _context2.next = 8;
          return _BookGenre["default"].create(reqBody);
        case 8:
          createdBookGenre = _context2.sent;
          return _context2.abrupt("return", createdBookGenre);
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function create(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(bookGenreId, reqBody) {
    var existBookGenre, updatedBookGenre;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _BookGenre["default"].findOne({
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase())
          });
        case 3:
          existBookGenre = _context3.sent;
          if (!existBookGenre) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Thể loại sách đã tồn tại!');
        case 6:
          _context3.next = 8;
          return _BookGenre["default"].update(reqBody, {
            where: {
              id: bookGenreId
            }
          });
        case 8:
          updatedBookGenre = _context3.sent;
          return _context3.abrupt("return", updatedBookGenre);
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          throw _context3.t0;
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function update(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(bookGenreId) {
    var deletedBookGenre;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _BookGenre["default"].destroy({
            where: {
              id: bookGenreId
            }
          });
        case 3:
          deletedBookGenre = _context4.sent;
          if (deletedBookGenre) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Xóa thất bại!');
        case 6:
          return _context4.abrupt("return", deletedBookGenre);
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function deleteById(_x7) {
    return _ref4.apply(this, arguments);
  };
}();
var bookGenreService = exports.bookGenreService = {
  getBookGenres: getBookGenres,
  create: create,
  update: update,
  deleteById: deleteById
};