"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Message = _mySQL["default"].define('Message', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sender: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  receiver: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false,
    defaultValue: _sequelize.DataTypes.NOW
  }
}, {
  tableName: 'messages',
  timestamps: true,
  // Nếu bạn muốn Sequelize tạo createdAt, updatedAt
  underscored: true,
  // Sẽ sinh ra created_at thay vì createdAt
  indexes: [{
    fields: ['sender']
  }, {
    fields: ['receiver']
  }]
});
var _default = exports["default"] = Message;