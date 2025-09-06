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
            return queryInterface.createTable('products', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
              },
              category_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                  model: 'categories',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
              name: {
                allowNull: false,
                type: Sequelize.STRING
              },
              price: {
                allowNull: false,
                type: Sequelize.DECIMAL(10, 2)
              },
              discount: {
                allowNull: false,
                type: Sequelize.DECIMAL(5, 2),
                defaultValue: 0
              },
              stock: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
              },
              description: {
                allowNull: false,
                type: Sequelize.TEXT
              },
              cover_image_url: {
                allowNull: false,
                type: Sequelize.STRING(500)
              },
              dimension: {
                allowNull: true,
                type: Sequelize.STRING
              },
              type: {
                allowNull: false,
                type: Sequelize.ENUM('BOOK', 'STATIONERY')
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
            return queryInterface.addIndex('products', ['category_id']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('products', ['type']);
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
            return queryInterface.dropTable('products');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};