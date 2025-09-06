"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PASSWORD_RULE_MESSAGE = exports.PASSWORD_RULE = exports.PASSWORD_CONFIRMATION_MESSAGE = exports.OBJECT_ID_RULE_MESSAGE = exports.OBJECT_ID_RULE = exports.LIMIT_COMMON_FILE_SIZE = exports.FIELD_REQUIRED_MESSAGE = exports.EMAIL_RULE_MESSAGE = exports.EMAIL_RULE = exports.ALLOW_COMMON_FILE_TYPES = void 0;
var OBJECT_ID_RULE = exports.OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
var OBJECT_ID_RULE_MESSAGE = exports.OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!';
var FIELD_REQUIRED_MESSAGE = exports.FIELD_REQUIRED_MESSAGE = 'This field is required.';
var EMAIL_RULE = exports.EMAIL_RULE = /^\S+@\S+\.\S+$/;
var EMAIL_RULE_MESSAGE = exports.EMAIL_RULE_MESSAGE = 'Email is invalid. (example@duocanh.com)';
var PASSWORD_RULE = exports.PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{6,256}$/;
var PASSWORD_RULE_MESSAGE = exports.PASSWORD_RULE_MESSAGE = 'Password must include at least 1 letter, a number, and at least 6 characters.';
var PASSWORD_CONFIRMATION_MESSAGE = exports.PASSWORD_CONFIRMATION_MESSAGE = 'Password Confirmation does not match!';
var LIMIT_COMMON_FILE_SIZE = exports.LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB
var ALLOW_COMMON_FILE_TYPES = exports.ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];