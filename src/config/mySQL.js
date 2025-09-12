import { Sequelize } from 'sequelize'
import { env } from '~/config/environment'
import fs from 'fs'
import path from 'path'

// Tạo đối tượng Sequelize với cấu hình timezone và chuyển đổi bằng
const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'robot', // DB name
  process.env.DATABASE_USER || 'avnadmin', // user
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || 'mysql-robot-ducanhhanu2020-7612.g.aivencloud.com',
    port: process.env.DATABASE_PORT || 22381,
    logging: false,
    dialect: 'mysql',
    timezone: '+07:00',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(
          path.join(__dirname, '..', 'certs', 'ca.pem')
        )
      },
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
          return field.string()
        }
        return next()
      }
    }
  })

// Hàm kiểm tra kết nối
export const CONNECT_DB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
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
