// 导入数据库操作模块
import db from '../db/index.js'
import formidable from 'formidable'
import fs from 'fs'
// 获取用户信息的处理函数
export async function getUsersInfo(req, res) {
  try {
    // 定义sql语句查询用户信息
    const sql =
      'select id , username , nickname , email , user_pic , privilege from ev_users'
    const [rows] = await db.query(sql)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('获取用户信息失败！')
    res.send({
      status: 200,
      message: '获取用户信息成功',
      data: rows,
      total: rows.length
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 修改用户头像的处理函数
export async function updateUsersPic(req, res) {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.cc('修改失败')
      }
      if (fields.id === '100001') {
        return res.cc('管理员信息禁止修改！')
      }
      const fullFileName =
        fields.username + fields.id + files.file.originalFilename
      fs.writeFileSync(
        `uploads/${fullFileName}`,
        fs.readFileSync(files.file.filepath)
      )
      // 1. 定义更新头像的 SQL 语句
      const sql = `update ev_users set user_pic=? where id=?`
      // 2. 调用 db.query() 执行 SQL 语句
      const [rows] = await db.query(sql, [
        'http://127.0.0.1:3007/uploads/' + fullFileName,
        fields.id
      ])
      // 影响的行数是否等于 1
      if (rows.affectedRows !== 1) return res.cc('修改头像失败！')
      // 成功
      res.send({
        status: 200,
        message: '修改头像成功',
        srcurl: fullFileName
      })
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 修改用户信息的处理函数
export async function updateUsersInfo(req, res) {
  try {
    const userinfo = req.body
    if (userinfo.id === '100001') {
      return res.cc('管理员信息禁止修改！')
    } else {
      // 定义sql语句,根据用户id，修改用户信息
      const sql = `update ev_users set ? where id=?`
      const [rows] = await db.query(sql, [
        {
          username: userinfo.username,
          nickname: userinfo.nickname,
          email: userinfo.email,
          user_pic: userinfo.user_pic
        },
        userinfo.id
      ])
      // 执行sql语句成功，但是影响行数不为1
      if (rows.affectedRows !== 1) {
        return res.cc('修改用户信息失败！')
      }
      //修改用户信息成功
      res.send({
        status: 200,
        message: '修改用户信息成功'
      })
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 更新用户权限信息的处理函数
export async function updateUsersStatus(req, res) {
  try {
    const userinfo = req.body
    if (userinfo.id === '100001') {
      return res.cc('管理员权限禁止修改！')
    } else {
      // 定义sql语句,根据用户id，更新用户权限信息
      const sql = `update ev_users set privilege=? where id=?`
      const [rows] = await db.query(sql, [userinfo.privilege, userinfo.id])
      // 执行sql语句成功，但是影响行数不为1
      if (rows.affectedRows !== 1) {
        return res.cc('更新用户的权限失败！')
      }
      //更新用户的权限成功
      res.send({
        status: 200,
        message: '更新用户的权限成功'
      })
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 删除用户信息的处理函数
export async function deleteUsersInfo(req, res) {
  try {
    if (req.query.id === '100001') {
      return res.cc('管理员信息禁止删除！')
    } else {
      // 1. 定义删除用户信息的 SQL 语句
      const sql = `delete from ev_users where id=?`
      // 2. 调用 db.query() 执行 SQL 语句
      const [rows] = await db.query(sql, req.query.id)
      // 影响的行数是否等于 1
      if (rows.affectedRows !== 1) return res.cc('删除用户信息失败！')
      // 成功
      res.send({
        status: 200,
        message: '删除用户信息成功'
      })
    }
  } catch (err) {
    return res.cc(err)
  }
}
