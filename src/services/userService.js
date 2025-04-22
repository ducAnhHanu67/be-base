import Users from '~/models/users'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '~/utils/ApiError'
import { JwtProvider } from '~/providers/JwtProvider'
import { pickUser } from '~/utils/formatters'
import { env } from '~/config/environment'

const register = async (reqBody) => {
  try {
    const existUser = await Users.findOne({
      where: { email: reqBody.email }
    })
    if (existUser) {
      throw new ApiError(409, 'Email already exists!')
    }

    const nameFromEmail = reqBody.email.split('@')[0]
    const newUser = {
      email: reqBody.email,
      password: bcryptjs.hashSync(reqBody.password, 8), // Tham số thứ 2 là độ phức tạp, giá trị càng cao thì băm càng lâu
      userName: nameFromEmail,
      verifyToken: uuidv4()
    }
    const createdUser = await Users.create(newUser)

    return formatDateTimes(createdUser.toJSON())
  } catch (error) {
    throw new Error(error.message)
  }
}

const login = async (reqBody) => {
  try {
    const existUser = await Users.findOne({
      where: { email: reqBody.email }
    })

    if (!existUser) throw new ApiError(404, 'Tài khoản không tồn tại!')
    console.log(existUser)

    if (!bcryptjs.compareSync(reqBody.password, existUser.password)) {
      throw new ApiError(406, 'Email hoặc mật khẩu của bạn không chính xác!')
    }
    // Tạo token đăng nhập trả về phía FE
    // Tạo thông tin đính kèm JWT token bao gồm _id và email user
    const userInfo = {
      id: existUser.id,
      email: existUser.email
    }
    // Tạo ra 2 loại token
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5
      env.ACCESS_TOKEN_LIFE
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      // 15
      env.REFRESH_TOKEN_LIFE
    )

    return { accessToken, refreshToken, ...pickUser(existUser) }
  } catch (error) {
    throw error
  }
}

const refreshToken = async (clientRefreshToken) => {
  try {
    // Verify / giải mã mã refresh token xem nó hợp lệ không
    const refreshTokenDecoded = await JwtProvider.verifyToken(clientRefreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)
    // Đoạn này chỉ lấy thông tin unique để tạo accessToken mới
    const userInfo = {
      id: refreshTokenDecoded.id,
      email: refreshTokenDecoded.email
    }

    // Tạo accessToken mới
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE, // Chuỗi ký accessToken
      // 5
      env.ACCESS_TOKEN_LIFE // Thời gian sống của accessToken
    )

    return { accessToken }
  } catch (error) {
    throw error
  }
}

export const userService = {
  register,
  login,
  refreshToken
}
