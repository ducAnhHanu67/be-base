"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Product = /*#__PURE__*/function (_Model) {
  function Product() {
    (0, _classCallCheck2["default"])(this, Product);
    return _callSuper(this, Product, arguments);
  }
  (0, _inherits2["default"])(Product, _Model);
  return (0, _createClass2["default"])(Product, [{
    key: "toJSON",
    value: function toJSON() {
      var attributes = _objectSpread({}, this.get());
      if (!attributes.bookDetail) delete attributes.bookDetail;
      if (!attributes.stationeryDetail) delete attributes.stationeryDetail;
      return attributes;
    }
  }]);
}(_sequelize.Model);
Product.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.BIGINT
  },
  categoryId: {
    allowNull: false,
    type: _sequelize.DataTypes.BIGINT
  },
  name: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: _sequelize.DataTypes.DECIMAL
  },
  discount: {
    allowNull: false,
    type: _sequelize.DataTypes.DECIMAL
  },
  stock: {
    allowNull: false,
    type: _sequelize.DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  coverImageUrl: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  dimension: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING
  },
  type: {
    allowNull: false,
    type: _sequelize.DataTypes.ENUM('BOOK', 'STATIONERY'),
    primaryKey: true
  },
  isTrend: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true,
  sequelize: _mySQL["default"],
  underscored: true
});
var _default = exports["default"] = Product;