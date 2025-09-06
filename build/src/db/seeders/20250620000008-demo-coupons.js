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
            return queryInterface.bulkInsert('coupons', [{
              id: 1,
              code: 'WELCOME10',
              name: 'Giảm giá chào mừng thành viên mới',
              description: 'Giảm 10% cho đơn hàng đầu tiên, áp dụng cho đơn hàng từ 200,000đ',
              type: 'PERCENTAGE',
              value: 10.00,
              minOrderAmount: 200000.00,
              maxDiscountAmount: 50000.00,
              usageLimit: 100,
              usedCount: 15,
              startDate: new Date('2024-01-01'),
              endDate: new Date('2025-12-31'),
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: 2,
              code: 'SAVE50K',
              name: 'Giảm giá cố định 50,000đ',
              description: 'Giảm trực tiếp 50,000đ cho đơn hàng từ 500,000đ',
              type: 'FIXED_AMOUNT',
              value: 50000.00,
              minOrderAmount: 500000.00,
              maxDiscountAmount: null,
              usageLimit: 50,
              usedCount: 8,
              startDate: new Date('2024-06-01'),
              endDate: new Date('2025-06-30'),
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: 3,
              code: 'SUMMER2024',
              name: 'Khuyến mãi hè 2024',
              description: 'Giảm 15% cho tất cả sản phẩm sách, áp dụng cho đơn hàng từ 300,000đ',
              type: 'PERCENTAGE',
              value: 15.00,
              minOrderAmount: 300000.00,
              maxDiscountAmount: 100000.00,
              usageLimit: 200,
              usedCount: 45,
              startDate: new Date('2024-06-01'),
              endDate: new Date('2024-08-31'),
              isActive: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: 4,
              code: 'FREESHIP',
              name: 'Miễn phí vận chuyển',
              description: 'Giảm 30,000đ phí vận chuyển cho đơn hàng từ 400,000đ',
              type: 'FIXED_AMOUNT',
              value: 30000.00,
              minOrderAmount: 400000.00,
              maxDiscountAmount: null,
              usageLimit: null,
              usedCount: 127,
              startDate: new Date('2024-01-01'),
              endDate: new Date('2025-12-31'),
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              id: 5,
              code: 'STUDENT20',
              name: 'Ưu đãi sinh viên',
              description: 'Giảm 20% dành riêng cho sinh viên, áp dụng cho đơn hàng từ 150,000đ',
              type: 'PERCENTAGE',
              value: 20.00,
              minOrderAmount: 150000.00,
              maxDiscountAmount: 80000.00,
              usageLimit: 300,
              usedCount: 89,
              startDate: new Date('2024-09-01'),
              endDate: new Date('2025-05-31'),
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
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
            return queryInterface.bulkDelete('coupons', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};