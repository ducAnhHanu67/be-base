import { DataTypes, Model } from 'sequelize'
import sequelize from '~/config/mySQL'

class ProductBrand extends Model { }

ProductBrand.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'category_id'
    }
  },
  {
    sequelize,
    modelName: 'ProductBrand',
    tableName: 'product_brands',
    timestamps: true,
    underscored: true
  }
)

export default ProductBrand
