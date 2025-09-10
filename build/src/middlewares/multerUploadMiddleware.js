"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerUploadMiddleware = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _validators = require("../utils/validators");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
/**
 * Docs của multer
 * https://www.npmjs.com/package/multer
 */
// Function kiểm tra loại file nào được chấp nhận
var customFileFilter = function customFileFilter(req, file, callback) {
  console.log('Multer file: ', file);
  console.log('first');

  // Đối với multer kiểm tra kiểu file sử dụng mimetype
  if (!_validators.ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    var errMessage = 'File type is invalid. Only accept jpg, jpeg and png';
    return callback(new _ApiError["default"](422, errMessage), null);
  }
  // Nếu như kiểu file hợp lệ
  return callback(null, true);
};

// Khởi tạo function upload được bọc bởi multer
var upload = (0, _multer["default"])({
  limits: {
    fileSize: _validators.LIMIT_COMMON_FILE_SIZE
  },
  fileFilter: customFileFilter
});
var multerUploadMiddleware = exports.multerUploadMiddleware = {
  upload: upload
};