import query from '../sql/query.js'

class UsersModel {
  // 获取用户信息
  async getInfo() {
    return await query('SELECT * FROM users')
  }
  // 删除用户信息
  async delInfo(userid) {
    return await query('DELETE FROM users WHERE id = ?', [userid])
  }
  // 修改用户头像
  async updateUpic(userpic, userid) {
    return await query('UPDATE users SET user_pic=? WHERE id = ?', [
      userpic,
      userid
    ])
  }
  // 修改用户信息
  async updateInfo(userinfo, userid) {
    return await query('UPDATE users SET ? WHERE id = ?', [userinfo, userid])
  }
  // 获取用户路由
  async getRouter(userstatus) {
    return await query('SELECT rid FROM user_router WHERE ustatus = ?', [
      userstatus
    ])
  }
  // 查找用户信息(name)
  async findInfo(username) {
    return await query('SELECT * FROM users WHERE username = ?', [username])
  }
  // 查找用户信息(ID)
  async findInfo_id(userid) {
    return await query('SELECT * FROM users WHERE id = ?', [userid])
  }
}
export default new UsersModel()
