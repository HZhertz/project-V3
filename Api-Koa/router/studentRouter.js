import Router from 'koa-router' // 引入koa-router
import validateSchemaJoi from '../middleware/schema.js'
//个人
import StudentController from '../controller/studentController.js'
// 导入需要的验证规则对象
import {
  add_stu_schema,
  del_stu_schema,
  update_stu_schema,
  find_stu_schema,
  update_work_schema,
  find_work_schema
} from '../schema/student.js'

const router = new Router({ prefix: '/api/student' }) // 创建路由，支持传递参数

// 获取学生信息的路由
router.get('/infos', StudentController.getStuInfo)
// 新增学生信息的路由
router.post(
  '/info',
  validateSchemaJoi('post', add_stu_schema),
  StudentController.addStuInfo
)
// 删除学生信息的路由
router.delete(
  '/info',
  validateSchemaJoi('delete', del_stu_schema),
  StudentController.delStuInfo
)
// 修改学生信息的路由
router.put(
  '/info',
  validateSchemaJoi('put', update_stu_schema),
  StudentController.updateStuInfo
)
// 查找学生信息的路由
router.get(
  '/info',
  validateSchemaJoi('get', find_stu_schema),
  StudentController.findStuInfo
)
// 获取作业信息的路由(分页)
router.get('/works', StudentController.getStuWork)
// 修改作业信息的路由
router.put(
  '/work',
  validateSchemaJoi('put', update_work_schema),
  StudentController.updateStuWork
)
// 查找作业信息的路由
router.get(
  '/work',
  validateSchemaJoi('get', find_work_schema),
  StudentController.findStuInfo
)

export default router
