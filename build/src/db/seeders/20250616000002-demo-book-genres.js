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
            return queryInterface.bulkInsert('book_genres', [{
              name: 'Tiểu thuyết',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Khoa học viễn tưởng',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Lãng mạn',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Trinh thám',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Kinh dị',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Phiêu lưu',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Tâm lý học',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Kinh tế',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Công nghệ',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Lịch sử',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Văn học cổ điển',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Self-help',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              name: 'Thiếu nhi',
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
            return queryInterface.bulkDelete('book_genres', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};