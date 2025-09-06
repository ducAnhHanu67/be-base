"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadImageProvider = void 0;
exports.deleteImage = deleteImage;
exports.uploadImage = uploadImage;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _environment = require("../config/environment");
/**
 * Provider for handling local file uploads and deletions.
 * Files are saved under `public/images/<folderName>`.
 * Returns full URL paths for direct use in <img> src.
 */
var BASE_UPLOAD_DIR = _path["default"].resolve(__dirname, '..', '..', 'public', 'images');
var BASE_URL = _environment.env.BASE_URL || 'http://localhost:3000';

/**
 * Uploads a file buffer to local storage under public/images.
 * @param fileBuffer - The file data as a Buffer.
 * @param folderName - Subdirectory under the public/images directory.
 * @param originalName - Original filename (to preserve extension).
 * @returns An object containing the saved file's disk path, public URL, and filename.
 */
function uploadImage(_x, _x2, _x3) {
  return _uploadImage.apply(this, arguments);
}
/**
 * Deletes a file from local storage given its public URL.
 * @param fileUrl - Full public URL of the uploaded file.
 */
function _uploadImage() {
  _uploadImage = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(fileBuffer, folderName, originalName) {
    var targetDir, ext, baseName, filename, fullPath, fileUrl;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Ensure the target folder exists under public/images
          targetDir = _path["default"].join(BASE_UPLOAD_DIR, folderName);
          _fs["default"].mkdirSync(targetDir, {
            recursive: true
          });

          // Generate a unique filename preserving extension
          ext = _path["default"].extname(originalName);
          baseName = _path["default"].basename(originalName, ext);
          filename = "".concat(Date.now(), "-").concat(baseName).concat(ext); // Absolute disk path
          fullPath = _path["default"].join(targetDir, filename); // Write the file buffer to disk
          _context.next = 8;
          return _fs["default"].promises.writeFile(fullPath, fileBuffer);
        case 8:
          // Construct public URL for <img src>
          fileUrl = "".concat(BASE_URL, "/images/").concat(folderName, "/").concat(filename);
          return _context.abrupt("return", {
            filename: filename,
            fullPath: fullPath,
            fileUrl: fileUrl
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _uploadImage.apply(this, arguments);
}
function deleteImage(_x4) {
  return _deleteImage.apply(this, arguments);
}
function _deleteImage() {
  _deleteImage = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(fileUrl) {
    var urlPath, relative, fullPath;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          urlPath = new URL(fileUrl).pathname;
          relative = urlPath.replace(/^\/images\//, '');
          fullPath = _path["default"].join(BASE_UPLOAD_DIR, relative);
          _context2.next = 6;
          return _fs["default"].promises.unlink(fullPath);
        case 6:
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.warn("Failed to delete file from ".concat(fileUrl, ":"), _context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _deleteImage.apply(this, arguments);
}
var UploadImageProvider = exports.UploadImageProvider = {
  uploadImage: uploadImage,
  deleteImage: deleteImage
};