import My from '../model/myModel.js'
// 导入处理密码的模块
import bcrypt from 'bcryptjs'

class MyController {
  // 获取个人信息
  async getMyInfo(ctx) {
    let myid = ctx.state.user.id
    const rows = await My.getInfo(myid)
    if (rows.length !== 1) {
      ctx.body = { type: 'error', message: '获取个人信息失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取个人信息成功！',
        data: rows[0]
      }
    }
  }
  // 获取个人权限
  async getMyRouter(ctx) {
    let myid = ctx.state.user.id
    const rows = await My.getPvg(myid)
    if (rows.length !== 1) {
      ctx.body = { type: 'error', message: '获取个人权限失败！' }
    } else {
      const pvgArr = rows[0].privilege.split(',').map(Number)
      const routerArr = []
      for (const item of pvgArr) {
        const data = await My.getRouter(item)
        if (data.length !== 1) {
          ctx.body = { type: 'error', message: '获取个人路由失败！' }
        }
        routerArr.push(data[0])
      }
      // console.log(routerArr)
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取个人权限成功！',
        data: routerArr
      }
    }
  }
  // 更新个人信息
  async updateMyInfo(ctx) {
    let myid = ctx.state.user.id
    let myinfo = ctx.request.body
    const rows = await My.updateInfo(myinfo, myid)
    console.log(rows)
    if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '更新个人信息失败！' }
    } else {
      const newInfo = await My.getInfo(myid)
      ctx.body = {
        type: 'success',
        status: 200,
        message: '更新个人信息成功！',
        data: newInfo[0]
      }
    }
  }
  // 更新个人密码
  async updateMyPwd(ctx) {
    let myid = ctx.state.user.id
    let myinfo = ctx.request.body
    const rows = await My.getPwd(myid)
    console.log(rows)
    if (rows.length !== 1) {
      ctx.body = { type: 'error', message: '用户不存在！' }
    } else {
      const compareResult = bcrypt.compareSync(myinfo.oldPwd, rows[0].password)
      if (!compareResult) {
        ctx.body = { type: 'error', message: '密码错误！' }
      } else if (myinfo.oldPwd === myinfo.newPwd) {
        ctx.body = { type: 'error', message: '新密码不能与旧密码相同！' }
      } else {
        const newPwd = bcrypt.hashSync(myinfo.newPwd, 10)
        const data = await My.updatePwd(newPwd, myid)
        if (data.affectedRows !== 1) {
          ctx.body = { type: 'error', message: '更新密码失败！' }
        } else {
          ctx.body = {
            type: 'success',
            status: 200,
            message: '更新密码成功！'
          }
        }
      }
    }
  }
  // 更新个人头像
  async updateMyAvr(ctx) {
    let myid = ctx.state.user.id
    let filename = ctx.req.file.filename
    const rows = await My.updateAvr(
      'http://127.0.0.1:3007/user_avatar/' + filename,
      myid
    )
    if (rows.affectedRows !== 1) {
      ctx.body = { type: 'error', message: '更新个人头像失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '更新个人头像成功！',
        srcurl: filename
      }
    }
  }
}
export default new MyController()
