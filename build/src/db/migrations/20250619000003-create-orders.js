'use strict';

/** @type {import('sequelize-cli').Migration} */
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return queryInterface.createTable('orders', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              order_number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: 'Generated order number like HB2025001'
              },
              user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
              },
              subtotal: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                comment: 'Total before discounts and shipping'
              },
              discount_amount: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.00,
                allowNull: false
              },
              shipping_fee: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.00,
                allowNull: false
              },
              total_amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                comment: 'Final amount = subtotal - discountAmount + shippingFee'
              },
              coupon_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                  model: 'coupons',
                  key: 'id'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
              },
              coupon_code: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Store coupon code for reference'
              },
              status: {
                type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'),
                defaultValue: 'PENDING'
              },
              payment_status: {
                type: Sequelize.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'),
                defaultValue: 'PENDING'
              },
              payment_method: {
                type: Sequelize.ENUM('COD', 'BANK_TRANSFER', 'CREDIT_CARD', 'E_WALLET'),
                allowNull: true
              },
              shipping_address: {
                type: Sequelize.JSON,
                allowNull: false,
                comment: 'JSON object containing shipping address details'
              },
              notes: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              estimated_delivery: {
                type: Sequelize.DATE,
                allowNull: true
              },
              delivered_at: {
                type: Sequelize.DATE,
                allowNull: true
              },
              cancelled_at: {
                type: Sequelize.DATE,
                allowNull: true
              },
              cancellation_reason: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
              },
              updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
              }
            });
          case 2:
            _context.next = 4;
            return queryInterface.addIndex('orders', ['user_id']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('orders', ['order_number']);
          case 6:
            _context.next = 8;
            return queryInterface.addIndex('orders', ['status']);
          case 8:
            _context.next = 10;
            return queryInterface.addIndex('orders', ['payment_status']);
          case 10:
            _context.next = 12;
            return queryInterface.addIndex('orders', ['created_at']);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  down: function down(queryInterface) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queryInterface.dropTable('orders');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};