// 导入定义验证规则的包
import Joi from 'joi'

// 定义验证规则
const id = Joi.number().integer().min(1927124101).required()
const name = Joi.string().required()
const age = Joi.number().integer().min(18).max(30).required()
const sex = Joi.number().valid(0, 1).required()
const address = Joi.string().max(20).required()
const time = Joi.date().iso().required()
const phone = Joi.string()
  .pattern(/^[\d-]+$/)
  .max(15)
const workstate = Joi.number().valid(0, 1).required()

// 验证规则对象 - 新增学生信息
export const add_stu_schema = Joi.object({
  name: name,
  age: age,
  sex: sex,
  father: name,
  mather: name,
  address: address,
  time: time,
  phone: phone
})

// 验证规则对象 - 删除学生信息
export const del_stu_schema = Joi.object({
  id: id
})

// 验证规则对象 - 修改学生信息
export const update_stu_schema = Joi.object({
  id: id,
  name: name,
  age: age,
  sex: sex,
  father: name,
  mather: name,
  address: address,
  time: time,
  phone: phone
})
// 验证规则对象 - 查找学生信息
export const find_stu_schema = Joi.object({
  name: name
})

// 验证规则对象 - 修改作业信息
export const update_work_schema = Joi.object({
  id: id,
  workstate_C: workstate,
  workstate_Java: workstate,
  workstate_Python: workstate
})
// 验证规则对象 - 查找作业信息
export const find_work_schema = Joi.object({
  name: name
})
