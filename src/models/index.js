// src/models/index.js (hoặc nơi bạn định nghĩa associations)
import Category from './Category'
import BookGenre from './BookGenre'
import Product from './Product'
import BookDetail from './BookDetail'
import StationeryDetail from './StationeryDetail'
import ProductImage from './ProductImage'

Category.hasOne(Product, {
  foreignKey: 'categoryId',
  as: 'product' // ← alias phải trùng với include bên dưới
})
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
})

// Product ↔ BookDetail (1-1)
Product.hasOne(BookDetail, {
  foreignKey: 'productId',
  as: 'bookDetail' // ← alias phải trùng với include bên dưới
})
BookDetail.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
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

Product.hasOne(StationeryDetail, {
  foreignKey: 'productId',
  as: 'stationeryDetail' // ← alias phải trùng với include bên dưới
})
StationeryDetail.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
})

export { Category, BookGenre, Product, BookDetail, StationeryDetail, ProductImage }
