import User from '~/models/User'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '~/utils/ApiError'
import { JwtProvider } from '~/providers/JwtProvider'
import { pickUser } from '~/utils/formatters'
import { env } from '~/config/environment'
import { OAuth2Client } from 'google-auth-library'

const register = async (reqBody) => {
  try {
    const existUser = await User.findOne({
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
      verifyToken: uuidv4(),
      isActive: false,
      role: 'CLIENT'
    }
    const createdUser = await User.create(newUser)

    return createdUser.toJSON()
  } catch (error) {
    throw new Error(error.message)
  }
}

const login = async (reqBody) => {
  try {
    const existUser = await User.findOne({
      where: { email: reqBody.email }
    })

    if (!existUser) throw new ApiError(406, 'Email hoặc mật khẩu không chính xác!')

    if (!bcryptjs.compareSync(reqBody.password, existUser.password)) {
      throw new ApiError(406, 'Email hoặc mật khẩu không chính xác!')
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
      15
      // env.ACCESS_TOKEN_LIFE
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
    const refreshTokenDecoded = await JwtProvider.verifyToken(
      clientRefreshToken,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )
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

const googleLogin = async (googleToken) => {
  try {
    // Nếu không có GOOGLE_CLIENT_ID, ném lỗi
    if (!env.GOOGLE_CLIENT_ID) {
      throw new ApiError(500, 'Google Client ID not configured')
    }

    const client = new OAuth2Client(env.GOOGLE_CLIENT_ID)

    // Xác thực Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    if (!email) {
      throw new ApiError(400, 'Cannot get email from Google token')
    }

    // Kiểm tra user đã tồn tại chưa
    let existUser = await User.findOne({
      where: { email: email }
    })

    // Nếu chưa tồn tại, tạo user mới
    if (!existUser) {
      const newUser = {
        email: email,
        password: bcryptjs.hashSync(uuidv4(), 8), // Random password cho Google user
        userName: name || email.split('@')[0],
        avatar: picture || null,
        verifyToken: 'google_verified',
        isActive: true, // Google user mặc định đã active
        role: 'CLIENT'
      }
      existUser = await User.create(newUser)
    }

    // Tạo token đăng nhập
    const userInfo = {
      id: existUser.id,
      email: existUser.email
    }

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )

    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      env.REFRESH_TOKEN_LIFE
    )

    return { accessToken, refreshToken, ...pickUser(existUser) }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(401, 'Invalid Google token')
  }
}

export const userService = {
  register,
  login,
  refreshToken,
  googleLogin
}
