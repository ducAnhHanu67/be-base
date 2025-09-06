"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var _models = require("../models");
var _UploadImageProvider = require("../providers/UploadImageProvider");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _constants = require("../utils/constants");
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
var getProductById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(productId) {
    var product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models.Product.findOne({
            where: {
              id: productId
            },
            attributes: ['id', 'name', 'price', 'discount', 'stock', 'description', 'coverImageUrl', 'dimension', 'type', 'categoryId', 'createdAt', 'updatedAt'
            // Tính rating trung bình từ reviews
            // [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('reviews.rating')), 0), 'avgRating'],
            // Đếm số lượng reviews
            // [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'totalReviews']
            ],
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
            }],
            // group: ['Product.id'],
            raw: false
          });
        case 3:
          product = _context2.sent;
          return _context2.abrupt("return", product);
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
  return function getProductById(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(reqBody, productFile) {
    var existProduct, uploadResult, product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _models.Product.findOne({
            attributes: ['name'],
            where: _sequelize.Sequelize.where(_sequelize.Sequelize.fn('LOWER', _sequelize.Sequelize.col('name')), reqBody.name.toLowerCase()),
            raw: true
          });
        case 3:
          existProduct = _context4.sent;
          if (!existProduct) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](409, 'Sản phẩm đã tồn tại!');
        case 6:
          _context4.next = 8;
          return _UploadImageProvider.UploadImageProvider.uploadImage(productFile.buffer, 'coverImages', productFile.originalname);
        case 8:
          uploadResult = _context4.sent;
          _context4.next = 11;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(t) {
              var include, data;
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    // Tạo mảng include động
                    include = [{
                      model: _models.ProductImage,
                      as: 'productImages'
                    }]; // Chuẩn bị data chính
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
                      // chung productImages
                      productImages: (reqBody.productImages || []).map(function (i) {
                        return {
                          imageUrl: i.imageUrl
                        };
                      })
                    }; // Nếu là sách thì đóng gói bookDetail và include model
                    if (reqBody.type === 'BOOK') {
                      data.bookDetail = {
                        bookGenreId: reqBody.bookDetail.bookGenreId,
                        author: reqBody.bookDetail.author,
                        translator: reqBody.bookDetail.translator,
                        language: reqBody.bookDetail.language,
                        publisher: reqBody.bookDetail.publisher,
                        publishYear: reqBody.bookDetail.publishYear,
                        pageCount: reqBody.bookDetail.pageCount
                      };
                      include.push({
                        model: _models.BookDetail,
                        as: 'bookDetail'
                      });
                    }

                    // Nếu là văn phòng phẩm thì đóng gói stationeryDetail và include model
                    if (reqBody.type === 'STATIONERY') {
                      data.stationeryDetail = {
                        brand: reqBody.stationeryDetail.brand,
                        placeProduction: reqBody.stationeryDetail.placeProduction,
                        color: reqBody.stationeryDetail.color,
                        material: reqBody.stationeryDetail.material
                        // … thêm các field khác nếu có
                      };
                      include.push({
                        model: _models.StationeryDetail,
                        as: 'stationeryDetail'
                      });
                    }

                    // Cuối cùng tạo record
                    return _context3.abrupt("return", _models.Product.create(data, {
                      include: include,
                      transaction: t
                    }));
                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x7) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 11:
          product = _context4.sent;
          return _context4.abrupt("return", product);
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function create(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(productId, reqBody, productFile) {
    var oldProduct, coverImageUrl, uploadResult, product;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _models.Product.findByPk(productId);
        case 3:
          oldProduct = _context7.sent;
          if (!(oldProduct === reqBody)) {
            _context7.next = 6;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 6:
          if (oldProduct) {
            _context7.next = 8;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 8:
          if (!productFile) {
            _context7.next = 15;
            break;
          }
          _context7.next = 11;
          return _UploadImageProvider.UploadImageProvider.uploadImage(productFile.buffer, 'coverImages', productFile.originalname);
        case 11:
          uploadResult = _context7.sent;
          coverImageUrl = uploadResult.fileUrl;
          _context7.next = 16;
          break;
        case 15:
          coverImageUrl = oldProduct.coverImageUrl;
        case 16:
          if (!(reqBody.type === oldProduct.type)) {
            _context7.next = 22;
            break;
          }
          _context7.next = 19;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(t) {
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
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
                      _context5.next = 7;
                      break;
                    }
                    _context5.next = 5;
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
                    _context5.next = 9;
                    break;
                  case 7:
                    _context5.next = 9;
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
                    _context5.next = 11;
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
                    return _context5.abrupt("return", _context5.sent);
                  case 12:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x11) {
              return _ref6.apply(this, arguments);
            };
          }());
        case 19:
          return _context7.abrupt("return", _context7.sent);
        case 22:
          _context7.next = 24;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(t) {
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(oldProduct.type === 'BOOK')) {
                      _context6.next = 5;
                      break;
                    }
                    _context6.next = 3;
                    return _models.BookDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 3:
                    _context6.next = 8;
                    break;
                  case 5:
                    if (!(oldProduct.type === 'STATIONERY')) {
                      _context6.next = 8;
                      break;
                    }
                    _context6.next = 8;
                    return _models.StationeryDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 8:
                    _context6.next = 10;
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
                      _context6.next = 15;
                      break;
                    }
                    _context6.next = 13;
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
                    _context6.next = 18;
                    break;
                  case 15:
                    if (!(reqBody.type === 'STATIONERY')) {
                      _context6.next = 18;
                      break;
                    }
                    _context6.next = 18;
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
                    return _context6.abrupt("return", _models.Product.findByPk(productId, {
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
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x12) {
              return _ref7.apply(this, arguments);
            };
          }());
        case 24:
          product = _context7.sent;
          return _context7.abrupt("return", product);
        case 26:
          _context7.next = 31;
          break;
        case 28:
          _context7.prev = 28;
          _context7.t0 = _context7["catch"](0);
          throw _context7.t0;
        case 31:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 28]]);
  }));
  return function update(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(productId) {
    var product;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _models.Product.findByPk(productId);
        case 2:
          product = _context9.sent;
          if (product) {
            _context9.next = 5;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy sản phẩm!');
        case 5:
          _context9.next = 7;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(t) {
              var count;
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _models.ProductImage.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 2:
                    _context8.next = 4;
                    return _models.BookDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 4:
                    _context8.next = 6;
                    return _models.StationeryDetail.destroy({
                      where: {
                        productId: productId
                      },
                      transaction: t
                    });
                  case 6:
                    _context8.next = 8;
                    return _models.Product.destroy({
                      where: {
                        id: productId
                      },
                      transaction: t
                    });
                  case 8:
                    count = _context8.sent;
                    if (!(count === 0)) {
                      _context8.next = 11;
                      break;
                    }
                    throw new _ApiError["default"](500, 'Xóa sản phẩm thất bại!');
                  case 11:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x14) {
              return _ref9.apply(this, arguments);
            };
          }());
        case 7:
          return _context9.abrupt("return", product);
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteById(_x13) {
    return _ref8.apply(this, arguments);
  };
}();
var getCategories = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var categories;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _models.Category.findAll({
            attributes: ['id', 'name'],
            order: [
            // nếu name = 'Sách' thì trả 0 (lên đầu), còn lại 1
            // prettier-ignore
            [_sequelize.Sequelize.literal('CASE WHEN name = \'Sách\' THEN 0 ELSE 1 END'), 'ASC'], ['name', 'ASC']]
          });
        case 3:
          categories = _context10.sent;
          return _context10.abrupt("return", categories);
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          throw _context10.t0;
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function getCategories() {
    return _ref10.apply(this, arguments);
  };
}();
var getBookGenres = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var bookGenres;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _models.BookGenre.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
          });
        case 3:
          bookGenres = _context11.sent;
          return _context11.abrupt("return", bookGenres);
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          throw _context11.t0;
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function getBookGenres() {
    return _ref11.apply(this, arguments);
  };
}();
var searchAndFilterProducts = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(filters) {
    var _filters$page, page, _filters$itemsPerPage, itemsPerPage, search, type, bookGenreId, language, categoryId, minPrice, maxPrice, offset, whereClause, trendRaw, isTrendBool, hasMinPrice, hasMaxPrice, finalPriceFormula, includeArray, bookDetailInclude, bookDetailWhere, _yield$Product$findAn2, data, count;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
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
          _context12.next = 18;
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
          _yield$Product$findAn2 = _context12.sent;
          data = _yield$Product$findAn2.rows;
          count = _yield$Product$findAn2.count;
          return _context12.abrupt("return", {
            data: data,
            count: count
          });
        case 24:
          _context12.prev = 24;
          _context12.t0 = _context12["catch"](0);
          throw _context12.t0;
        case 27:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 24]]);
  }));
  return function searchAndFilterProducts(_x15) {
    return _ref12.apply(this, arguments);
  };
}();
var getTopTrendingProducts = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var products;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
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
          products = _context13.sent;
          return _context13.abrupt("return", products);
        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.error('🔥 Error in getTopTrendingProducts:', _context13.t0);
          throw _context13.t0;
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function getTopTrendingProducts() {
    return _ref13.apply(this, arguments);
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
  getTopTrendingProducts: getTopTrendingProducts
};