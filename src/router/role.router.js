const Router = require('koa-router')
const roleRouter = new Router()
const { getAllRoles } = require('../controller/role.controller')
roleRouter.post('/role/list', getAllRoles)
module.exports = roleRouter