"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var BookDetail = /*#__PURE__*/function (_Model) {
  function BookDetail() {
    (0, _classCallCheck2["default"])(this, BookDetail);
    return _callSuper(this, BookDetail, arguments);
  }
  (0, _inherits2["default"])(BookDetail, _Model);
  return (0, _createClass2["default"])(BookDetail);
}(_sequelize.Model);
BookDetail.init({
  productId: {
    allowNull: false,
    primaryKey: true,
    type: _sequelize.DataTypes.BIGINT
  },
  bookGenreId: {
    allowNull: false,
    type: _sequelize.DataTypes.BIGINT
  },
  author: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  translator: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  language: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  publisher: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  publishYear: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  pageCount: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  }
}, {
  timestamps: true,
  sequelize: _mySQL["default"],
  underscored: true
});
var _default = exports["default"] = BookDetail;