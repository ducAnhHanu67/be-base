"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var FlashSale = _mySQL["default"].define('FlashSale', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  flashPrice: {
    type: _sequelize.DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  startTime: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'flashsales',
  timestamps: true,
  underscored: true
});
var _default = exports["default"] = FlashSale;