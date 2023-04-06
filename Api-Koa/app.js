// 导入koa
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Cors from 'koa2-cors'
import checkToken from './middleware/checkToken.js'
import Static from 'koa-static'
import path from 'path'
import { fileURLToPath } from 'url';

// 创建一个koa对象
const app = new Koa()
app.use(bodyParser())
// 配置 cors 中间件
app.use(Cors())
// 验证token的中间件函数
app.use(checkToken)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(Static(path.join(__dirname, './public')))

// 导入并使用登录注册路由模块
import userRouter from './router/userRouter.js'
app.use(userRouter.routes())
// 导入并使用个人路由模块
import myRouter from './router/myRouter.js'
app.use(myRouter.routes())
// 导入并使用学生路由模块
import studentRouter from './router/studentRouter.js'
app.use(studentRouter.routes())
// 导入并使用视图数据路由模块
import viewdataRouter from './router/viewdataRouter.js'
app.use(viewdataRouter.routes())
// 导入并使用用户路由模块
import usersRouter from './router/usersRouter.js'
app.use(usersRouter.routes())

// 定义错误级别的中间件
// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     // 验证失败导致的错误
//     if (err instanceof Joi.ValidationError) return ctx.body = err
//     // 身份认证失败后的错误
//     if (err.name === 'UnauthorizedError') return ctx.body = '身份认证失败！'
//     // 未知的错误
//     ctx.body = err
//   }
// })

//监听端口
app.listen(3007, () => {
  console.log('server runing at http://127.0.0.1:3007')
})
