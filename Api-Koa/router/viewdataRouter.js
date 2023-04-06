import Router from 'koa-router' // 引入koa-router
//个人
import ViewDataController from '../controller/viewdataController.js'

const router = new Router({ prefix: '/api/view' }) // 创建路由，支持传递参数

// 获取折线图数据的路由
router.get('/stack', ViewDataController.getStackedLine)
// 获取散点图数据的路由
router.get('/geo', ViewDataController.getGeoScatter)

export default router
