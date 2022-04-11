const RoleService = require('../service/role.service')
class RoleController {
  async getAllRoles(ctx, next) {
    const { size, offset } = ctx.request.body
    const res = await RoleService.getAllRoles(size, offset)
    ctx.body = res
  }
}

module.exports = new RoleController()
