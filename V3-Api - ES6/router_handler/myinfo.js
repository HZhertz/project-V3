// 导入数据库操作模块
import db from '../db/index.js'
// 导入处理密码的模块
import bcrypt from 'bcryptjs'
import formidable from 'formidable'
import fs from 'fs'

// 获取个人信息的处理函数
export async function getUserInfo(req, res) {
  try {
    // 定义sql语句,根据用户id，查询用户基本信息
    const sql =
      'select id , username , nickname , email , user_pic from ev_users where id=?'
    const [rows] = await db.query(sql, req.user.id)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length !== 1) return res.cc('获取个人信息失败！')
    res.send({
      status: 200,
      message: '获取个人信息成功',
      data: rows[0]
    })
  } catch (err) {
    return res.cc(err)
  }
}
// 获取个人权限信息的处理函数
export async function getUserStatus(req, res) {
  try {
    // 定义sql语句,根据用户id，查询用户权限信息
    const sql = 'select privilege from ev_users where id=?'
    const [rows] = await db.query(sql, req.user.id)
    // console.log(rows)
    if (rows.length !== 1) return res.cc('获取个人权限失败！')
    //用户权限获取成功
    try {
      const arr = rows[0].privilege.split(',').map(Number)
      const resArr = []
      const sqlR = 'select * from router where id=?'
      for (let i = 0; i < arr.length; i++) {
        const [data] = await db.query(sqlR, arr[i])
        if (data.length !== 1) return res.cc('获取个人路由失败！')
        resArr.push(data[0])
      }
      res.send({
        status: 200,
        message: '获取个人权限成功',
        data: resArr
      })
    } catch (err) {
      return res.cc(err)
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 更新个人基本信息的处理函数
export async function updateUserInfo(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 定义sql语句
    const sql = 'update ev_users set ? where id=?'
    // 调用db.query（）执行sql语句并传递参数
    const [rows] = await db.query(sql, [userinfo, req.user.id])
    // 执行sql语句成功，但是影响行数不为1
    if (rows.affectedRows != 1) {
      return res.cc('更新个人基本信息失败！')
    }
    // 成功
    res.cc('更新个人信息成功！', 200)
  } catch (err) {
    return res.cc(err)
  }
}
// 更新个人密码的处理函数
export async function updatePassword(req, res) {
  try {
    // 根据 id 查询用户的信息
    const sqlS = `select * from ev_users where id=?`
    // 执行根据 id 查询用户的信息的 SQL 语句
    const [rows] = await db.query(sqlS, req.user.id)
    // 判断结果是否存在
    if (rows.length !== 1) return res.cc('用户不存在！')
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, rows[0].password)
    if (!compareResult) return res.cc('旧密码错误！')
    try {
      // 定义更新密码的 SQL 语句
      const sql = `update ev_users set password=? where id=?`
      // 对新密码进行加密处理
      const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
      // 调用 db.query() 执行 SQL 语句
      const [data] = await db.query(sql, [newPwd, req.user.id])
      // 判断影响的行数
      if (data.affectedRows !== 1) return res.cc('更新密码失败！')
      // 成功
      res.cc('更新密码成功', 200)
    } catch (err) {
      return res.cc(err)
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 更新个人头像的处理函数
export async function updateAvatar(req, res) {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.cc('上传失败')
      }
      const fullFileName = fields.username + fields.id + files.file.originalFilename
      fs.writeFileSync(
        `uploads/${fullFileName}`,
        fs.readFileSync(files.file.filepath)
      )
      // 1. 定义更新头像的 SQL 语句
      const sql = `update ev_users set user_pic=? where id=?`
      // 2. 调用 db.query() 执行 SQL 语句
      const [rows] = await db.query(sql, [
        'http://127.0.0.1:3007/uploads/' + fullFileName,
        req.user.id
      ])
      // 影响的行数是否等于 1
      if (rows.affectedRows !== 1) return res.cc('更换头像失败！')
      // 成功
      res.send({
        status: 200,
        message: '更换头像成功',
        srcurl: fullFileName
      })
    })
  } catch (err) {
    return res.cc(err)
  }
}
