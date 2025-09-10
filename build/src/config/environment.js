"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
require("dotenv/config");
var isProduction = process.env.BUILD_MODE === 'production';
var env = exports.env = {
  DATABASE_HOST: isProduction ? process.env.PROD_DATABASE_HOST : process.env.LOCAL_DATABASE_HOST,
  DATABASE_NAME: isProduction ? process.env.PROD_DATABASE_NAME : process.env.LOCAL_DATABASE_NAME,
  DATABASE_USER: isProduction ? process.env.PROD_DATABASE_USER : process.env.LOCAL_DATABASE_USER,
  DATABASE_PASSWORD: isProduction ? process.env.PROD_DATABASE_PASSWORD : process.env.LOCAL_DATABASE_PASSWORD,
  DATABASE_PORT: isProduction ? process.env.PROD_DATABASE_PORT : process.env.LOCAL_DATABASE_PORT,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_PORT: process.env.APP_PORT || 3000,
  BUILD_MODE: process.env.BUILD_MODE || 'local',
  WEBSITE_DOMAIN: isProduction ? process.env.WEBSITE_DOMAIN_PRODUCTION : process.env.WEBSITE_DOMAIN_DEVELOPMENT,
  // Token
  ACCESS_TOKEN_SECRET_SIGNATURE: process.env.ACCESS_TOKEN_SECRET_SIGNATURE,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET_SIGNATURE: process.env.REFRESH_TOKEN_SECRET_SIGNATURE,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  // Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  // VNPAY
  VNPAY_TMN_CODE: process.env.VNPAY_TMN_CODE,
  VNPAY_HASH_SECRET: process.env.VNPAY_HASH_SECRET,
  VNPAY_URL: process.env.VNPAY_URL,
  VNPAY_RETURN_URL: process.env.VNPAY_RETURN_URL
};