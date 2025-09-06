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
            _context.prev = 0;
            _context.next = 3;
            return queryInterface.removeIndex('carts', ['session_id']);
          case 3:
            _context.next = 7;
            break;
          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
          case 7:
            _context.prev = 7;
            _context.next = 10;
            return queryInterface.removeColumn('carts', 'session_id');
          case 10:
            _context.next = 14;
            break;
          case 12:
            _context.prev = 12;
            _context.t1 = _context["catch"](7);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 5], [7, 12]]);
    }))();
  },
  down: function down(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queryInterface.addColumn('carts', 'session_id', {
              type: Sequelize.STRING,
              allowNull: true,
              comment: 'For guest users'
            });
          case 2:
            _context2.next = 4;
            return queryInterface.addIndex('carts', ['session_id']);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
};