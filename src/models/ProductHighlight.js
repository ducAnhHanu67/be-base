import { DataTypes } from 'sequelize'
import sequelize from '~/config/mySQL'

const ProductHighlight = sequelize.define(
    'ProductHighlight',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.BIGINT, // 👈 khớp với kiểu products.id (BIGINT nếu bạn đã set)
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'product_highlights',
        timestamps: true,
        underscored: true
    }
)

export default ProductHighlight
