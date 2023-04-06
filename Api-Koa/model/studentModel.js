import query from '../sql/query.js'

class StudentModel {
  // 获取学生信息
  async getInfo() {
    return await query('SELECT * FROM students')
  }
  // 新增学生信息
  async addInfo(stuinfo) {
    return await query('INSERT INTO students SET ?', [stuinfo])
  }
  // 删除学生信息
  async delInfo(stuid) {
    return await query('DELETE FROM students WHERE id = ?', [stuid])
  }
  // 修改学生信息
  async updateInfo(stuinfo, stuid) {
    return await query('UPDATE students SET ? WHERE id = ?', [stuinfo, stuid])
  }
  // 查找学生信息(name)
  async findInfo(stuname) {
    return await query('SELECT * FROM students WHERE name = ?', [stuname])
  }
  // 查找学生信息(ID)
  async findInfo_id(stuid) {
    return await query('SELECT * FROM students WHERE id = ?', [stuid])
  }
  // 获取学生作业信息(分页)
  async getWork(offset, size) {
    return await query(
      'SELECT id, name, class, workstate_C, workstate_Java, workstate_Python FROM students LIMIT ?, ?',
      [offset, size]
    )
  }
  // 获取学生作业总数
  async getTotal() {
    return await query('SELECT COUNT(*) as total FROM students')
  }
  // 修改学生作业信息
  async updateWork(workinfo, stuid) {
    return await query('UPDATE students SET ? WHERE id = ?', [workinfo, stuid])
  }
  // 查找学生作业信息(name)
  async findWork(stuname) {
    return await query(
      'SELECT id, name, class, workstate_C, workstate_Java, workstate_Python FROM students WHERE name = ?',
      [stuname]
    )
  }
  // 查找学生作业信息(ID)
  async findWork_id(stuid) {
    return await query(
      'SELECT id, name, class, workstate_C, workstate_Java, workstate_Python FROM students WHERE id = ?',
      [stuid]
    )
  }
}
export default new StudentModel()
