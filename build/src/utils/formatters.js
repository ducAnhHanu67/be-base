"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slugify = exports.pickUser = void 0;
var _lodash = require("lodash");
// Simple method to Convert a String to Slug
// https://byby.dev/js-slugify-string
var slugify = exports.slugify = function slugify(val) {
  if (!val) return '';
  return String(val).normalize('NFKD') // split accented characters into their base characters and diacritical marks
  .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
  .trim() // trim leading or trailing whitespace
  .toLowerCase() // convert to lowercase
  .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
  .replace(/\s+/g, '-') // replace spaces with hyphens
  .replace(/-+/g, '-'); // remove consecutive hyphens
};

// Lấy một vài dữ liệu cụ thể trong User để tránh việc trả về các dữ liệu nhạy cảm như hash password
var pickUser = exports.pickUser = function pickUser(user) {
  if (!user) return {};
  return (0, _lodash.pick)(user, ['id', 'email', 'userName', 'avatar', 'address', 'role', 'isActive', 'createdAt', 'updatedAt']);
};