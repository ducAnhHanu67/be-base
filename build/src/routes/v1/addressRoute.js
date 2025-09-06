"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressRoute = void 0;
var _express = _interopRequireDefault(require("express"));
var _addressController = require("../../controllers/addressController");
var _authMiddleware = require("../../middlewares/authMiddleware");
var _addressValidation = require("../../validations/addressValidation");
var Router = _express["default"].Router();

// Middleware validation
var validateCreateAddress = function validateCreateAddress(req, res, next) {
  var _createAddressValidat = _addressValidation.createAddressValidation.validate(req.body),
    error = _createAddressValidat.error,
    value = _createAddressValidat.value;
  if (error) {
    return res.status(400).json({
      message: 'Dữ liệu không hợp lệ',
      errors: error.details.map(function (detail) {
        return detail.message;
      })
    });
  }
  req.body = value;
  next();
};
var validateUpdateAddress = function validateUpdateAddress(req, res, next) {
  var _updateAddressValidat = _addressValidation.updateAddressValidation.validate(req.body),
    error = _updateAddressValidat.error,
    value = _updateAddressValidat.value;
  if (error) {
    return res.status(400).json({
      message: 'Dữ liệu không hợp lệ',
      errors: error.details.map(function (detail) {
        return detail.message;
      })
    });
  }
  req.body = value;
  next();
};

// Routes
Router.post('/', _authMiddleware.authMiddleware.isAuthorized, validateCreateAddress, _addressController.addressController.createAddress);
Router.get('/', _authMiddleware.authMiddleware.isAuthorized, _addressController.addressController.getUserAddresses);
Router.get('/default', _authMiddleware.authMiddleware.isAuthorized, _addressController.addressController.getDefaultAddress);
Router.get('/:id', _authMiddleware.authMiddleware.isAuthorized, _addressController.addressController.getAddressById);
Router.put('/:id', _authMiddleware.authMiddleware.isAuthorized, validateUpdateAddress, _addressController.addressController.updateAddress);
Router["delete"]('/:id', _authMiddleware.authMiddleware.isAuthorized, _addressController.addressController.deleteAddress);
Router.patch('/:id/set-default', _authMiddleware.authMiddleware.isAuthorized, _addressController.addressController.setDefaultAddress);
var addressRoute = exports.addressRoute = Router;