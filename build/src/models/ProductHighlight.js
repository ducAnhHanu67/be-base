"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var ProductHighlight = _mySQL["default"].define('ProductHighlight', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: _sequelize.DataTypes.BIGINT,
    // 👈 khớp với kiểu products.id (BIGINT nếu bạn đã set)
    allowNull: false
  },
  key: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'product_highlights',
  timestamps: true,
  underscored: true
});
var _default = exports["default"] = ProductHighlight;