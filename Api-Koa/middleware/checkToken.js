import jwt from 'jsonwebtoken'
import { PUBLIC_KEY } from '../app/config.js'

async function check(ctx, next) {
  // 如果不是/api/my开头不需要验证token
  if (!ctx.path.startsWith('/api/my')) {
    await next()
  } else {
    //获取到token
    const token = ctx.header.authorization.replace('Bearer ', '')
    // console.log('token', token)
    if (token) {
      //  如果有token的话解析
      const tokenItem = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256']
      })
      // 解析后挂载到ctx.state.user上
      ctx.state.user = tokenItem
      // 把创建时间和过期时间析构出来
      const { time, timeout } = tokenItem
      // 拿到当前时间
      let NewTime = new Date().getTime()
      if (NewTime - time <= timeout) {
        // 说明没过期
        await next()
      } else {
        ctx.body = {
          status: 405,
          message: 'token 已过期，请重新登陆'
        }
      }
    } else {
      ctx.body = {
        status: 405,
        message: '请带上token'
      }
    }
  }
}
export default check
