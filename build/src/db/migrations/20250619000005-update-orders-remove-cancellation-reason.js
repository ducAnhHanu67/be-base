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
            return queryInterface.removeColumn('orders', 'cancellation_reason');
          case 2:
            _context.next = 4;
            return queryInterface.changeColumn('orders', 'payment_method', {
              type: Sequelize.ENUM('COD', 'VNPAY'),
              allowNull: true
            });
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  down: function down(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queryInterface.addColumn('orders', 'cancellation_reason', {
              type: Sequelize.TEXT,
              allowNull: true
            });
          case 2:
            _context2.next = 4;
            return queryInterface.changeColumn('orders', 'payment_method', {
              type: Sequelize.ENUM('COD', 'BANK_TRANSFER', 'CREDIT_CARD', 'E_WALLET'),
              allowNull: true
            });
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};