"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIs_V1 = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _userRoute = require("./userRoute");
var _categoryRoute = require("./categoryRoute");
var _bookGenreRoute = require("./bookGenreRoute");
var _productRoute = require("./productRoute");
var _couponRoute = require("./couponRoute");
var _cartRoute = require("./cartRoute");
var _orderRoute = require("./orderRoute");
var _reviewRoute = require("./reviewRoute");
var _addressRoute = require("./addressRoute");
var Router = _express["default"].Router();

// Check API v1/status
Router.get('/status', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$db$sequelize$q, _yield$db$sequelize$q2, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.sequelize.query('SELECT COUNT(*) AS totalUsers FROM users');
        case 3:
          _yield$db$sequelize$q = _context.sent;
          _yield$db$sequelize$q2 = (0, _slicedToArray2["default"])(_yield$db$sequelize$q, 1);
          results = _yield$db$sequelize$q2[0];
          res.status(200).json({
            message: 'APIs V1 are ready to use. ch',
            dbStatus: 'Connected OK',
            totalUsers: results[0].totalUsers
          });
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'APIs V1 are ready but DB connection failed.',
            error: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// User API
Router.use('/users', _userRoute.userRoute);
Router.use('/categories', _categoryRoute.categoryRoute);
Router.use('/book-genres', _bookGenreRoute.bookGenreRoute);
Router.use('/products', _productRoute.productRoute);
Router.use('/coupons', _couponRoute.couponRoute);
Router.use('/cart', _cartRoute.cartRoute);
Router.use('/orders', _orderRoute.orderRoute);
Router.use('/reviews', _reviewRoute.reviewRoute);
Router.use('/addresses', _addressRoute.addressRoute);
var APIs_V1 = exports.APIs_V1 = Router;