import Users from '../model/usersModel.js'

class UsersController {
  // 获取用户信息
  async getUsersInfo(ctx) {
    const rows = await Users.getInfo()
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '获取用户信息失败！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取用户信息成功！',
        data: rows,
        total: rows.length
      }
    }
  }

  // 删除用户信息
  async delUserInfo(ctx) {
    let userInfo = ctx.request.query
    if (userInfo.id === '100001') {
      ctx.body = { type: 'error', message: '管理员信息禁止删除！' }
    } else {
      const rows = await Users.delInfo(userInfo.id)
      if (rows.affectedRows === 0) {
        ctx.body = { type: 'error', message: '没有用户信息！' }
      } else if (rows.affectedRows !== 1) {
        ctx.body = { type: 'error', message: '删除用户信息失败！' }
      } else {
        ctx.body = {
          type: 'success',
          status: 200,
          message: '删除用户信息成功！'
        }
      }
    }
  }
  // 修改用户信息(角色分配))
  async updateUserInfo(ctx) {
    let userInfo = ctx.request.body
    if (userInfo.id === '100001') {
      ctx.body = { type: 'error', message: '管理员信息禁止修改！' }
    } else {
      const routes = (await Users.getRouter(userInfo.ustatus))
        .map((item) => {
          return item.rid
        })
        .join()
      userInfo.privilege = routes
      const rows = await Users.updateInfo(userInfo, userInfo.id)
      if (rows.affectedRows !== 1) {
        ctx.body = { type: 'error', message: '修改用户信息失败！' }
      } else {
        const data = await Users.findInfo_id(userInfo.id)
        ctx.body = {
          type: 'success',
          status: 200,
          message: '修改用户信息成功！',
          data: data[0]
        }
      }
    }
  }
  // 修改用户信息(权限分配))
  async updateUserPvg(ctx) {
    let userInfo = ctx.request.body
    if (userInfo.id === '100001') {
      ctx.body = { type: 'error', message: '管理员权限禁止修改！' }
    } else {
      const rows = await Users.updateInfo(userInfo, userInfo.id)
      if (rows.affectedRows !== 1) {
        ctx.body = { type: 'error', message: '修改用户权限失败！' }
      } else {
        const data = await Users.findInfo_id(userInfo.id)
        ctx.body = {
          type: 'success',
          status: 200,
          message: '修改用户权限成功！',
          data: data[0].privilege
        }
      }
    }
  }
  // 查找用户信息
  async findUserInfo(ctx) {
    let userInfo = ctx.request.query
    const rows = await Users.findInfo(userInfo.username)
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '没有用户信息！' }
    } else {
      ctx.body = {
        type: 'success',
        status: 200,
        message: '查找用户信息成功！',
        data: rows,
        total: rows.length
      }
    }
  }
  // 修改用户头像
  async updateUpicInfo(ctx) {
    // console.log(ctx.req.body, ctx.req.file)
    let userid = ctx.req.body.id
    let filename = ctx.req.file.filename
    if (userid === '100001') {
      ctx.body = { type: 'error', message: '管理员信息禁止修改！' }
    } else {
      const rows = await Users.updateUpic(
        'http://127.0.0.1:3007/user_avatar/' + filename,
        userid
      )
      if (rows.affectedRows !== 1) {
        ctx.body = { type: 'error', message: '修改用户头像失败！' }
      } else {
        ctx.body = {
          type: 'success',
          status: 200,
          message: '修改用户头像成功！',
          srcurl: filename
        }
      }
    }
  }
}

export default new UsersController()
