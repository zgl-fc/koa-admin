const jwt = require('jsonwebtoken')
const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')
const { PRIVATE_KEY } = require('../app/config')


const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(
      errorTypes.NAME_OR_PASSWORD_IS_REQUIRED
    )
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断用户是否存在的
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 4.判断密码是否和数据库中的密码是一致(加密)
  if (md5password(password) !== user.password) {
    const error = new Error(
      errorTypes.PASSWORD_IS_INCORRENT
    )
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  console.log(token)
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PRIVATE_KEY)
    ctx.user = result
    console.log(result)
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
