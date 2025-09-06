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
            return queryInterface.createTable('order_items', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'orders',
                  key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
              },
              product_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: 'products',
                  key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
              },
              product_name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'Store product name at time of order'
              },
              product_image: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: 'Store product image URL at time of order'
              },
              quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              unit_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                comment: 'Price per unit at time of order'
              },
              discount: {
                type: Sequelize.DECIMAL(5, 2),
                defaultValue: 0.00,
                allowNull: false,
                comment: 'Discount percentage at time of order'
              },
              total_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                comment: 'quantity * unitPrice * (100 - discount) / 100'
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
            return queryInterface.addIndex('order_items', ['order_id']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('order_items', ['product_id']);
          case 6:
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
            return queryInterface.dropTable('order_items');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};