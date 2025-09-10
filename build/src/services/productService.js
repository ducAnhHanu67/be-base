"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var _models = require("../models");
var _ProductHighlight = _interopRequireDefault(require("../models/ProductHighlight"));
var _UploadImageProvider = require("../providers/UploadImageProvider");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _constants = require("../utils/constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var getProducts = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(page, itemsPerPage, queryFilter) {
    var offset, whereClause, _yield$Product$findAn, data, count;
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
          return _models.Product.findAndCountAll({
            where: whereClause,
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['updatedAt', 'DESC']],
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'],
            include: [{
              model: _models.BookDetail,
              as: 'bookDetail',
              required: false,
              attributes: ['bookGenreId', 'author', 'translator', 'language', 'publisher', 'publishYear', 'pageCount'],
              on: _sequelize.Sequelize.literal('Product.id = bookDetail.product_id AND Product.type = "BOOK"')
            }, {
              model: _models.StationeryDetail,
              as: 'stationeryDetail',
              required: false,
              attributes: ['brand', 'placeProduction', 'color', 'material'],
              on: _sequelize.Sequelize.literal('Product.id = stationeryDetail.product_id AND Product.type = "STATIONERY"')
            }, {
              model: _models.Category,
              as: 'category',
              required: false,
              attributes: ['id', 'name']
            }, {
              model: _models.ProductImage,
              as: 'productImages',
              required: false
            }, {
              model: _ProductHighlight["default"],
              as: 'highlights',
              required: false,
              attributes: ['id', 'key', 'value']
            }]
          });
        case 7:
          _yield$Product$findAn = _context.sent;
          data = _yield$Product$findAn.rows;
          count = _yield$Product$findAn.count;
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
  return function getProducts(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getProductSuggest = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(keyword) {
    var products;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models.Product.findAll({
            where: {
              name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(keyword, "%"))
            },
            attributes: ['id', 'name', 'price', 'coverImageUrl'],
            limit: 8
          });
        case 3:
          products = _context2.sent;
          return _context2.abrupt("return", products);
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
  return function getProductSuggest(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getProductsByCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(categoryId) {
    var limit,
      products,
      _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          limit = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 10;
          _context3.prev = 1;
          _context3.next = 4;
          return _models.Product.findAll({
            where: {
              categoryId: parseInt(categoryId, 10)
            },
            order: [['updatedAt', 'DESC']],
            limit: parseInt(limit, 10),
            // thêm dòng này để giới hạn số record
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'],
            include: [{
              model: _models.Category,
              as: 'category',
              attributes: ['id', 'name']
            }, {
              model: _models.ProductImage,
              as: 'productImages',
              required: false
            }]
          });
        case 4:
          products = _context3.sent;
          return _context3.abrupt("return", products);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          throw _context3.t0;
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function getProductsByCategory(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getFlashSaleProducts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var now, flashSaleProducts;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          now = new Date();
          _context4.next = 4;
          return _models.FlashSale.findAll({
            where: {
              startTime: (0, _defineProperty2["default"])({}, _sequelize.Op.lte, now),
              endTime: (0, _defineProperty2["default"])({}, _sequelize.Op.gte, now)
            },
            attributes: ['id', 'flashPrice', 'startTime', 'endTime'],
            include: [{
              model: _models.Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'],
              include: [{
                model: _models.Category,
                as: 'category',
                attributes: ['id', 'name']
              }, {
                model: _models.ProductImage,
                as: 'productImages',
                required: false
              }, {
                model: _models.BookDetail,
                as: 'bookDetail',
                required: false
              }, {
                model: _models.StationeryDetail,
                as: 'stationeryDetail',
                required: false
              }]
            }],
            order: [['startTime', 'ASC']]
          });
        case 4:
          flashSaleProducts = _context4.sent;
          return _context4.abrupt("return", flashSaleProducts);
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error('🔥 Error in getFlashSaleProducts:', _context4.t0);
          throw _context4.t0;
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getFlashSaleProducts() {
    return _ref4.apply(this, arguments);
  };
}();
var getProductById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(productId) {
    var product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _models.Product.findOne({
            where: {
              id: productId
            },
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'],
            include: [{
              model: _models.BookDetail,
              as: 'bookDetail',
              required: false,
              attributes: ['bookGenreId', 'author', 'translator', 'language', 'publisher', 'publishYear', 'pageCount'],
              on: _sequelize.Sequelize.literal('Product.id = bookDetail.product_id AND Product.type = "BOOK"')
            }, {
              model: _models.StationeryDetail,
              as: 'stationeryDetail',
              required: false,
              attributes: ['brand', 'placeProduction', 'color', 'material'],
              on: _sequelize.Sequelize.literal('Product.id = stationeryDetail.product_id AND Product.type = "STATIONERY"')
            }, {
              model: _models.Category,
              as: 'category',
              required: false,
              attributes: ['id', 'name']
            }, {
              model: _models.ProductImage,
              as: 'productImages',
              required: false
            }, {
              model: _models.Review,
              as: 'reviews',
              required: false,
              attributes: []
            }, {
              model: _ProductHighlight["default"],
              as: 'highlights',
              required: false,
              attributes: ['id', 'key', 'value']
            }],
            // group: ['Product.id'],
            raw: false
          });
        case 3:
          product = _context5.sent;
          return _context5.abrupt("return", product);
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function getProductById(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(reqBody, productFile) {
    var existProduct, uploadResult, product;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _models.Product.findOne({
            attributes: ['name'],
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase()),
            raw: true
          });
        case 3:
          existProduct = _context7.sent;
          if (!existProduct) {
            _context7.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Sản phẩm đã tồn tại!');
        case 6:
          _context7.next = 8;
          return _UploadImageProvider.UploadImageProvider.uploadImage(productFile.buffer, 'coverImages', productFile.originalname);
        case 8:
          uploadResult = _context7.sent;
          _context7.next = 11;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(t) {
              var include, highlightEntries, data, newProduct;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    include = [{
                      model: _models.ProductImage,
                      as: 'productImages'
                    }, {
                      model: _ProductHighlight["default"],
                      as: 'highlights'
                    }];
                    highlightEntries = reqBody.highlights ? Object.entries(reqBody.highlights).map(function (_ref8) {
                      var _ref9 = (0, _slicedToArray2["default"])(_ref8, 2),
                        key = _ref9[0],
                        value = _ref9[1];
                      return {
                        key: key,
                        value: value
                      };
                    }) : [];
                    data = {
                      categoryId: reqBody.categoryId,
                      name: reqBody.name,
                      price: reqBody.price,
                      discount: reqBody.discount,
                      stock: reqBody.stock,
                      description: reqBody.description,
                      coverImageUrl: uploadResult.fileUrl,
                      dimension: reqBody.dimension,
                      type: reqBody.type,
                      productImages: (reqBody.productImages || []).map(function (i) {
                        return {
                          imageUrl: i.imageUrl
                        };
                      })
                    };
                    if (reqBody.type === 'BOOK') {
                      data.bookDetail = _objectSpread({}, reqBody.bookDetail);
                      include.push({
                        model: _models.BookDetail,
                        as: 'bookDetail'
                      });
                    }
                    if (reqBody.type === 'STATIONERY') {
                      data.stationeryDetail = _objectSpread({}, reqBody.stationeryDetail);
                      include.push({
                        model: _models.StationeryDetail,
                        as: 'stationeryDetail'
                      });
                    }

                    // Tạo sản phẩm chính
                    _context6.next = 7;
                    return _models.Product.create(data, {
                      include: include,
                      transaction: t
                    });
                  case 7:
                    newProduct = _context6.sent;
                    if (!(highlightEntries.length > 0)) {
                      _context6.next = 11;
                      break;
                    }
                    _context6.next = 11;
                    return _ProductHighlight["default"].bulkCreate(highlightEntries.map(function (h) {
                      return {
                        productId: newProduct.id,
                        key: h.key,
                        value: h.value
                      };
                    }), {
                      transaction: t
                    });
                  case 11:
                    if (!reqBody.flashSale) {
                      _context6.next = 14;
                      break;
                    }
                    _context6.next = 14;
                    return _models.FlashSale.create({
                      productId: newProduct.id,
                      flashPrice: reqBody.flashSale.flashPrice,
                      startTime: reqBody.flashSale.startTime,
                      endTime: reqBody.flashSale.endTime
                    }, {
                      transaction: t
                    });
                  case 14:
                    return _context6.abrupt("return", newProduct);
                  case 15:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x9) {
              return _ref7.apply(this, arguments);
            };
          }());
        case 11:
          product = _context7.sent;
          return _context7.abrupt("return", product);
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 15]]);
  }));
  return function create(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(productId, reqBody, productFile) {
    var oldProduct, coverImageUrl, uploadResult, product;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _models.Product.findByPk(productId);
        case 3:
          oldProduct = _context10.sent;
          if (!(oldProduct === reqBody)) {
            _context10.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 6:
          if (oldProduct) {
            _context10.next = 8;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 8:
          if (!productFile) {
            _context10.next = 15;
            break;
          }
          _context10.next = 11;
          return _UploadImageProvider.UploadImageProvider.uploadImage(productFile.buffer, 'coverImages', productFile.originalname);
        case 11:
          uploadResult = _context10.sent;
          coverImageUrl = uploadResult.fileUrl;
          _context10.next = 16;
          break;
        case 15:
          coverImageUrl = oldProduct.coverImageUrl;
        case 16:
          if (!(reqBody.type === oldProduct.type)) {
            _context10.next = 22;
            break;
          }
          _context10.next = 19;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(t) {
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _models.Product.update({
                      categoryId: reqBody.categoryId,
                      name: reqBody.name,
                      price: reqBody.price,
                      discount: reqBody.discount,
                      stock: reqBody.stock,
                      description: reqBody.description,
                      coverImageUrl: coverImageUrl,
                      dimension: reqBody.dimension,
                      type: reqBody.type
                    }, {
                      where: {
                        id: productId
                      },
                      transaction: t
                    });
                  case 2:
                    if (!(reqBody.type === 'BOOK')) {
                      _context8.next = 7;
                      break;
                    }
                    _context8.next = 5;
                    return _models.BookDetail.update({
                      bookGenreId: reqBody.bookDetail.bookGenreId,
                      author: reqBody.bookDetail.author,
                      translator: reqBody.bookDetail.translator,
                      language: reqBody.bookDetail.language,
                      publisher: reqBody.bookDetail.publisher,
                      publishYear: reqBody.bookDetail.publishYear,
                      pageCount: reqBody.bookDetail.pageCount
                    }, {
                      where: {
                        productId: productId
                      },
                      // foreignKey của BookDetail
                      transaction: t
                    });
                  case 5:
                    _context8.next = 9;
                    break;
                  case 7:
                    _context8.next = 9;
                    return _models.StationeryDetail.update({
                      brand: reqBody.stationeryDetail.brand,
                      placeProduction: reqBody.stationeryDetail.placeProduction,
                      color: reqBody.stationeryDetail.color,
                      material: reqBody.stationeryDetail.material
                    }, {
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 9:
                    _context8.next = 11;
                    return _models.Product.findByPk(productId, {
                      include: [{
                        model: _models.BookDetail,
                        as: 'bookDetail'
                      }, {
                        model: _models.StationeryDetail,
                        as: 'stationeryDetail'
                      }],
                      transaction: t
                    });
                  case 11:
                    return _context8.abrupt("return", _context8.sent);
                  case 12:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x13) {
              return _ref11.apply(this, arguments);
            };
          }());
        case 19:
          return _context10.abrupt("return", _context10.sent);
        case 22:
          _context10.next = 24;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(t) {
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    if (!(oldProduct.type === 'BOOK')) {
                      _context9.next = 5;
                      break;
                    }
                    _context9.next = 3;
                    return _models.BookDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 3:
                    _context9.next = 8;
                    break;
                  case 5:
                    if (!(oldProduct.type === 'STATIONERY')) {
                      _context9.next = 8;
                      break;
                    }
                    _context9.next = 8;
                    return _models.StationeryDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 8:
                    _context9.next = 10;
                    return _models.Product.update({
                      categoryId: reqBody.categoryId,
                      name: reqBody.name,
                      price: reqBody.price,
                      discount: reqBody.discount,
                      stock: reqBody.stock,
                      description: reqBody.description,
                      coverImageUrl: coverImageUrl,
                      dimension: reqBody.dimension,
                      type: reqBody.type
                    }, {
                      where: {
                        id: productId
                      },
                      transaction: t
                    });
                  case 10:
                    if (!(reqBody.type === 'BOOK')) {
                      _context9.next = 15;
                      break;
                    }
                    _context9.next = 13;
                    return _models.BookDetail.create({
                      productId: productId,
                      bookGenreId: reqBody.bookDetail.bookGenreId,
                      author: reqBody.bookDetail.author,
                      translator: reqBody.bookDetail.translator,
                      language: reqBody.bookDetail.language,
                      publisher: reqBody.bookDetail.publisher,
                      publishYear: reqBody.bookDetail.publishYear,
                      pageCount: reqBody.bookDetail.pageCount
                    }, {
                      transaction: t
                    });
                  case 13:
                    _context9.next = 18;
                    break;
                  case 15:
                    if (!(reqBody.type === 'STATIONERY')) {
                      _context9.next = 18;
                      break;
                    }
                    _context9.next = 18;
                    return _models.StationeryDetail.create({
                      productId: productId,
                      brand: reqBody.stationeryDetail.brand,
                      placeProduction: reqBody.stationeryDetail.placeProduction,
                      color: reqBody.stationeryDetail.color,
                      material: reqBody.stationeryDetail.material
                    }, {
                      transaction: t
                    });
                  case 18:
                    return _context9.abrupt("return", _models.Product.findByPk(productId, {
                      include: [{
                        model: _models.ProductImage,
                        as: 'productImages'
                      }, {
                        model: _models.BookDetail,
                        as: 'bookDetail'
                      }, {
                        model: _models.StationeryDetail,
                        as: 'stationeryDetail'
                      }],
                      transaction: t
                    }));
                  case 19:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x14) {
              return _ref12.apply(this, arguments);
            };
          }());
        case 24:
          product = _context10.sent;
          return _context10.abrupt("return", product);
        case 26:
          _context10.next = 31;
          break;
        case 28:
          _context10.prev = 28;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;
        case 31:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 28]]);
  }));
  return function update(_x10, _x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(productId) {
    var product;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return _models.Product.findByPk(productId);
        case 2:
          product = _context12.sent;
          if (product) {
            _context12.next = 5;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 5:
          _context12.next = 7;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref14 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(t) {
              var count;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return _models.ProductImage.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 2:
                    _context11.next = 4;
                    return _models.BookDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 4:
                    _context11.next = 6;
                    return _models.StationeryDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 6:
                    _context11.next = 8;
                    return _models.Product.destroy({
                      where: {
                        id: productId
                      },
                      transaction: t
                    });
                  case 8:
                    count = _context11.sent;
                    if (!(count === 0)) {
                      _context11.next = 11;
                      break;
                    }
                    throw new _ApiError["default"](500, 'Xóa sản phẩm thất bại!');
                  case 11:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function (_x16) {
              return _ref14.apply(this, arguments);
            };
          }());
        case 7:
          return _context12.abrupt("return", product);
        case 8:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function deleteById(_x15) {
    return _ref13.apply(this, arguments);
  };
}();
var getCategories = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var categories;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _models.Category.findAll({
            attributes: ['id', 'name'],
            order: [
            // nếu name = 'Sách' thì trả 0 (lên đầu), còn lại 1
            // prettier-ignore
            [_sequelize.Sequelize.literal('CASE WHEN name = \'Sách\' THEN 0 ELSE 1 END'), 'ASC'], ['name', 'ASC']]
          });
        case 3:
          categories = _context13.sent;
          return _context13.abrupt("return", categories);
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          throw _context13.t0;
        case 10:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function getCategories() {
    return _ref15.apply(this, arguments);
  };
}();
var getBookGenres = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var bookGenres;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _models.BookGenre.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
          });
        case 3:
          bookGenres = _context14.sent;
          return _context14.abrupt("return", bookGenres);
        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          throw _context14.t0;
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return function getBookGenres() {
    return _ref16.apply(this, arguments);
  };
}();
var searchAndFilterProducts = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee15(filters) {
    var _filters$page, page, _filters$itemsPerPage, itemsPerPage, search, type, bookGenreId, language, categoryId, minPrice, maxPrice, offset, whereClause, trendRaw, isTrendBool, hasMinPrice, hasMaxPrice, finalPriceFormula, includeArray, bookDetailInclude, bookDetailWhere, _yield$Product$findAn2, data, count;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _filters$page = filters.page, page = _filters$page === void 0 ? _constants.DEFAULT_PAGE : _filters$page, _filters$itemsPerPage = filters.itemsPerPage, itemsPerPage = _filters$itemsPerPage === void 0 ? _constants.DEFAULT_ITEMS_PER_PAGE : _filters$itemsPerPage, search = filters.search, type = filters.type, bookGenreId = filters.bookGenreId, language = filters.language, categoryId = filters.categoryId, minPrice = filters.minPrice, maxPrice = filters.maxPrice;
          offset = (page - 1) * itemsPerPage; // Build where clause cho Product
          whereClause = {}; // Search theo tên sản phẩm
          if (search) {
            whereClause.name = (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(search, "%"));
          }

          // Filter theo type (BOOK hoặc STATIONERY)
          if (type) {
            whereClause.type = type;
          }

          // Filter theo categoryId (cho STATIONERY)
          if (categoryId) {
            whereClause.categoryId = categoryId;
          }
          if (filters.isTrend !== undefined) {
            trendRaw = filters.isTrend;
            isTrendBool = trendRaw === '1' || trendRaw === 1 || trendRaw === true || trendRaw === 'true';
            whereClause.isTrend = isTrendBool;
          }

          // Filter theo giá - tính theo giá sau discount
          hasMinPrice = minPrice !== undefined && minPrice !== null && minPrice !== '' && !isNaN(minPrice);
          hasMaxPrice = maxPrice !== undefined && maxPrice !== null && maxPrice !== '' && !isNaN(maxPrice);
          if (hasMinPrice || hasMaxPrice) {
            // Tính giá thực tế sau discount: price * (100 - discount) / 100
            finalPriceFormula = 'price * (100 - discount) / 100';
            if (hasMinPrice && hasMaxPrice) {
              whereClause[_sequelize.Op.and] = [_sequelize.Sequelize.literal("".concat(finalPriceFormula, " >= ").concat(parseFloat(minPrice))), _sequelize.Sequelize.literal("".concat(finalPriceFormula, " <= ").concat(parseFloat(maxPrice)))];
            } else if (hasMinPrice) {
              whereClause[_sequelize.Op.and] = [_sequelize.Sequelize.literal("".concat(finalPriceFormula, " >= ").concat(parseFloat(minPrice)))];
            } else if (hasMaxPrice) {
              whereClause[_sequelize.Op.and] = [_sequelize.Sequelize.literal("".concat(finalPriceFormula, " <= ").concat(parseFloat(maxPrice)))];
            }
          }

          // Build include array
          includeArray = [{
            model: _models.Category,
            as: 'category',
            required: false,
            attributes: ['id', 'name']
          }, {
            model: _models.ProductImage,
            as: 'productImages',
            required: false
          }]; // Include BookDetail với điều kiện filter
          bookDetailInclude = {
            model: _models.BookDetail,
            as: 'bookDetail',
            required: false,
            attributes: ['bookGenreId', 'author', 'translator', 'language', 'publisher', 'publishYear', 'pageCount'],
            include: [{
              model: _models.BookGenre,
              as: 'bookGenre',
              required: false,
              attributes: ['id', 'name']
            }]
          }; // Nếu có filter theo bookGenreId hoặc language cho BOOK
          if (bookGenreId || language) {
            bookDetailWhere = {};
            if (bookGenreId) {
              bookDetailWhere.bookGenreId = bookGenreId;
            }
            if (language) {
              bookDetailWhere.language = (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(language, "%"));
            }
            bookDetailInclude.where = bookDetailWhere;
            bookDetailInclude.required = true; // Bắt buộc có BookDetail khi filter
          }
          includeArray.push(bookDetailInclude);

          // Include StationeryDetail
          includeArray.push({
            model: _models.StationeryDetail,
            as: 'stationeryDetail',
            required: false,
            attributes: ['brand', 'placeProduction', 'color', 'material']
          });
          _context15.next = 18;
          return _models.Product.findAndCountAll({
            where: whereClause,
            limit: parseInt(itemsPerPage, 10),
            offset: parseInt(offset, 10),
            order: [['updatedAt', 'DESC']],
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'],
            include: includeArray,
            distinct: true // Tránh duplicate khi có join
          });
        case 18:
          _yield$Product$findAn2 = _context15.sent;
          data = _yield$Product$findAn2.rows;
          count = _yield$Product$findAn2.count;
          return _context15.abrupt("return", {
            data: data,
            count: count
          });
        case 24:
          _context15.prev = 24;
          _context15.t0 = _context15["catch"](0);
          throw _context15.t0;
        case 27:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 24]]);
  }));
  return function searchAndFilterProducts(_x17) {
    return _ref17.apply(this, arguments);
  };
}();
var getTopTrendingProducts = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee16() {
    var products;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return _models.Product.findAll({
            limit: 8,
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt', [_sequelize.Sequelize.literal("(\n            SELECT COALESCE(SUM(oi.quantity), 0)\n            FROM order_items AS oi\n            WHERE oi.product_id = Product.id\n          )"), 'soldQuantity']],
            order: [[_sequelize.Sequelize.literal('soldQuantity'), 'DESC']],
            include: [{
              model: _models.BookDetail,
              as: 'bookDetail',
              required: false,
              attributes: ['bookGenreId', 'author', 'translator', 'language', 'publisher', 'publishYear', 'pageCount']
            }, {
              model: _models.StationeryDetail,
              as: 'stationeryDetail',
              required: false,
              attributes: ['brand', 'placeProduction', 'color', 'material']
            }, {
              model: _models.Category,
              as: 'category',
              required: false,
              attributes: ['id', 'name']
            }, {
              model: _models.ProductImage,
              as: 'productImages',
              required: false
            }]
          });
        case 3:
          products = _context16.sent;
          return _context16.abrupt("return", products);
        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          console.error('🔥 Error in getTopTrendingProducts:', _context16.t0);
          throw _context16.t0;
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 7]]);
  }));
  return function getTopTrendingProducts() {
    return _ref18.apply(this, arguments);
  };
}();
var productService = exports.productService = {
  create: create,
  getProducts: getProducts,
  getProductById: getProductById,
  update: update,
  deleteById: deleteById,
  getCategories: getCategories,
  getBookGenres: getBookGenres,
  searchAndFilterProducts: searchAndFilterProducts,
  getTopTrendingProducts: getTopTrendingProducts,
  getFlashSaleProducts: getFlashSaleProducts,
  getProductsByCategory: getProductsByCategory,
  getProductSuggest: getProductSuggest
};