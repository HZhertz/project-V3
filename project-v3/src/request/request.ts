import axios from 'axios'
// import { getToken } from '@/utils/setToken'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api', //把前缀封装一下
  timeout: 15000 //请求超过这个时间就会中断
})

//添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    //请求前的操作(获取并设置token)
    let token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//添加响应拦截器
instance.interceptors.response.use(
  (result) => {
    //对相应的数据做些什么
    let { status, message } = result.data
    console.log(result.data)
    if (status !== 200) {
      ElMessage({ message: message || 'error', type: 'warning' })
    }
    return result
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
