"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSocketServer = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _socket = require("socket.io");
var _models = require("../models");
var _socket2 = require("../services/socket.service");
var users = []; // Danh sách người dùng (theo name)
var adminSockets = []; // Danh sách socket của admin

var initSocketServer = exports.initSocketServer = function initSocketServer(io) {
  io.on('connection', function (socket) {


    // 🔹 Admin kết nối
    socket.on('adminConnect', function () {
      socket.role = 'admin';
      adminSockets.push(socket);
      socket.join('admin');

      io.emit('userList', users);
    });

    // 🔹 Người dùng đăng ký
    socket.on('register', function (user) {
      var name = user.name,
        service = user.service,
        message = user.message;
      var newUser = {
        id: socket.id,
        name: name,
        service: service,
        message: message
      };
      users = users.filter(function (u) {
        return u.name !== name;
      }); // tránh trùng tên
      users.push(newUser);
      socket.join(name); // Mỗi người join room riêng theo `name`

      io.emit('userList', users);
    });

    // 🔹 Lấy danh sách người dùng
    socket.on('getUserList', /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var users;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _socket2.getAllUsersWithMetadata)();
          case 2:
            users = _context.sent;
            io.emit('userList', users);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));

    // 🔹 Tham gia phòng chat
    socket.on('joinConversation', function (name) {
      socket.join(name);
    });

    // 🔹 Gửi tin nhắn
    socket.on('sendMessage', /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(msg) {
        var from, to, content, timestamp;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              from = msg.from, to = msg.to, content = msg.content, timestamp = msg.timestamp; // Gửi cho người nhận
              io.to(to).emit('newMessage', msg);

              // Gửi lại cho admin
              adminSockets.forEach(function (adminSocket) {
                adminSocket.emit('newMessage', msg);
              });

              // Lưu DB
              _context2.next = 5;
              return (0, _socket2.saveMessageToDB)(from, to, content, timestamp);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    // 🔹 Admin lấy lịch sử chat theo tên người dùng
    socket.on('getMessages', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(name) {
        var messages;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _socket2.getMessageHistory)(name);
            case 2:
              messages = _context3.sent;
              socket.emit('messageHistory', messages);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    // 🔹 Ngắt kết nối
    socket.on('disconnect', function () {
      console.log('❌ Socket disconnected:', socket.id);
      users = users.filter(function (u) {
        return u.id !== socket.id;
      });
      adminSockets = adminSockets.filter(function (adminSocket) {
        return adminSocket.id !== socket.id;
      });
      io.emit('userList', users);
    });
  });
};