import Router from 'koa-router' // 引入koa-router
import validateSchemaJoi from '../middleware/schema.js'
//个人
import MyController from '../controller/myController.js'
// 导入需要的验证规则对象
import { update_myinfo_schema, update_password_schema } from '../schema/my.js'
import upload from '../middleware/upload.js'

const router = new Router({ prefix: '/api/my' }) // 创建路由，支持传递参数

// 获取个人信息的路由
router.get('/info', MyController.getMyInfo)
// 获取个人权限的路由
router.get('/router', MyController.getMyRouter)
// 更新个人信息的路由
router.post(
  '/info',
  validateSchemaJoi('post', update_myinfo_schema),
  MyController.updateMyInfo
)
// 更新个人密码的路由
router.post(
  '/pwd',
  validateSchemaJoi('post', update_password_schema),
  MyController.updateMyPwd
)
// 更新个人头像的路由
router.post('/avatar', upload.single('file'), MyController.updateMyAvr)

export default router
