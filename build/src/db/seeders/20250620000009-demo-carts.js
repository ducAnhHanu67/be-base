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
            return queryInterface.bulkInsert('carts', [{
              id: 1,
              user_id: 2,
              // user1@gmail.com
              total_amount: 485000.00,
              discount_amount: 48500.00,
              final_amount: 436500.00,
              coupon_id: 1,
              // WELCOME10
              status: 'ACTIVE',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              id: 2,
              user_id: 3,
              // user2@gmail.com
              total_amount: 320000.00,
              discount_amount: 0.00,
              final_amount: 320000.00,
              coupon_id: null,
              status: 'ACTIVE',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              id: 3,
              user_id: 2,
              // user1@gmail.com (giỏ hàng cũ đã chuyển đổi)
              total_amount: 650000.00,
              discount_amount: 50000.00,
              final_amount: 600000.00,
              coupon_id: 2,
              // SAVE50K
              status: 'CONVERTED',
              created_at: new Date('2024-11-15'),
              updated_at: new Date('2024-11-16')
            }, {
              id: 4,
              user_id: 3,
              // user2@gmail.com (giỏ hàng bị bỏ)
              total_amount: 180000.00,
              discount_amount: 0.00,
              final_amount: 180000.00,
              coupon_id: null,
              status: 'ABANDONED',
              created_at: new Date('2024-10-20'),
              updated_at: new Date('2024-10-25')
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
            return queryInterface.bulkDelete('carts', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};