const errorTypes = require('../constants/error-types')
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  console.log(name, password)
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = {
    id: 1,
    name: 'fc'
  }
  await next()
}

module.exports = {
  verifyLogin
}
