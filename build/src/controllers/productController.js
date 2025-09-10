"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _productService = require("../services/productService");
var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var productFile, createProduct;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          productFile = req.file;
          _context.next = 4;
          return _productService.productService.create(req.body, productFile);
        case 4:
          createProduct = _context.sent;
          res.status(201).json(createProduct);
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
  return function create(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getProducts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$query, page, itemsPerPage, search, products;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, page = _req$query.page, itemsPerPage = _req$query.itemsPerPage, search = _req$query.search;
          _context2.next = 4;
          return _productService.productService.getProducts(page, itemsPerPage, search);
        case 4:
          products = _context2.sent;
          res.status(201).json(products);
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
  return function getProducts(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getProductById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var productId, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          productId = req.params.id;
          _context3.next = 4;
          return _productService.productService.getProductById(productId);
        case 4:
          product = _context3.sent;
          res.status(200).json(product);
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
  return function getProductById(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var productId, productFile, updatedProduct;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log(req.body);
          productId = req.params.id;
          productFile = req.file;
          _context4.next = 6;
          return _productService.productService.update(productId, req.body, productFile);
        case 6:
          updatedProduct = _context4.sent;
          res.status(201).json(updatedProduct);
          _context4.next = 13;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function update(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var productId, deletedProduct;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          productId = req.params.id;
          _context5.next = 4;
          return _productService.productService.deleteById(productId);
        case 4:
          deletedProduct = _context5.sent;
          res.status(201).json(deletedProduct);
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
var getCategories = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var categories;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _productService.productService.getCategories();
        case 3:
          categories = _context6.sent;
          res.status(201).json(categories);
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getCategories(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var getBookGenres = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var bookGenres;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _productService.productService.getBookGenres();
        case 3:
          bookGenres = _context7.sent;
          res.status(201).json(bookGenres);
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function getBookGenres(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var searchAndFilterProducts = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var filters, products;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          filters = {
            page: req.query.page,
            itemsPerPage: req.query.itemsPerPage,
            search: req.query.search,
            type: req.query.type,
            bookGenreId: req.query.bookGenreId,
            language: req.query.language,
            categoryId: req.query.categoryId,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            isTrend: req.query.isTrend
          };
          _context8.next = 4;
          return _productService.productService.searchAndFilterProducts(filters);
        case 4:
          products = _context8.sent;
          res.status(200).json(products);
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function searchAndFilterProducts(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
var getProductTrend = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _productService.productService.getTopTrendingProducts();
        case 3:
          products = _context9.sent;
          res.status(200).json({
            success: true,
            data: products
          });
          _context9.next = 10;
          break;
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function getProductTrend(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();
var getFlashSales = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var flashSales;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _productService.productService.getFlashSaleProducts();
        case 3:
          flashSales = _context10.sent;
          res.status(200).json({
            success: true,
            data: flashSales
          });
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function getFlashSales(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();
var getProductsByCategory = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var _req$query2, categoryId, limit, products;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$query2 = req.query, categoryId = _req$query2.categoryId, limit = _req$query2.limit;
          _context11.next = 4;
          return _productService.productService.getProductsByCategory(categoryId, limit || 5);
        case 4:
          products = _context11.sent;
          res.status(200).json({
            success: true,
            data: products
          });
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return function getProductsByCategory(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();
var getProductSuggest = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var keyword, products;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          keyword = req.query.keyword;
          _context12.next = 4;
          return _productService.productService.getProductSuggest(keyword);
        case 4:
          products = _context12.sent;
          res.status(200).json({
            success: true,
            data: products
          });
          _context12.next = 11;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          next(_context12.t0);
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function getProductSuggest(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();
var productController = exports.productController = {
  create: create,
  getProducts: getProducts,
  getProductById: getProductById,
  update: update,
  deleteById: deleteById,
  getCategories: getCategories,
  getBookGenres: getBookGenres,
  searchAndFilterProducts: searchAndFilterProducts,
  getProductTrend: getProductTrend,
  getFlashSales: getFlashSales,
  getProductsByCategory: getProductsByCategory,
  getProductSuggest: getProductSuggest
};