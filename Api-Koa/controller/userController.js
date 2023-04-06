import User from '../model/userModel.js'
// 导入bcryptjs
import bcrypt from 'bcryptjs'
// 导入生成 Token 的包
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../app/config.js'

class UserController {
  // 用户注册
  async register(ctx) {
    let userinfo = ctx.request.body
    const usernames = await User.getUser(userinfo.username) //用户名是否重复
    if (usernames.length > 0) {
      ctx.body = { type: 'error', message: '用户名被占用，请更换其他用户名！' }
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(userinfo.password, salt) //密文
      userinfo.password = hash
      await User.addUser(userinfo)
      ctx.body = { type: 'success', status: 200, message: '注册成功,请登录！' }
    }
  }
  // 登录
  async login(ctx) {
    let userInfo = ctx.request.body
    const rows = await User.getUser(userInfo.username)
    if (rows.length === 1) {
      const compareResult = bcrypt.compareSync(
        userInfo.password,
        rows[0].password
      )
      if (compareResult) {
        const payload = {
          id: rows[0].id,
          username: rows[0].username,
          time: new Date().getTime(),
          timeout: 1000 * 60 * 60 * 48
        }
        const token = jwt.sign(payload, PRIVATE_KEY, {
          algorithm: 'RS256' // 指定算法
        })
        ctx.body = {
          status: 200,
          message: '登录成功',
          token: `Bearer ${token}`,
          username: rows[0].username,
          type: 'success'
        }
      } else {
        ctx.body = { type: 'error', message: '用户名或密码不正确' }
      }
    } else {
      ctx.body = { type: 'error', message: '用户名不存在' }
    }
  }
}
export default new UserController()
