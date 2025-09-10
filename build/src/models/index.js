"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Address", {
  enumerable: true,
  get: function get() {
    return _Address["default"];
  }
});
Object.defineProperty(exports, "BookDetail", {
  enumerable: true,
  get: function get() {
    return _BookDetail["default"];
  }
});
Object.defineProperty(exports, "BookGenre", {
  enumerable: true,
  get: function get() {
    return _BookGenre["default"];
  }
});
Object.defineProperty(exports, "Cart", {
  enumerable: true,
  get: function get() {
    return _Cart["default"];
  }
});
Object.defineProperty(exports, "CartItem", {
  enumerable: true,
  get: function get() {
    return _CartItem["default"];
  }
});
Object.defineProperty(exports, "Category", {
  enumerable: true,
  get: function get() {
    return _Category["default"];
  }
});
Object.defineProperty(exports, "Coupon", {
  enumerable: true,
  get: function get() {
    return _Coupon["default"];
  }
});
Object.defineProperty(exports, "FlashSale", {
  enumerable: true,
  get: function get() {
    return _FlashSale["default"];
  }
});
Object.defineProperty(exports, "Message", {
  enumerable: true,
  get: function get() {
    return _Message["default"];
  }
});
Object.defineProperty(exports, "Order", {
  enumerable: true,
  get: function get() {
    return _Order["default"];
  }
});
Object.defineProperty(exports, "OrderItem", {
  enumerable: true,
  get: function get() {
    return _OrderItem["default"];
  }
});
Object.defineProperty(exports, "Product", {
  enumerable: true,
  get: function get() {
    return _Product["default"];
  }
});
Object.defineProperty(exports, "ProductHighlight", {
  enumerable: true,
  get: function get() {
    return _ProductHighlight["default"];
  }
});
Object.defineProperty(exports, "ProductImage", {
  enumerable: true,
  get: function get() {
    return _ProductImage["default"];
  }
});
Object.defineProperty(exports, "Review", {
  enumerable: true,
  get: function get() {
    return _Review["default"];
  }
});
Object.defineProperty(exports, "StationeryDetail", {
  enumerable: true,
  get: function get() {
    return _StationeryDetail["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _User["default"];
  }
});
var _Category = _interopRequireDefault(require("./Category"));
var _FlashSale = _interopRequireDefault(require("./FlashSale"));
var _BookGenre = _interopRequireDefault(require("./BookGenre"));
var _Product = _interopRequireDefault(require("./Product"));
var _BookDetail = _interopRequireDefault(require("./BookDetail"));
var _StationeryDetail = _interopRequireDefault(require("./StationeryDetail"));
var _ProductImage = _interopRequireDefault(require("./ProductImage"));
var _Coupon = _interopRequireDefault(require("./Coupon"));
var _User = _interopRequireDefault(require("./User"));
var _Cart = _interopRequireDefault(require("./Cart"));
var _CartItem = _interopRequireDefault(require("./CartItem"));
var _Order = _interopRequireDefault(require("./Order"));
var _OrderItem = _interopRequireDefault(require("./OrderItem"));
var _Review = _interopRequireDefault(require("./Review"));
var _Address = _interopRequireDefault(require("./Address"));
var _Message = _interopRequireDefault(require("./Message"));
var _ProductHighlight = _interopRequireDefault(require("./ProductHighlight"));
// src/models/index.js (hoặc nơi bạn định nghĩa associations)

_Category["default"].hasOne(_Product["default"], {
  foreignKey: 'categoryId',
  as: 'product' // ← alias phải trùng với include bên dưới
});
_Product["default"].belongsTo(_Category["default"], {
  foreignKey: 'category_id',
  as: 'category'
});

// Product ↔ BookDetail (1-1)
_Product["default"].hasOne(_BookDetail["default"], {
  foreignKey: 'productId',
  as: 'bookDetail' // ← alias phải trùng với include bên dưới
});
_BookDetail["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});

// Product ↔ ProductImage (1-n)
_Product["default"].hasMany(_ProductImage["default"], {
  foreignKey: 'productId',
  as: 'productImages' // ← alias này
});
_ProductImage["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});
_Product["default"].hasOne(_StationeryDetail["default"], {
  foreignKey: 'productId',
  as: 'stationeryDetail' // ← alias phải trùng với include bên dưới
});
_StationeryDetail["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});

// BookGenre ↔ BookDetail (1-n)
_BookGenre["default"].hasMany(_BookDetail["default"], {
  foreignKey: 'bookGenreId',
  as: 'bookDetails'
});
_BookDetail["default"].belongsTo(_BookGenre["default"], {
  foreignKey: 'bookGenreId',
  as: 'bookGenre'
});

// User ↔ Cart (1-n)
_User["default"].hasMany(_Cart["default"], {
  foreignKey: 'userId',
  as: 'carts'
});
_Cart["default"].belongsTo(_User["default"], {
  foreignKey: 'userId',
  as: 'user'
});

// Cart ↔ CartItem (1-n)
_Cart["default"].hasMany(_CartItem["default"], {
  foreignKey: 'cartId',
  as: 'items'
});
_CartItem["default"].belongsTo(_Cart["default"], {
  foreignKey: 'cartId',
  as: 'cart'
});

// Product ↔ CartItem (1-n)
_Product["default"].hasMany(_CartItem["default"], {
  foreignKey: 'productId',
  as: 'cartItems'
});
_CartItem["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});

// Coupon ↔ Cart (1-n)
_Coupon["default"].hasMany(_Cart["default"], {
  foreignKey: 'couponId',
  as: 'carts'
});
_Cart["default"].belongsTo(_Coupon["default"], {
  foreignKey: 'couponId',
  as: 'coupon'
});

// User ↔ Order (1-n)
_User["default"].hasMany(_Order["default"], {
  foreignKey: 'userId',
  as: 'orders'
});
_Order["default"].belongsTo(_User["default"], {
  foreignKey: 'userId',
  as: 'user'
});

// Order ↔ OrderItem (1-n)
_Order["default"].hasMany(_OrderItem["default"], {
  foreignKey: 'orderId',
  as: 'orderItems'
});
_OrderItem["default"].belongsTo(_Order["default"], {
  foreignKey: 'orderId',
  as: 'order'
});

// Product ↔ OrderItem (1-n)
_Product["default"].hasMany(_OrderItem["default"], {
  foreignKey: 'productId',
  as: 'orderItems'
});
_OrderItem["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});

// Coupon ↔ Order (1-n)
_Coupon["default"].hasMany(_Order["default"], {
  foreignKey: 'couponId',
  as: 'orders'
});
_Order["default"].belongsTo(_Coupon["default"], {
  foreignKey: 'couponId',
  as: 'coupon'
});

// User ↔ Review (1-n)
_User["default"].hasMany(_Review["default"], {
  foreignKey: 'userId',
  as: 'reviews'
});
_Review["default"].belongsTo(_User["default"], {
  foreignKey: 'userId',
  as: 'user'
});

// Product ↔ Review (1-n)
_Product["default"].hasMany(_Review["default"], {
  foreignKey: 'productId',
  as: 'reviews'
});
_Review["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});

// User ↔ Address (1-n)
_User["default"].hasMany(_Address["default"], {
  foreignKey: 'userId',
  as: 'addresses'
});
_Address["default"].belongsTo(_User["default"], {
  foreignKey: 'userId',
  as: 'user'
});
// Product ↔ FlashSale (1-1)
_Product["default"].hasOne(_FlashSale["default"], {
  foreignKey: 'productId',
  as: 'flashSale'
});
_FlashSale["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId',
  as: 'product'
});
_Product["default"].hasMany(_ProductHighlight["default"], {
  as: 'highlights',
  foreignKey: 'productId'
});
_ProductHighlight["default"].belongsTo(_Product["default"], {
  foreignKey: 'productId'
});