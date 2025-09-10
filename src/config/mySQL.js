import { Sequelize } from 'sequelize'
import { env } from '~/config/environment'


// Tạo đối tượng Sequelize
const sequelize = new Sequelize(
  'nhrobzuz_robot',
  'nhrobzuz_robot',
  'Duc@nh123',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return field.string()
        }
        return next()
      }
    }
  }
)

// Hàm kiểm tra kết nối
export const CONNECT_DB = async () => {
  try {
    console.log('1. Connecting to MySQL...')
    await sequelize.authenticate()
    console.log(
      `2. ✅ Connected to MySQL: db=${env.DATABASE_NAME}, user=${env.DATABASE_USER}, host=${env.DATABASE_HOST}, port=${env.DATABASE_PORT}`
    )
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error)
  }
}

export const CLOSE_DB = async () => {
  try {
    await sequelize.close()
    console.log('Database connection closed successfully.')
  } catch (error) {
    console.error('Error while closing database connection:', error)
  }
}

export default sequelize
