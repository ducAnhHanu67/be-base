'use strict';

/** @type {import('sequelize-cli').Migration} */
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
module.exports = {
  up: function up(queryInterface) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return queryInterface.bulkInsert('cart_items', [
            // Cart 1 - user1@gmail.com (ACTIVE)
            {
              cart_id: 1,
              product_id: 1,
              // Sách
              quantity: 2,
              unit_price: 120000.00,
              discount: 0.00,
              total_price: 240000.00,
              created_at: new Date(),
              updated_at: new Date()
            }, {
              cart_id: 1,
              product_id: 3,
              // Sách khác
              quantity: 1,
              unit_price: 245000.00,
              discount: 0.00,
              total_price: 245000.00,
              created_at: new Date(),
              updated_at: new Date()
            },
            // Cart 2 - user2@gmail.com (ACTIVE)
            {
              cart_id: 2,
              product_id: 6,
              // Văn phòng phẩm
              quantity: 1,
              unit_price: 85000.00,
              discount: 0.00,
              total_price: 85000.00,
              created_at: new Date(),
              updated_at: new Date()
            }, {
              cart_id: 2,
              product_id: 2,
              // Sách
              quantity: 1,
              unit_price: 235000.00,
              discount: 0.00,
              total_price: 235000.00,
              created_at: new Date(),
              updated_at: new Date()
            }]);
          case 2:
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
            return queryInterface.bulkDelete('cart_items', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};