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
            return queryInterface.bulkInsert('reviews', [{
              user_id: 1,
              product_id: 1,
              rating: 5,
              comment: 'Sách rất hay, nội dung bổ ích và dễ hiểu. Tôi rất thích!',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 2,
              product_id: 1,
              rating: 4,
              comment: 'Nội dung tốt nhưng có một số phần hơi khó hiểu.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 3,
              product_id: 1,
              rating: 5,
              comment: 'Đây là một cuốn sách tuyệt vời! Rất khuyến khích mọi người đọc.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 1,
              product_id: 2,
              rating: 4,
              comment: 'Sách hay, tác giả viết rất cuốn hút.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 2,
              product_id: 3,
              rating: 3,
              comment: 'Sách bình thường, không có gì đặc biệt.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 3,
              product_id: 4,
              rating: 5,
              comment: 'Bút viết rất mượt, giá cả hợp lý.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 1,
              product_id: 4,
              rating: 4,
              comment: 'Chất lượng tốt, đóng gói cẩn thận.',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              user_id: 2,
              product_id: 5,
              rating: 4,
              comment: 'Tập vở chất lượng, giấy dày và mịn.',
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
            return queryInterface.bulkDelete('reviews', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};