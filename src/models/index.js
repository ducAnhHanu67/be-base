// src/models/index.js (hoặc nơi bạn định nghĩa associations)
import Category from './Category'
import FlashSale from './FlashSale'
import BookGenre from './BookGenre'
import Product from './Product'
import ProductImage from './ProductImage'
import Coupon from './Coupon'
import User from './User'
import Cart from './Cart'
import CartItem from './CartItem'
import Order from './Order'
import OrderItem from './OrderItem'
import Review from './Review'
import Address from './Address'
import Message from './Message'
import ProductHighlight from './ProductHighlight'
import ProductBrand from './ProducBrand'

Category.hasOne(Product, {
  foreignKey: 'categoryId',
  as: 'product' // ← alias phải trùng với include bên dưới
})
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
})

// Product ↔ ProductImage (1-n)
Product.hasMany(ProductImage, {
  foreignKey: 'productId',
  as: 'productImages' // ← alias này
})
ProductImage.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

// Category ↔ Brand (1-n)
Category.hasMany(ProductBrand, { foreignKey: 'categoryId', as: 'brands' })
ProductBrand.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })

// Brand ↔ Product (1-n)
ProductBrand.hasMany(Product, {
  foreignKey: 'brandId',
  as: 'products'
})
Product.belongsTo(ProductBrand, {
  foreignKey: 'brandId',
  as: 'brand'
})

// User ↔ Cart (1-n)
User.hasMany(Cart, {
  foreignKey: 'userId',
  as: 'carts'
})
Cart.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

// Cart ↔ CartItem (1-n)
Cart.hasMany(CartItem, {
  foreignKey: 'cartId',
  as: 'items'
})
CartItem.belongsTo(Cart, {
  foreignKey: 'cartId',
  as: 'cart'
})

// Product ↔ CartItem (1-n)
Product.hasMany(CartItem, {
  foreignKey: 'productId',
  as: 'cartItems'
})
CartItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

// Coupon ↔ Cart (1-n)
Coupon.hasMany(Cart, {
  foreignKey: 'couponId',
  as: 'carts'
})
Cart.belongsTo(Coupon, {
  foreignKey: 'couponId',
  as: 'coupon'
})

// User ↔ Order (1-n)
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
})
Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

// Order ↔ OrderItem (1-n)
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'orderItems'
})
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
})

// Product ↔ OrderItem (1-n)
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
})
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

// Coupon ↔ Order (1-n)
Coupon.hasMany(Order, {
  foreignKey: 'couponId',
  as: 'orders'
})
Order.belongsTo(Coupon, {
  foreignKey: 'couponId',
  as: 'coupon'
})

// User ↔ Review (1-n)
User.hasMany(Review, {
  foreignKey: 'userId',
  as: 'reviews'
})
Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

// Product ↔ Review (1-n)
Product.hasMany(Review, {
  foreignKey: 'productId',
  as: 'reviews'
})
Review.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

// User ↔ Address (1-n)
User.hasMany(Address, {
  foreignKey: 'userId',
  as: 'addresses'
})
Address.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})
// Product ↔ FlashSale (1-1)
Product.hasOne(FlashSale, {
  foreignKey: 'productId',
  as: 'flashSale'
})
FlashSale.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})
Product.hasMany(ProductHighlight, { as: 'highlights', foreignKey: 'productId' })
ProductHighlight.belongsTo(Product, { foreignKey: 'productId' })



export {
  Category,
  BookGenre,
  Product,
  ProductBrand,
  ProductImage,
  Coupon,
  User,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Address,
  Message,
  FlashSale,
  ProductHighlight
}
