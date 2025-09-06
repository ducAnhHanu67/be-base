"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoryService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _Category = _interopRequireDefault(require("../models/Category"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _constants = require("../utils/constants");
var getCategories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(page, itemsPerPage, queryFilter) {
    var offset, whereClause, _yield$Category$findA, data, count;
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
          return _Category["default"].findAndCountAll({
            where: whereClause,
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['updatedAt', 'DESC']]
          });
        case 7:
          _yield$Category$findA = _context.sent;
          data = _yield$Category$findA.rows;
          count = _yield$Category$findA.count;
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
  return function getCategories(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getCategoryById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(categoryId) {
    var category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Category["default"].findByPk(categoryId);
        case 3:
          category = _context2.sent;
          return _context2.abrupt("return", category);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getCategoryById(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(reqBody) {
    var existCategory, createdCategory;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Category["default"].findOne({
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase())
          });
        case 3:
          existCategory = _context3.sent;
          if (!existCategory) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Danh mục đã tồn tại!');
        case 6:
          _context3.next = 8;
          return _Category["default"].create(reqBody);
        case 8:
          createdCategory = _context3.sent;
          return _context3.abrupt("return", createdCategory);
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
  return function create(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(categoryId, reqBody) {
    var existCategory, updatedCategory;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Category["default"].findOne({
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase())
          });
        case 3:
          existCategory = _context4.sent;
          if (!existCategory) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Danh mục đã tồn tại!');
        case 6:
          _context4.next = 8;
          return _Category["default"].update(reqBody, {
            where: {
              id: categoryId
            }
          });
        case 8:
          updatedCategory = _context4.sent;
          return _context4.abrupt("return", updatedCategory);
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function update(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(categoryId) {
    var deletedCategory;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Category["default"].destroy({
            where: {
              id: categoryId
            }
          });
        case 3:
          deletedCategory = _context5.sent;
          if (deletedCategory) {
            _context5.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Xóa thất bại!');
        case 6:
          return _context5.abrupt("return", deletedCategory);
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function deleteById(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var categoryService = exports.categoryService = {
  getCategories: getCategories,
  getCategoryById: getCategoryById,
  create: create,
  update: update,
  deleteById: deleteById
};