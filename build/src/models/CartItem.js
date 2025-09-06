"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var CartItem = _mySQL["default"].define('CartItem', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cartId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carts',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  productId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  quantity: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Price at the time of adding to cart'
  },
  discount: {
    type: _sequelize.DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Discount percentage at the time of adding to cart'
  },
  totalPrice: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'quantity * unitPrice * (100 - discount) / 100'
  }
}, {
  tableName: 'cart_items',
  timestamps: true,
  underscored: true,
  indexes: [{
    fields: ['cart_id']
  }, {
    fields: ['product_id']
  }, {
    unique: true,
    fields: ['cart_id', 'product_id']
  }]
});
var _default = exports["default"] = CartItem;