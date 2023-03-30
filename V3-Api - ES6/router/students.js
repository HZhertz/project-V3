import express from 'express'
import {
  getStudents,
  findStudent,
  delStudent,
  addStuInfo,
  updateStuInfo,
  getStuWorks,
  updateStuWorks
} from '../router_handler/students.js'

const router = express.Router()
// 获取学生信息的路由
router.get('/students', getStudents)
// 查找学生信息的路由
router.get('/student', findStudent)
// 删除学生信息的路由
router.delete('/student', delStudent)
// 新增学生相关信息的路由
router.post('/student', addStuInfo)
// 修改学生相关信息的路由
router.put('/student', updateStuInfo)
// 获取作业相关信息的路由(分页)
router.get('/works', getStuWorks)
// 修改作业相关信息的路由
router.put('/works', updateStuWorks)

export default router
