'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return queryInterface.createTable('coupons', {
              id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              code: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
              },
              name: {
                type: Sequelize.STRING(255),
                allowNull: false
              },
              description: {
                type: Sequelize.TEXT,
                allowNull: true
              },
              type: {
                type: Sequelize.ENUM('PERCENTAGE', 'FIXED_AMOUNT'),
                allowNull: false,
                defaultValue: 'PERCENTAGE'
              },
              value: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
              },
              minOrderAmount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: 0
              },
              maxDiscountAmount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
              },
              usageLimit: {
                type: Sequelize.INTEGER,
                allowNull: true
              },
              usedCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
              },
              startDate: {
                type: Sequelize.DATE,
                allowNull: false
              },
              endDate: {
                type: Sequelize.DATE,
                allowNull: false
              },
              isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
              }
            });
          case 2:
            _context.next = 4;
            return queryInterface.addIndex('coupons', ['code']);
          case 4:
            _context.next = 6;
            return queryInterface.addIndex('coupons', ['isActive']);
          case 6:
            _context.next = 8;
            return queryInterface.addIndex('coupons', ['startDate', 'endDate']);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }
    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queryInterface.dropTable('coupons');
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function down(_x3) {
      return _down.apply(this, arguments);
    }
    return down;
  }()
};