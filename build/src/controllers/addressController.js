"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _addressService = require("../services/addressService");
var createAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userId, addressData, address;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          addressData = req.body;
          _context.next = 5;
          return _addressService.addressService.createAddress(userId, addressData);
        case 5:
          address = _context.sent;
          res.status(201).json({
            message: 'Thêm địa chỉ thành công!',
            data: address
          });
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function createAddress(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getUserAddresses = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var userId, _req$query, _req$query$page, page, _req$query$limit, limit, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 50 : _req$query$limit;
          _context2.next = 5;
          return _addressService.addressService.getUserAddresses(userId, {
            page: page,
            limit: limit
          });
        case 5:
          result = _context2.sent;
          res.status(200).json({
            data: result.addresses,
            pagination: result.pagination
          });
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getUserAddresses(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getAddressById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userId, addressId, address;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          addressId = req.params.id;
          _context3.next = 5;
          return _addressService.addressService.getAddressById(addressId, userId);
        case 5:
          address = _context3.sent;
          res.status(200).json({
            data: address
          });
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getAddressById(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var updateAddress = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userId, addressId, addressData, address;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          addressId = req.params.id;
          addressData = req.body;
          _context4.next = 6;
          return _addressService.addressService.updateAddress(addressId, userId, addressData);
        case 6:
          address = _context4.sent;
          res.status(200).json({
            message: 'Cập nhật địa chỉ thành công!',
            data: address
          });
          _context4.next = 13;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function updateAddress(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteAddress = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userId, addressId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          addressId = req.params.id;
          _context5.next = 5;
          return _addressService.addressService.deleteAddress(addressId, userId);
        case 5:
          res.status(200).json({
            message: 'Xóa địa chỉ thành công!'
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function deleteAddress(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var setDefaultAddress = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var userId, addressId, address;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.user.id;
          addressId = req.params.id;
          _context6.next = 5;
          return _addressService.addressService.setDefaultAddress(addressId, userId);
        case 5:
          address = _context6.sent;
          res.status(200).json({
            message: 'Đặt địa chỉ mặc định thành công!',
            data: address
          });
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function setDefaultAddress(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var getDefaultAddress = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var userId, address;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.user.id;
          _context7.next = 4;
          return _addressService.addressService.getDefaultAddress(userId);
        case 4:
          address = _context7.sent;
          res.status(200).json({
            data: address
          });
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function getDefaultAddress(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var addressController = exports.addressController = {
  createAddress: createAddress,
  getUserAddresses: getUserAddresses,
  getAddressById: getAddressById,
  updateAddress: updateAddress,
  deleteAddress: deleteAddress,
  setDefaultAddress: setDefaultAddress,
  getDefaultAddress: getDefaultAddress
};