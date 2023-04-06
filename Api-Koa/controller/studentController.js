import Student from '../model/studentModel.js'

class StudentController {
  // 获取学生信息
  async getStuInfo(ctx) {
    const rows = await Student.getInfo()
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '获取个人信息失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取学生信息成功！',
        data: rows,
        total: rows.length
      }
    }
  }
  // 新增学生信息
  async addStuInfo(ctx) {
    let stuInfo = ctx.request.body
    const rows = await Student.addInfo(stuInfo)
    if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '新增学生信息失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '新增学生信息成功！'
      }
    }
  }
  // 删除学生信息
  async delStuInfo(ctx) {
    let stuInfo = ctx.request.query
    const rows = await Student.delInfo(stuInfo.id)
    if (rows.affectedRows === 0) {
      ctx.body = { type: 'error', message: '没有学生信息！' }
    } else if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '删除学生信息失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '删除学生信息成功！'
      }
    }
  }
  // 修改学生信息
  async updateStuInfo(ctx) {
    let stuInfo = ctx.request.body
    const rows = await Student.updateInfo(stuInfo, stuInfo.id)
    if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '修改学生信息失败！' }
    } else {
      const data = await Student.findInfo_id(stuInfo.id)
      ctx.body = {
        type: 'success',
        status: 200,
        message: '修改学生信息成功！',
        data: data[0]
      }
    }
  }
  // 查找学生信息
  async findStuInfo(ctx) {
    let stuInfo = ctx.request.query
    const rows = await Student.findInfo(stuInfo.name)
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '没有学生信息！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '查找学生信息成功！',
        data: rows,
        total: rows.length
      }
    }
  }
  // 获取作业信息(分页)
  async getStuWork(ctx) {
    const page = parseInt(ctx.request.query.page)
    const size = parseInt(ctx.request.query.size)
    const offset = (page - 1) * size
    const rows = await Student.getWork(offset, size)
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '获取作业信息失败！' }
    } else {
      const totalRows = await Student.getTotal()
      console.log(totalRows)
      const total = totalRows[0].total
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取作业信息成功！',
        data: rows,
        total: total
      }
    }
  }
  // 修改作业信息
  async updateStuWork(ctx) {
    let workInfo = ctx.request.body
    const rows = await Student.updateWork(workInfo, workInfo.id)
    if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '修改作业信息失败！' }
    } else {
      const data = await Student.findWork(workInfo.id)
      ctx.body = {
        type: 'success',
        status: 200,
        message: '修改作业信息成功！',
        data: data[0]
      }
    }
  }
  // 查找作业信息
  async findStuWork(ctx) {
    let workInfo = ctx.request.query
    const rows = await Student.findWork(workInfo.name)
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '没有作业信息！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '查找作业信息成功！',
        data: rows,
        total: rows.length
      }
    }
  }
}
export default new StudentController()
