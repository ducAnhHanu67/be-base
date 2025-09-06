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
var User = /*#__PURE__*/function (_Model) {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
    return _callSuper(this, User, arguments);
  }
  (0, _inherits2["default"])(User, _Model);
  return (0, _createClass2["default"])(User);
}(_sequelize.Model);
User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.BIGINT
  },
  email: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  userName: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  avatar: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING
  },
  address: {
    allowNull: true,
    type: _sequelize.DataTypes.STRING(500)
  },
  isActive: {
    allowNull: false,
    type: _sequelize.DataTypes.BOOLEAN
  },
  verifyToken: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: _mySQL["default"],
  underscored: true
});
var _default = exports["default"] = User;