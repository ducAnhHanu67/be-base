"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
var _constants = require("../utils/constants");
var _environment = require("./environment");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
// Cấu hình CORS Option
var corsOptions = exports.corsOptions = {
  origin: function origin(_origin, callback) {
    // Cho phép việc gọi API bằng POSTMAN trên môi trường dev,
    // Thông thường khi sử dụng postman thì cái origin sẽ có giá trị là undefined
    if (!_origin && _environment.env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }

    // Kiểm tra dem origin có phải là domain được chấp nhận hay không
    if (_constants.WHITELIST_DOMAINS.includes(_origin)) {
      return callback(null, true);
    }

    // Cuối cùng nếu domain không được chấp nhận thì trả về lỗi
    return callback(new _ApiError["default"](403, "".concat(_origin, " not allowed by our CORS Policy.")));
  },
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,
  // CORS sẽ cho phép nhận cookies từ request
  credentials: true
};