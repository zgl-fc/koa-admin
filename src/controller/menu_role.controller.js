const MenuRoleService = require('../service/menu_role.service')
class MenuRoleController {
  async addMenuRole(ctx, next) {
    const { roleId } = ctx.params
    const { menuArr } = ctx.request.body
    try {
      await MenuRoleService.createMenuRole(roleId, menuArr)
    } catch (error) {
      console.log(error)
    }
    ctx.body = {
      roleId,
      menuArr
    }
  }

  async getRoleMenu(ctx, next) {
    const { roleId } = ctx.params
    const menuList = await MenuRoleService.getRoleMenu(roleId)
    ctx.body = menuList
  }
}

module.exports = new MenuRoleController()