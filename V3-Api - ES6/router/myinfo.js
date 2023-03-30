import express from 'express'
import {
  getUserInfo,
  getUserStatus,
  updateUserInfo,
  updatePassword,
  updateAvatar
} from '../router_handler/myinfo.js'

// 导入验证数据的中间件
import expressJoi from '@escook/express-joi'

// 导入需要的验证规则对象
import {
  update_userinfo_schema,
  update_password_schema,
} from '../schema/user.js'
const router = express.Router()
// 获取个人信息的路由
router.get('/info', getUserInfo)
// 获取个人权限的路由
router.get('/status', getUserStatus)
// 更新个人信息的路由
router.post('/info', expressJoi(update_userinfo_schema), updateUserInfo)
// 更新个人密码的路由
router.post('/pwd', expressJoi(update_password_schema), updatePassword)
// 更换个人头像的路由
router.post('/avatar',updateAvatar)

export default router
