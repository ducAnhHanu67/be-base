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
            return queryInterface.createTable('addresses', {
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
              recipient_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: 'Tên người nhận'
              },
              recipient_email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: 'Email người nhận'
              },
              recipient_phone: {
                type: Sequelize.STRING(20),
                allowNull: false,
                comment: 'Số điện thoại người nhận'
              },
              address: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: 'Địa chỉ chi tiết'
              },
              is_default: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                comment: 'Địa chỉ mặc định'
              },
              created_at: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updated_at: {
                allowNull: false,
                type: Sequelize.DATE
              }
            });
          case 2:
            _context.next = 4;
            return queryInterface.addIndex('addresses', ['user_id']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('addresses', ['user_id', 'is_default']);
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
            return queryInterface.dropTable('addresses');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};