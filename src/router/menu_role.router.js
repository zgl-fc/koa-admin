const Router = require('koa-router')


const { addMenuRole, getRoleMenu } = require('../controller/menu_role.controller')
const menuRoleRouter = new Router()

menuRoleRouter.get('/role/:roleId/menu', getRoleMenu)
menuRoleRouter.post('/role/:roleId/menu', addMenuRole)

module.exports = menuRoleRouter