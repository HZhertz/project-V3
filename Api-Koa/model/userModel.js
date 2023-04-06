import query from '../sql/query.js'

class UserModel {
  //获取用户/登录
  async getUser(username) {
    return await query('SELECT * FROM users WHERE username = ?', [username])
  }
  //新增用户/注册
  async addUser(userinfo) {
    return await query('INSERT INTO users SET ?', [userinfo])
  }
}
export default new UserModel()
