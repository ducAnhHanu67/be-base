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
            return queryInterface.createTable('book_details', {
              product_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                references: {
                  model: 'products',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
              book_genre_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                  model: 'book_genres',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
              author: {
                allowNull: false,
                type: Sequelize.STRING
              },
              translator: {
                allowNull: false,
                type: Sequelize.STRING
              },
              language: {
                allowNull: false,
                type: Sequelize.STRING(100)
              },
              publisher: {
                allowNull: false,
                type: Sequelize.STRING
              },
              publish_year: {
                allowNull: false,
                type: Sequelize.STRING(10)
              },
              page_count: {
                allowNull: false,
                type: Sequelize.INTEGER
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
            return queryInterface.addIndex('book_details', ['book_genre_id']);
          case 4:
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
            return queryInterface.dropTable('book_details');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};