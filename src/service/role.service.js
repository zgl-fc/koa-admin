const connection = require('../app/database')
const MenuRoleService = require('./menu_role.service')
class RoleService {
  async getAllRoles(size, offset) {
    const statement = `SELECT * FROM role LIMIT ? OFFSET ?`
    const result = await connection.query(statement, [
      size,
      offset
    ])
    const roleList = result[0]
    for(const role of roleList) {
      delete role['is_del']
      try {
        const menuList = await MenuRoleService.getRoleMenu(role.id)
        role.menuList = menuList
      } catch (error) {
        console.log(error)
      }
    }
    return roleList
  }
}

module.exports = new RoleService()
