import query from '../sql/query.js'

class MyModel {
  // 获取个人信息
  async getInfo(myid) {
    return await query(
      'SELECT id ,username ,nickname ,email ,user_pic ,ustatus ,privilege FROM users WHERE id = ?',
      [myid]
    )
  }
  // 获取个人权限
  async getPvg(myid) {
    return await query('SELECT privilege FROM users WHERE id = ?', [myid])
  }
  // 获取个人路由
  async getRouter(rid) {
    return await query('SELECT * FROM router WHERE id = ?', [rid])
  }
  // 获取个人密码
  async getPwd(myid) {
    return await query('SELECT password FROM users WHERE id = ?', [myid])
  }
  // 更新个人信息
  async updateInfo(myinfo, myid) {
    return await query('UPDATE users SET ? WHERE id = ?', [myinfo, myid])
  }
  // 更新个人密码
  async updatePwd(newpassword, myid) {
    return await query('UPDATE users SET password = ? WHERE id = ?', [
      newpassword,
      myid
    ])
  }
  // 更新个人头像
  async updateAvr(myavatar, myid) {
    return await query('UPDATE users SET user_pic=? WHERE id = ?', [
      myavatar,
      myid
    ])
  }
}
export default new MyModel()
