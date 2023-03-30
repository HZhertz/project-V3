// 导入数据库操作模块
import db from '../db/index.js'

// 获取学生信息的处理函数
export async function getStudents(req, res) {
  try {
    // 定义sql语句,获取学生信息
    const sql = 'select * from ev_students'
    const [rows] = await db.query(sql)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('获取用户信息失败！')
    res.send({
      status: 200,
      message: '获取学生信息成功',
      data: rows,
      total: rows.length
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 查找学生信息的处理函数
export async function findStudent(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.query
    // 定义sql语句
    const sql =
      'select * from ev_students where name=?'
    // 调用db.query（）执行sql语句并传递参数
    const [rows] = await db.query(sql, userinfo.name)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('没有学生信息')
    // 成功
    res.send({
      status: 200,
      message: '查找学生信息成功',
      data: rows,
      total: rows.length
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 删除学生信息的处理函数
export async function delStudent(req, res) {
  try {
    // 1. 定义删除学生信息的 SQL 语句
    const sql = `delete from ev_students where id=?`
    // 2. 调用 db.query() 执行 SQL 语句
    const [rows] = await db.query(sql, req.query.id)
    // 影响的行数是否等于 1
    if (rows.affectedRows !== 1) return res.cc('删除学生信息失败！')
    // 成功
    res.send({
      status: 200,
      message: '删除学生信息成功'
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 新增学生相关信息的处理函数
export async function addStuInfo(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 定义sql语句
    const sql = 'insert into ev_students set ?'
    // 调用db.query（）执行sql语句并传递参数
    const [rows] = await db.query(sql, {
      name: userinfo.name,
      age: userinfo.age,
      sex: userinfo.sex,
      father: userinfo.father,
      mather: userinfo.mather,
      address: userinfo.address,
      time: userinfo.time,
      phone: userinfo.phone
    })
    if (rows.affectedRows !== 1) return res.cc('新增学生相关信息失败！')
    // 成功
    res.send({
      status: 200,
      message: '新增学生相关信息成功',
      data: rows[0],
      total: rows.length
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 修改学生相关信息的处理函数
export async function updateStuInfo(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 定义sql语句
    const sql = 'update ev_students set ? where id=?'
    // 调用db.query（）执行sql语句并传递参数
    const [rows] = await db.query(sql, [
      {
        name: userinfo.name,
        age: userinfo.age,
        sex: userinfo.sex,
        father: userinfo.father,
        mather: userinfo.mather,
        address: userinfo.address,
        time: userinfo.time,
        phone: userinfo.phone
      },
      userinfo.id
    ])
    // 执行sql语句成功，但是影响行数不为1
    if (rows.affectedRows != 1) {
      return res.cc('更新学生相关信息失败！')
    }
    // 成功
    res.send({
      status: 200,
      message: '更新学生相关信息成功'
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 分页查询作业信息的处理函数
export async function getStuWorks(req, res) {
  try {
    const page = parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const offset = (page - 1) * size
    // 定义sql语句,获取作业信息
    const sql = `select id , name , class , workstate_C , workstate_Java , workstate_Python from ev_students limit ${offset}, ${size}`
    const [rows] = await db.query(sql)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('获取作业信息失败！')
    const [totalRows] = await db.query(
      'SELECT COUNT(*) as total FROM ev_students'
    )
    const total = totalRows[0].total
    res.send({
      status: 200,
      message: '获取作业信息成功',
      data: rows,
      total: total
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 修改作业信息的处理函数
export async function updateStuWorks(req, res) {
  try {
    // 获取客户端提交到服务器的作业信息
    const userinfo = req.body
    // 定义sql语句
    const sql = 'update ev_students set ? where id=?'
    // 调用db.query（）执行sql语句并传递参数
    const [rows] = await db.query(sql, [
      {
        workstate_C: userinfo.workstate_C,
        workstate_Java: userinfo.workstate_Java,
        workstate_Python: userinfo.workstate_Python
      },
      userinfo.id
    ])
    // 执行sql语句成功，但是影响行数不为1
    if (rows.affectedRows != 1) {
      return res.cc('修改作业信息失败！')
    }
    // 成功
    res.send({
      status: 200,
      message: '修改作业信息成功'
    })
  } catch (err) {
    return res.cc(err)
  }
}
