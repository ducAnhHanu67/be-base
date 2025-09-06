"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var OrderItem = _mySQL["default"].define('OrderItem', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
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
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  productName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    comment: 'Store product name at time of order'
  },
  productImage: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true,
    comment: 'Store product image URL at time of order'
  },
  quantity: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Price per unit at time of order'
  },
  discount: {
    type: _sequelize.DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
    allowNull: false,
    comment: 'Discount percentage at time of order'
  },
  totalPrice: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'quantity * unitPrice * (100 - discount) / 100'
  }
}, {
  tableName: 'order_items',
  timestamps: true,
  underscored: true,
  indexes: [{
    fields: ['order_id']
  }, {
    fields: ['product_id']
  }]
});
var _default = exports["default"] = OrderItem;