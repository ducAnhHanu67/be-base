"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productValidation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var validate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var productFields, bookFields, stationeryFields, productSchema, validated;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          productFields = {
            categoryId: _joi["default"].number().required().integer(),
            name: _joi["default"].string().required().min(3).max(50).trim(),
            price: _joi["default"].number().required().positive(),
            discount: _joi["default"].number().required().min(0).max(100),
            stock: _joi["default"].number().required().integer().min(0),
            description: _joi["default"].string().required().min(5).max(10000).trim(),
            // coverImageUrl: Joi.string().uri().required(),
            dimension: _joi["default"].string().allow('').max(50).trim(),
            type: _joi["default"].string().valid('BOOK', 'STATIONERY').required()

            // productImages: Joi.array()
            //   .items(Joi.object({ imageUrl: Joi.string().uri().required() }))
            //   .min(0)
            //   .max(10)
            //   .unique('imageUrl')
          };
          bookFields = {
            bookGenreId: _joi["default"].number().required().integer(),
            author: _joi["default"].string().required().max(100).trim(),
            translator: _joi["default"].string().allow('').max(100).trim(),
            language: _joi["default"].string().required().trim(),
            publisher: _joi["default"].string().required().max(100).trim(),
            publishYear: _joi["default"].number().integer().min(1900).max(new Date().getFullYear()),
            pageCount: _joi["default"].number().integer().min(1)
          };
          stationeryFields = {
            brand: _joi["default"].string().required().min(1).max(100).trim(),
            placeProduction: _joi["default"].string().required().min(1).max(100).trim(),
            color: _joi["default"].string().allow('').min(1).max(50).trim(),
            material: _joi["default"].string().allow('').min(1).max(50).trim()
          };
          productSchema = _joi["default"].object(_objectSpread(_objectSpread({}, productFields), {}, {
            bookDetail: _joi["default"].alternatives().conditional('type', {
              is: 'BOOK',
              then: _joi["default"].object(bookFields).required(),
              otherwise: _joi["default"].forbidden()
            }),
            stationeryDetail: _joi["default"].alternatives().conditional('type', {
              is: 'STATIONERY',
              then: _joi["default"].object(stationeryFields).required(),
              otherwise: _joi["default"].forbidden()
            })
          }));
          _context.prev = 4;
          _context.next = 7;
          return productSchema.validateAsync(req.body, {
            convert: true,
            abortEarly: false,
            allowUnknown: false
          });
        case 7:
          validated = _context.sent;
          req.body = validated;
          next();
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](4);
          next(new _ApiError["default"](422, new Error(_context.t0).message));
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 12]]);
  }));
  return function validate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var validateSearch = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var searchSchema;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          searchSchema = _joi["default"].object({
            page: _joi["default"].number().integer().min(1).optional(),
            itemsPerPage: _joi["default"].number().integer().min(1).max(100).optional(),
            search: _joi["default"].string().max(100).trim().optional(),
            type: _joi["default"].string().valid('BOOK', 'STATIONERY').optional(),
            bookGenreId: _joi["default"].number().integer().positive().optional(),
            language: _joi["default"].string().max(100).trim().optional(),
            categoryId: _joi["default"].number().integer().positive().optional(),
            minPrice: _joi["default"].number().min(0).optional(),
            maxPrice: _joi["default"].number().positive().optional(),
            isTrend: _joi["default"]["boolean"]().optional()
          }).custom(function (value, helpers) {
            // Validate logic: nếu có bookGenreId hoặc language thì type phải là BOOK
            if ((value.bookGenreId || value.language) && value.type !== 'BOOK') {
              return helpers.error('custom.bookFilter');
            }

            // Validate minPrice <= maxPrice
            if (value.minPrice && value.maxPrice && value.minPrice > value.maxPrice) {
              return helpers.error('custom.priceRange');
            }
            return value;
          }, 'Search validation').messages({
            'custom.bookFilter': 'bookGenreId và language chỉ có thể sử dụng khi type=BOOK',
            'custom.priceRange': 'minPrice phải nhỏ hơn hoặc bằng maxPrice'
          });
          _context2.next = 4;
          return searchSchema.validateAsync(req.query, {
            abortEarly: false
          });
        case 4:
          next();
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(new _ApiError["default"](422, new Error(_context2.t0).message));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function validateSearch(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var productValidation = exports.productValidation = {
  validate: validate,
  validateSearch: validateSearch
};