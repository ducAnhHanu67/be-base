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
            return queryInterface.addColumn('orders', 'vnp_transaction_no', {
              type: Sequelize.STRING,
              allowNull: true,
              comment: 'VNPay transaction number'
            });
          case 2:
            _context.next = 4;
            return queryInterface.addColumn('orders', 'vnp_response_code', {
              type: Sequelize.STRING,
              allowNull: true,
              comment: 'VNPay response code'
            });
          case 4:
            _context.next = 6;
            return queryInterface.addColumn('orders', 'paid_at', {
              type: Sequelize.DATE,
              allowNull: true,
              comment: 'Timestamp when payment was completed'
            });
          case 6:
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
            return queryInterface.removeColumn('orders', 'vnp_transaction_no');
          case 2:
            _context2.next = 4;
            return queryInterface.removeColumn('orders', 'vnp_response_code');
          case 4:
            _context2.next = 6;
            return queryInterface.removeColumn('orders', 'paid_at');
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};