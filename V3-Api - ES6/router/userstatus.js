import express from 'express'
import { getUsersInfo,updateUsersPic,updateUsersInfo,updateUsersStatus,deleteUsersInfo } from '../router_handler/userstatus.js'
const router = express.Router()

// 获取用户信息的路由
router.get('/usersinfo', getUsersInfo)
// 修改用户头像的路由
router.post('/userspic', updateUsersPic)
// 修改用户信息的路由
router.put('/usersinfo', updateUsersInfo)
// 修改用户权限的路由
router.put('/userstatus', updateUsersStatus)
// 删除用户信息的路由
router.delete('/usersinfo', deleteUsersInfo)

export default router
