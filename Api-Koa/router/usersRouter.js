import Router from 'koa-router' // 引入koa-router
import validateSchemaJoi from '../middleware/schema.js'
//个人
import UsersController from '../controller/usersController.js'
// 导入需要的验证规则对象
import {
  del_user_schema,
  update_user_schema,
  update_pvg_schema,
  find_user_schema
} from '../schema/user.js'
import upload from '../middleware/upload.js'

const router = new Router({ prefix: '/api/users' }) // 创建路由，支持传递参数

// 获取用户信息的路由
router.get('/infos', UsersController.getUsersInfo)
// 删除用户信息的路由
router.delete(
  '/info',
  validateSchemaJoi('delete', del_user_schema),
  UsersController.delUserInfo
)
// 修改用户头像的路由
router.post('/avatar', upload.single('file'), UsersController.updateUpicInfo)
// 修改用户信息的路由
router.put(
  '/info',
  validateSchemaJoi('put', update_user_schema),
  UsersController.updateUserInfo
)
// 修改用户权限的路由
router.put(
  '/pvg',
  validateSchemaJoi('put', update_pvg_schema),
  UsersController.updateUserPvg
)
// 查找用户信息的路由
router.get(
  '/info',
  validateSchemaJoi('get', find_user_schema),
  UsersController.findUserInfo
)

export default router
