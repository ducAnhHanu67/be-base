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
            return queryInterface.createTable('carts', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: 'users',
                  key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
              },
              session_id: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'For guest users'
              },
              total_amount: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.00,
                allowNull: false
              },
              discount_amount: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.00,
                allowNull: false
              },
              final_amount: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.00,
                allowNull: false
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
              status: {
                type: Sequelize.ENUM('ACTIVE', 'ABANDONED', 'CONVERTED'),
                defaultValue: 'ACTIVE'
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
            return queryInterface.addIndex('carts', ['user_id']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('carts', ['session_id']);
          case 6:
            _context.next = 8;
            return queryInterface.addIndex('carts', ['status']);
          case 8:
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
            return queryInterface.dropTable('carts');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};