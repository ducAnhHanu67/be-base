"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Cart = _mySQL["default"].define('Cart', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  totalAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  },
  discountAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  },
  finalAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false
  },
  couponId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'coupons',
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  status: {
    type: _sequelize.DataTypes.ENUM('ACTIVE', 'ABANDONED', 'CONVERTED'),
    defaultValue: 'ACTIVE'
  }
}, {
  tableName: 'carts',
  timestamps: true,
  underscored: true,
  indexes: [{
    fields: ['user_id']
  }, {
    fields: ['session_id']
  }, {
    fields: ['status']
  }]
});
var _default = exports["default"] = Cart;