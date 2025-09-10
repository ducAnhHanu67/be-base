import { Sequelize } from 'sequelize'
import { env } from '~/config/environment'

// Hàm log toàn bộ env
const logEnv = () => {
  console.log('🌍 ENVIRONMENT CONFIG:')
  console.log({
    DATABASE_HOST: env.DATABASE_HOST,
    DATABASE_PORT: env.DATABASE_PORT,
    DATABASE_NAME: env.DATABASE_NAME,
    DATABASE_USER: env.DATABASE_USER,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD
      ? '***' + env.DATABASE_PASSWORD.slice(-2) // chỉ hiện 2 ký tự cuối
      : null,
    APP_HOST: env.APP_HOST,
    APP_PORT: env.APP_PORT,
    BUILD_MODE: env.BUILD_MODE,
    WEBSITE_DOMAIN: env.WEBSITE_DOMAIN
  })
}


// Tạo đối tượng Sequelize
const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USER,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
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
    logEnv()
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
