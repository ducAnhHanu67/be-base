"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveMessageToDB = exports.getMessageHistory = exports.getAllUsersWithMetadata = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../models");
var _sequelize = require("sequelize");
// Lưu tin nhắn vào DB
var saveMessageToDB = exports.saveMessageToDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(from, to, content, timestamp) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _models.Message.create({
            sender: from,
            receiver: to,
            content: content,
            timestamp: timestamp
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function saveMessageToDB(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

// Lấy lịch sử tin nhắn liên quan đến 1 số điện thoại
var getMessageHistory = exports.getMessageHistory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(phone) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _models.Message.findAll({
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              sender: phone
            }, {
              receiver: phone
            }]),
            order: [['timestamp', 'ASC']]
          });
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getMessageHistory(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

// Lấy danh sách user có tương tác
var getAllUsersWithMetadata = exports.getAllUsersWithMetadata = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var messages, latestMessages;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _models.Message.findAll({
            attributes: ['sender', 'receiver', 'content', 'timestamp'],
            where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              sender: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, 'admin')
            },
            // Loại trừ admin khỏi danh sách người gửi
            {
              receiver: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, 'admin')
            } // Loại trừ admin khỏi danh sách người nhận
            ]),
            order: [['timestamp', 'DESC']]
          });
        case 2:
          messages = _context3.sent;
          // Dùng Map để lấy tin nhắn cuối cùng từ mỗi người
          latestMessages = new Map();
          messages.forEach(function (msg) {
            var phone = msg.sender !== 'admin' ? msg.sender : msg.receiver;

            // Nếu chưa có người này trong Map, thêm vào
            if (!latestMessages.has(phone)) {
              latestMessages.set(phone, {
                id: phone,
                phone: phone,
                name: 'Ẩn danh',
                // Tạm thời gán tên mặc định
                message: msg.content
              });
            }
          });

          // Chuyển Map thành mảng và trả về
          return _context3.abrupt("return", Array.from(latestMessages.values()));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getAllUsersWithMetadata() {
    return _ref3.apply(this, arguments);
  };
}();