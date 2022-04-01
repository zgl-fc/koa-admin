class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    // const token = jwt.sign({ id, name }, PRIVATE_KEY, {
    //   expiresIn: 60 * 60 * 24,
    //   algorithm: 'RS256'
    // })
    // console.log(id, name)
    ctx.body = {
      id,
      name
    }
  }

  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()
