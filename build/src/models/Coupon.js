"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Coupon = _mySQL["default"].define('Coupon', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  code: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  name: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: _sequelize.DataTypes.ENUM('PERCENTAGE', 'FIXED_AMOUNT'),
    allowNull: false,
    defaultValue: 'PERCENTAGE'
  },
  value: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  minOrderAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  maxDiscountAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  usageLimit: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  usedCount: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  startDate: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  isActive: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'coupons',
  timestamps: true
});
var _default = exports["default"] = Coupon;