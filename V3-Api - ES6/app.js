// 导入 express
import express from 'express'
import joi from 'joi'
// 导入 cors 中间件
import cors from 'cors'
import expressJWT from 'express-jwt'
import config from './config.js'

// 创建服务器的实例对象
const app = express()

// 配置 cors 中间件
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads/', express.static('uploads'))

// 代码优化，在路由前面封装res.cc函数
app.use((req, res, next) => {
  //status 的值默认为1 ，表示注册失败
  //err 的值可能是个错误对象也可能是个字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 一定要在路由之前配置解析 Token 的中间件
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] })
)

// 导入并使用用户路由模块
import userRouter from './router/user.js'
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
import userinfoRouter from './router/myinfo.js'
app.use('/my', userinfoRouter)
// 导入并使用用户权限的路由模块
import userstatusRouter from './router/userstatus.js'
app.use('/api', userstatusRouter)
// 导入并使用学生信息的路由模块
import studentsRouter from './router/students.js'
app.use('/api', studentsRouter)
// 导入并使用图表信息的路由模块
import dataviewRouter from './router/dataview.js'
app.use('/api', dataviewRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知的错误
  res.cc(err)
})

app.listen(3007, () => {
  console.log('server runing at http://127.0.0.1:3007')
})
