"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _crypto = _interopRequireDefault(require("crypto"));
var _environment = require("../config/environment");
var _qs = _interopRequireDefault(require("qs"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var sortObject = function sortObject(params) {
  return Object.entries(params).sort(function (_ref, _ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref, 1),
      key1 = _ref3[0];
    var _ref4 = (0, _slicedToArray2["default"])(_ref2, 1),
      key2 = _ref4[0];
    return key1.toString().localeCompare(key2.toString());
  }).reduce(function (result, item) {
    result = _objectSpread(_objectSpread({}, result), {}, (0, _defineProperty2["default"])({}, item[0], encodeURIComponent(item[1].toString().replace(/ /g, '+'))));
    return result;
  }, {});
};
var VNPayProvider = /*#__PURE__*/function () {
  function VNPayProvider() {
    (0, _classCallCheck2["default"])(this, VNPayProvider);
    this.tmnCode = _environment.env.VNPAY_TMN_CODE;
    this.secretKey = _environment.env.VNPAY_HASH_SECRET;
    this.vnpUrl = _environment.env.VNPAY_URL;
    this.returnUrl = _environment.env.VNPAY_RETURN_URL;
  }

  /**
   * Tạo URL thanh toán VNPay
   */
  return (0, _createClass2["default"])(VNPayProvider, [{
    key: "createPaymentUrl",
    value: function createPaymentUrl(_ref5) {
      var orderId = _ref5.orderId,
        amount = _ref5.amount,
        orderInfo = _ref5.orderInfo,
        ipAddr = _ref5.ipAddr;
      // const ipAddr =
      //   req.headers['x-forwarded-for'] ||
      //   req.connection.remoteAddress ||
      //   req.socket.remoteAddress ||
      //   req.connection.socket.remoteAddress

      var vnpUrl = this.vnpUrl;
      var date = new Date();
      var createDate = (0, _dayjs["default"])(date).format('YYYYMMDDHHmmss');
      var expiredDate = (0, _dayjs["default"])(date).add(10, 'm').format('YYYYMMDDHHmmss');
      var currCode = 'VND';
      var vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = this.tmnCode;
      vnp_Params['vnp_Locale'] = 'vn';
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = orderInfo;
      vnp_Params['vnp_OrderType'] = 'other';
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = this.returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;
      vnp_Params['vnp_ExpireDate'] = expiredDate;
      console.log(vnp_Params);
      vnp_Params = sortObject(vnp_Params);
      var signData = _qs["default"].stringify(vnp_Params, {
        encode: false
      });
      var hmac = _crypto["default"].createHmac('sha512', this.secretKey);
      var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + _qs["default"].stringify(vnp_Params, {
        encode: false
      });
      return vnpUrl;
    }
  }]);
}();
var _default = exports["default"] = new VNPayProvider();