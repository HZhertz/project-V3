// 导入数据库操作模块
import db from '../db/index.js'
// 导入bcryptjs
import bcrypt from 'bcryptjs'
// 导入生成 Token 的包
import jwt from 'jsonwebtoken'
// 导入全局的配置文件
import config from '../config.js'

// 注册新用户的处理函数
export async function regUser(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    //定义SQL语句查询用户名是否被占用
    const sql1 = 'select * from ev_users where username=?'
    const [rows] = await db.query(sql1, userinfo.username)
    //判断用户是否被占用
    if (rows.length > 0) {
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    try {
      //用户名可以使用
      userinfo.password = bcrypt.hashSync(userinfo.password, 10)
      // 定义插入新用户的sql语句
      const sql2 = 'insert into ev_users set ?'
      // 调用db.query()执行sql语句，插入新用户
      const [result] = await db.query(sql2, {
        username: userinfo.username,
        password: userinfo.password
      })

      if (result.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      //注册成功
      res.cc('注册成功,请登录！', 200)
    } catch (err) {
      return res.cc(err)
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 登录的处理函数
export async function login(req, res) {
  try {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 对表单数据进行验证看是否合法
    // 定义 SQL 语句
    const sql = `select * from ev_users where username=?`
    // 执行 SQL 语句，根据用户名查询用户的信息
    const [rows] = await db.query(sql, userinfo.username)
    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (rows.length !== 1) return res.cc('登录失败！')
    // TODO：判断密码是否正确
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      rows[0].password
    )
    if (!compareResult) return res.cc('登录失败,密码错误！')

    // TODO：在服务器端生成 Token 的字符串
    const user = { ...rows[0], password: '', user_pic: '' }
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey)
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      message: '登录成功',
      status: 200,
      token: 'Bearer ' + tokenStr,
      username: userinfo.username
    })
  } catch (err) {
    return res.cc(err)
  }
}
