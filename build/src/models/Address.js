"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Address = _mySQL["default"].define('Address', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: _sequelize.DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  recipientName: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tên người nhận'
  },
  recipientEmail: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false,
    comment: 'Email người nhận'
  },
  recipientPhone: {
    type: _sequelize.DataTypes.STRING(20),
    allowNull: false,
    comment: 'Số điện thoại người nhận'
  },
  address: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false,
    comment: 'Địa chỉ chi tiết'
  },
  isDefault: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Địa chỉ mặc định'
  }
}, {
  tableName: 'addresses',
  timestamps: true,
  underscored: true,
  indexes: [{
    fields: ['user_id']
  }, {
    fields: ['user_id', 'is_default']
  }]
});
var _default = exports["default"] = Address;