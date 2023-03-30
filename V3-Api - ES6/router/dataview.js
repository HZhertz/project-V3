import express from 'express'
import { getView, getTravel } from '../router_handler/dataview.js'

const router = express.Router()
// 获取图表信息的路由
router.get('/view', getView)
// 获取地图信息的路由
router.get('/travel', getTravel)

export default router
