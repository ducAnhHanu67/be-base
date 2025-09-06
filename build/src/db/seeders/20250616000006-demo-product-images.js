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
            return queryInterface.bulkInsert('product_images', [{
              product_id: 1,
              image_url: 'https://example.com/harry-potter-1-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 1,
              image_url: 'https://example.com/harry-potter-1-img2.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 2,
              image_url: 'https://example.com/dac-nhan-tam-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 3,
              image_url: 'https://example.com/sapiens-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 3,
              image_url: 'https://example.com/sapiens-img2.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 4,
              image_url: 'https://example.com/hoa-vang-co-xanh-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 5,
              image_url: 'https://example.com/atomic-habits-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 6,
              image_url: 'https://example.com/but-bi-tl027-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 7,
              image_url: 'https://example.com/tap-vo-200-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 8,
              image_url: 'https://example.com/bo-compa-img1.jpg',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              product_id: 9,
              image_url: 'https://example.com/thuoc-ke-30cm-img1.jpg',
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
            return queryInterface.bulkDelete('product_images', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};