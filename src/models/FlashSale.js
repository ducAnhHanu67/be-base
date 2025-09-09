import { DataTypes } from 'sequelize'
import sequelize from '~/config/mySQL'

const FlashSale = sequelize.define(
    'FlashSale',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        flashPrice: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'flashsales',
        timestamps: true,
        underscored: true
    }
)

export default FlashSale
