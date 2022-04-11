const connection = require('../app/database')
const toTree = require('../utils/toTree')
class MenuRoleService {
  async createMenuRole(roleId, menuArr) {
    const delState = `DELETE FROM role_menu WHERE roleId = ${roleId}`
    const insertState = `INSERT INTO role_menu VALUES (?, ?)`
    await connection.beginTransaction()
    try {
      let result = null
      await connection.execute(delState)
      for (const menuId of menuArr) {
        result = await connection.execute(insertState, [
          roleId,
          menuId
        ])
      }
      return result
    } catch (err) {
      connection.rollback()
    }
    console.log(result)
  }

  async getRoleMenu(roleId) {
    const statement = `SELECT m.*
    FROM
      role r
      LEFT JOIN role_menu rm ON r.id = rm.roleId
      LEFT JOIN menu m ON rm.menuId = m.id 
    WHERE
      r.id = ?
    `
    const result = await connection.execute(statement, [roleId])
    const menuList = toTree(result[0], null)
    return menuList
  }
}

module.exports = new MenuRoleService()
