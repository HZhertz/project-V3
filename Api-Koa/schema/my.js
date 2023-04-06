// 导入定义验证规则的包
import Joi from 'joi'

// 定义验证规则
const id = Joi.number().integer().min(100001).required()
const username = Joi.string()
  .pattern(/(^[A-Za-z0-9]{4,10}$)/)
  .required()
const password = Joi.string()
  .pattern(
    /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  )
  .required()
const nickname = Joi.string().alphanum().max(15).required()
const email = Joi.string().email().required()
const user_pic = Joi.string().required()

// 验证规则对象 - 注册和登录
export const reg_login_schema = Joi.object({
  username: username,
  password: password
})

// 验证规则对象 - 更新个人信息
export const update_myinfo_schema = Joi.object({
  id: id,
  username: username,
  nickname: nickname,
  email: email,
  user_pic: user_pic
})

// 验证规则对象 - 更新密码
export const update_password_schema = Joi.object({
  oldPwd: password,
  newPwd: password
  // newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
})

// 验证规则对象 - 更新头像
