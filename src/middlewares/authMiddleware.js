import { JwtProvider } from '~/providers/JwtProvider'
import { env } from '~/config/environment'
import ApiError from '~/utils/ApiError'
import User from '~/models/User'

// Middleware này đảm nhiệm việc quan trọng: Xác thực JWT accessToken nhận được từ phía FE có hợp lệ hay không
const isAuthorized = async (req, res, next) => {
  // Lấy accessToken nằm trong request cookies phía client - withCredentials trong file authorizeAxios
  const clientAccessToken = req.cookies?.accessToken

  // Nếu như clientAccessToken không tồn tại thì trả về lỗi
  if (!clientAccessToken) {
    next(new ApiError(401, 'Unauthorized! (token not found)'))
    return
  }

  try {
    // Giải mã token xem có hợp lệ không
    const accessTokenDecoded = await JwtProvider.verifyToken(
      clientAccessToken,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    )
    // console.log('🚀 ~ isAuthorized ~ accessTokenDecoded:', accessTokenDecoded)
    // Lưu thông tin giải mã được vào req.jwtDecoded để sử dụng các tầng xử lý sau
    req.jwtDecoded = accessTokenDecoded
    // Cho phép request đi tiếp
    next()
  } catch (error) {
    // console.log('🚀 ~ isAuthorized ~ error:', error)
    // Nếu token hết hạn, trả về mã lỗi 410 để FE gọi API refreshToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(410, 'Need to refresh token.'))
      return
    }
    // Nếu token không hợp lệ vì lý do khác, trả về 401 để FE gọi API sign_out
    next(new ApiError(401), 'Unauthorized!')
  }
}

// Middleware kiểm tra quyền Admin
const isAdmin = async (req, res, next) => {
  try {
    // Lấy thông tin user từ token đã được decode trong middleware isAuthorized
    const userId = req.jwtDecoded?.id

    if (!userId) {
      next(new ApiError(401, 'Unauthorized! User not found in token'))
      return
    }

    // Lấy thông tin user từ database để kiểm tra role
    const user = await User.findByPk(userId)

    if (!user) {
      next(new ApiError(404, 'User not found'))
      return
    }

    // Kiểm tra quyền admin
    if (user.role !== 'ADMIN') {
      next(new ApiError(403, 'Forbidden! Admin access required'))
      return
    }

    // Lưu thông tin user vào request để sử dụng ở các middleware tiếp theo
    req.currentUser = user
    next()
  } catch {
    next(new ApiError(500, 'Internal server error'))
  }
}

export const authMiddleware = { isAuthorized, isAdmin }
