"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressService = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _models = require("../models");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _mySQL = _interopRequireDefault(require("../config/mySQL"));
var _sequelize = require("sequelize");
var createAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(userId, addressData) {
    var recipientName, recipientEmail, recipientPhone, address, province, district, ward, _addressData$addressT, addressType, notes, _addressData$isDefaul, isDefault, emailRegex, phoneRegex;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          recipientName = addressData.recipientName, recipientEmail = addressData.recipientEmail, recipientPhone = addressData.recipientPhone, address = addressData.address, province = addressData.province, district = addressData.district, ward = addressData.ward, _addressData$addressT = addressData.addressType, addressType = _addressData$addressT === void 0 ? 'HOME' : _addressData$addressT, notes = addressData.notes, _addressData$isDefaul = addressData.isDefault, isDefault = _addressData$isDefaul === void 0 ? false : _addressData$isDefaul; // Validate required fields
          if (!(!recipientName || !recipientEmail || !recipientPhone || !address)) {
            _context2.next = 3;
            break;
          }
          throw new _ApiError["default"](400, 'Vui lòng điền đầy đủ thông tin địa chỉ!');
        case 3:
          // Validate email format
          emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(recipientEmail)) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](400, 'Email không hợp lệ!');
        case 6:
          // Validate phone format (Vietnamese phone number)
          phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
          if (phoneRegex.test(recipientPhone)) {
            _context2.next = 9;
            break;
          }
          throw new _ApiError["default"](400, 'Số điện thoại không hợp lệ!');
        case 9:
          _context2.next = 11;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
              var shouldSetDefault, existingAddressCount, newAddress;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    shouldSetDefault = isDefault; // Nếu đặt làm địa chỉ mặc định, bỏ default của các địa chỉ khác
                    if (!shouldSetDefault) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 4;
                    return _models.Address.update({
                      isDefault: false
                    }, {
                      where: {
                        userId: userId
                      },
                      transaction: t
                    });
                  case 4:
                    _context.next = 10;
                    break;
                  case 6:
                    _context.next = 8;
                    return _models.Address.count({
                      where: {
                        userId: userId
                      },
                      transaction: t
                    });
                  case 8:
                    existingAddressCount = _context.sent;
                    if (existingAddressCount === 0) {
                      shouldSetDefault = true;
                    }
                  case 10:
                    _context.next = 12;
                    return _models.Address.create({
                      userId: userId,
                      recipientName: recipientName,
                      recipientEmail: recipientEmail,
                      recipientPhone: recipientPhone,
                      address: address,
                      province: province,
                      district: district,
                      ward: ward,
                      addressType: addressType,
                      notes: notes,
                      isDefault: shouldSetDefault
                    }, {
                      transaction: t
                    });
                  case 12:
                    newAddress = _context.sent;
                    return _context.abrupt("return", newAddress);
                  case 14:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 11:
          return _context2.abrupt("return", _context2.sent);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createAddress(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUserAddresses = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var addresses;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _models.Address.findAll({
            where: {
              userId: userId
            },
            order: [['isDefault', 'DESC'], ['createdAt', 'DESC']]
          });
        case 2:
          addresses = _context3.sent;
          return _context3.abrupt("return", addresses);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getUserAddresses(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getAddressById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(addressId, userId) {
    var address;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _models.Address.findOne({
            where: {
              id: addressId,
              userId: userId
            }
          });
        case 2:
          address = _context4.sent;
          if (address) {
            _context4.next = 5;
            break;
          }
          throw new _ApiError["default"](404, 'Không tìm thấy địa chỉ!');
        case 5:
          return _context4.abrupt("return", address);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getAddressById(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var updateAddress = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(addressId, userId, addressData) {
    var recipientName, recipientEmail, recipientPhone, address, province, district, ward, addressType, notes, isDefault, emailRegex, phoneRegex;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          recipientName = addressData.recipientName, recipientEmail = addressData.recipientEmail, recipientPhone = addressData.recipientPhone, address = addressData.address, province = addressData.province, district = addressData.district, ward = addressData.ward, addressType = addressData.addressType, notes = addressData.notes, isDefault = addressData.isDefault; // Validate email format if provided
          if (!recipientEmail) {
            _context6.next = 5;
            break;
          }
          emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(recipientEmail)) {
            _context6.next = 5;
            break;
          }
          throw new _ApiError["default"](400, 'Email không hợp lệ!');
        case 5:
          if (!recipientPhone) {
            _context6.next = 9;
            break;
          }
          phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
          if (phoneRegex.test(recipientPhone)) {
            _context6.next = 9;
            break;
          }
          throw new _ApiError["default"](400, 'Số điện thoại không hợp lệ!');
        case 9:
          _context6.next = 11;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(t) {
              var existingAddress, updateData, _yield$Address$update, _yield$Address$update2, affectedRows, updatedAddress;
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _models.Address.findOne({
                      where: {
                        id: addressId,
                        userId: userId
                      },
                      transaction: t
                    });
                  case 2:
                    existingAddress = _context5.sent;
                    if (existingAddress) {
                      _context5.next = 5;
                      break;
                    }
                    throw new _ApiError["default"](404, 'Không tìm thấy địa chỉ!');
                  case 5:
                    if (!(isDefault && !existingAddress.isDefault)) {
                      _context5.next = 8;
                      break;
                    }
                    _context5.next = 8;
                    return _models.Address.update({
                      isDefault: false
                    }, {
                      where: {
                        userId: userId,
                        id: (0, _defineProperty2["default"])({}, _sequelize.Op.ne, addressId)
                      },
                      transaction: t
                    });
                  case 8:
                    updateData = {};
                    if (recipientName !== undefined) updateData.recipientName = recipientName;
                    if (recipientEmail !== undefined) updateData.recipientEmail = recipientEmail;
                    if (recipientPhone !== undefined) updateData.recipientPhone = recipientPhone;
                    if (address !== undefined) updateData.address = address;
                    if (province !== undefined) updateData.province = province;
                    if (district !== undefined) updateData.district = district;
                    if (ward !== undefined) updateData.ward = ward;
                    if (addressType !== undefined) updateData.addressType = addressType;
                    if (notes !== undefined) updateData.notes = notes;
                    if (isDefault !== undefined) updateData.isDefault = isDefault;
                    _context5.next = 21;
                    return _models.Address.update(updateData, {
                      where: {
                        id: addressId,
                        userId: userId
                      },
                      transaction: t
                    });
                  case 21:
                    _yield$Address$update = _context5.sent;
                    _yield$Address$update2 = (0, _slicedToArray2["default"])(_yield$Address$update, 1);
                    affectedRows = _yield$Address$update2[0];
                    if (!(affectedRows === 0)) {
                      _context5.next = 26;
                      break;
                    }
                    throw new _ApiError["default"](404, 'Không tìm thấy địa chỉ để cập nhật!');
                  case 26:
                    _context5.next = 28;
                    return _models.Address.findByPk(addressId, {
                      transaction: t
                    });
                  case 28:
                    updatedAddress = _context5.sent;
                    return _context5.abrupt("return", updatedAddress);
                  case 30:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x10) {
              return _ref6.apply(this, arguments);
            };
          }());
        case 11:
          return _context6.abrupt("return", _context6.sent);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateAddress(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteAddress = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(addressId, userId) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(t) {
              var address, wasDefault, remainingAddresses;
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return _models.Address.findOne({
                      where: {
                        id: addressId,
                        userId: userId
                      },
                      transaction: t
                    });
                  case 2:
                    address = _context7.sent;
                    if (address) {
                      _context7.next = 5;
                      break;
                    }
                    throw new _ApiError["default"](404, 'Không tìm thấy địa chỉ!');
                  case 5:
                    wasDefault = address.isDefault;
                    _context7.next = 8;
                    return address.destroy({
                      transaction: t
                    });
                  case 8:
                    if (!wasDefault) {
                      _context7.next = 15;
                      break;
                    }
                    _context7.next = 11;
                    return _models.Address.findAll({
                      where: {
                        userId: userId
                      },
                      order: [['createdAt', 'DESC']],
                      limit: 1,
                      transaction: t
                    });
                  case 11:
                    remainingAddresses = _context7.sent;
                    if (!(remainingAddresses.length > 0)) {
                      _context7.next = 15;
                      break;
                    }
                    _context7.next = 15;
                    return remainingAddresses[0].update({
                      isDefault: true
                    }, {
                      transaction: t
                    });
                  case 15:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return function (_x13) {
              return _ref8.apply(this, arguments);
            };
          }());
        case 2:
          return _context8.abrupt("return", _context8.sent);
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteAddress(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var setDefaultAddress = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(addressId, userId) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _mySQL["default"].transaction(/*#__PURE__*/function () {
            var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(t) {
              var address;
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _models.Address.findOne({
                      where: {
                        id: addressId,
                        userId: userId
                      },
                      transaction: t
                    });
                  case 2:
                    address = _context9.sent;
                    if (address) {
                      _context9.next = 5;
                      break;
                    }
                    throw new _ApiError["default"](404, 'Không tìm thấy địa chỉ!');
                  case 5:
                    if (!address.isDefault) {
                      _context9.next = 7;
                      break;
                    }
                    throw new _ApiError["default"](400, 'Địa chỉ này đã là địa chỉ mặc định!');
                  case 7:
                    _context9.next = 9;
                    return _models.Address.update({
                      isDefault: false
                    }, {
                      where: {
                        userId: userId
                      },
                      transaction: t
                    });
                  case 9:
                    _context9.next = 11;
                    return address.update({
                      isDefault: true
                    }, {
                      transaction: t
                    });
                  case 11:
                    return _context9.abrupt("return", address);
                  case 12:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x16) {
              return _ref10.apply(this, arguments);
            };
          }());
        case 2:
          return _context10.abrupt("return", _context10.sent);
        case 3:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function setDefaultAddress(_x14, _x15) {
    return _ref9.apply(this, arguments);
  };
}();
var getDefaultAddress = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(userId) {
    var defaultAddress;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _models.Address.findOne({
            where: {
              userId: userId,
              isDefault: true
            }
          });
        case 2:
          defaultAddress = _context11.sent;
          return _context11.abrupt("return", defaultAddress);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getDefaultAddress(_x17) {
    return _ref11.apply(this, arguments);
  };
}();
var addressService = exports.addressService = {
  createAddress: createAddress,
  getUserAddresses: getUserAddresses,
  getAddressById: getAddressById,
  updateAddress: updateAddress,
  deleteAddress: deleteAddress,
  setDefaultAddress: setDefaultAddress,
  getDefaultAddress: getDefaultAddress
};