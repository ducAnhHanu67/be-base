"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Order = _mySQL["default"].define('Order', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderNumber: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Generated order number like HB2025001'
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  subtotal: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Total before discounts and shipping'
  },
  discountAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    allowNull: false
  },
  totalAmount: {
    type: _sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Final amount = subtotal - discountAmount'
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
  couponCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    comment: 'Store coupon code for reference'
  },
  status: {
    type: _sequelize.DataTypes.ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'),
    defaultValue: 'PENDING'
  },
  paymentStatus: {
    type: _sequelize.DataTypes.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
    defaultValue: 'PENDING'
  },
  paymentMethod: {
    type: _sequelize.DataTypes.ENUM('COD', 'VNPAY'),
    allowNull: true
  },
  // VNPay payment fields
  vnpTransactionNo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    comment: 'VNPay transaction number'
  },
  vnpResponseCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    comment: 'VNPay response code'
  },
  paidAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true,
    comment: 'Timestamp when payment was completed'
  },
  shippingAddress: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false,
    comment: 'Full shipping address as text string'
  },
  recipientName: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false,
    comment: 'Name of the person receiving the order'
  },
  recipientEmail: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false,
    comment: 'Email of the person receiving the order'
  },
  recipientPhone: {
    type: _sequelize.DataTypes.STRING(20),
    allowNull: false,
    comment: 'Phone number of the person receiving the order'
  },
  notes: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  deliveredAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  cancelledAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true,
  indexes: [{
    fields: ['user_id']
  }, {
    fields: ['order_number']
  }, {
    fields: ['status']
  }, {
    fields: ['payment_status']
  }, {
    fields: ['created_at']
  }]
});
var _default = exports["default"] = Order;