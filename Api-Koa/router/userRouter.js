import Router from 'koa-router' // 引入koa-router
import validateSchemaJoi from '../middleware/schema.js'
//用户
import UserController from '../controller/userController.js'
// 导入需要的验证规则对象
import { reg_login_schema } from '../schema/my.js'

const router = new Router({ prefix: '/api' }) // 创建路由，支持传递参数

//用户注册
router.post(
  '/register',
  validateSchemaJoi('post', reg_login_schema),
  UserController.register
)
//用户登录
router.post(
  '/login',
  validateSchemaJoi('post', reg_login_schema),
  UserController.login
)

export default router
