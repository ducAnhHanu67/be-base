"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudinaryProvider = void 0;
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _streamifier = _interopRequireDefault(require("streamifier"));
var _environment = require("../config/environment");
/**
 * Tài liệu tham khảo
 * https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
 */

// Bước cấu hình cloudinary, sử dụng v2 – version 2
var cloudinaryV2 = _cloudinary["default"].v2;
cloudinaryV2.config({
  cloud_name: _environment.env.CLOUDINARY_CLOUD_NAME,
  api_key: _environment.env.CLOUDINARY_API_KEY,
  api_secret: _environment.env.CLOUDINARY_API_SECRET
});

// Khởi tạo một function để thực hiện upload file lên Cloudinary
var streamUpload = function streamUpload(fileBuffer, folderName) {
  return new Promise(function (resolve, reject) {
    // Tạo một luồng stream upload lên cloudinary
    var stream = cloudinaryV2.uploader.upload_stream({
      folder: folderName
    }, function (err, result) {
      if (err) reject(err);else resolve(result);
    });

    // Thực hiện upload luồng trên bằng lib streamifier
    _streamifier["default"].createReadStream(fileBuffer).pipe(stream);
  });
};
var deleteResource = function deleteResource(publicId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    cloudinaryV2.uploader.destroy(publicId, options, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
var CloudinaryProvider = exports.CloudinaryProvider = {
  streamUpload: streamUpload,
  deleteResource: deleteResource
};