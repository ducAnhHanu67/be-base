"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var Review = _mySQL["default"].define('Review', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  productId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id'
  },
  rating: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{
    fields: ['product_id']
  }, {
    fields: ['user_id']
  }, {
    unique: true,
    fields: ['user_id', 'product_id'],
    name: 'unique_user_product_review'
  }]
});
var _default = exports["default"] = Review;