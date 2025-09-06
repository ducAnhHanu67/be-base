'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function up(queryInterface) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var hashedPassword1, hashedPassword2, hashedPassword3;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return bcrypt.hash('admin123', 10);
          case 2:
            hashedPassword1 = _context.sent;
            _context.next = 5;
            return bcrypt.hash('user123', 10);
          case 5:
            hashedPassword2 = _context.sent;
            _context.next = 8;
            return bcrypt.hash('user456', 10);
          case 8:
            hashedPassword3 = _context.sent;
            _context.next = 11;
            return queryInterface.bulkInsert('users', [{
              id: 1,
              email: 'admin@heybook.com',
              password: hashedPassword1,
              user_name: 'Admin',
              avatar: 'https://example.com/admin-avatar.jpg',
              is_active: true,
              verify_token: 'verified',
              role: 'ADMIN',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              id: 2,
              email: 'user1@gmail.com',
              password: hashedPassword2,
              user_name: 'Nguyễn Văn A',
              avatar: 'https://example.com/user1-avatar.jpg',
              is_active: true,
              verify_token: 'verified',
              role: 'USER',
              created_at: new Date(),
              updated_at: new Date()
            }, {
              id: 3,
              email: 'user2@gmail.com',
              password: hashedPassword3,
              user_name: 'Trần Thị B',
              avatar: null,
              is_active: true,
              verify_token: 'pending_verification_token',
              role: 'USER',
              created_at: new Date(),
              updated_at: new Date()
            }]);
          case 11:
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
            return queryInterface.bulkDelete('users', null, {});
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};