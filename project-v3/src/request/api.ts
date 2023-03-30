import request from './request'
import qs from 'qs'

// 登录接口
// export const login = (data: LoginData): Promise<LoginRes> => {
//   let newData = qs.stringify(data)
//   request.post('/api/login', newData)
// }
export function login(data: LoginData | string): Promise<LoginRes> {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}
// 注册接口
export function regUser(data: LoginData | string): Promise<LoginRes> {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/api/reguser',
    data
  })
}
// 学生列表获取接口
export function getStu(): Promise<StudentsRes> {
  return request({
    method: 'get',
    url: '/api/students'
  })
}
// 学生列表查询接口
export function findStu(name: string): Promise<StudentsRes> {
  return request({
    method: 'get',
    url: `/api/student?name=${name}`
  })
}
// 学生列表删除接口
export function delStu(id: number) {
  return request({
    method: 'delete',
    url: `/api/student?id=${id}`
  })
}

//信息列表新增和修改接口
export function info(type: string, data: any): Promise<StudentsRes> {
  data = qs.stringify(data)
  let obj = { method: type, url: '/api/student', data }
  return request(obj)
}

//信息列表新增接口
// export function addInfo(data: any) {
//   data = qs.stringify(data)
//   return request({
//     method: 'post',
//     url: '/api/student',
//     data
//   })
// }
//信息列表修改接口
// export function updateInfo(data: any) {
//   data = qs.stringify(data)
//   return request({
//     method: 'put',
//     url: '/api/student',
//     data
//   })
// }

//作业列表分页查询接口
export function getWorks(page: number, size: number) {
  return request({
    method: 'get',
    url: `/api/works?page=${page}&size=${size}`
  })
}
//作业列表修改接口
export function updateWorks(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/works',
    data
  })
}

//数据概览接口
export function dataView(): Promise<DataViewRes> {
  return request({
    method: 'get',
    url: '/api/view'
  })
}
//旅游地图接口
export function travel() {
  return request({
    method: 'get',
    url: '/api/travel'
  })
}

//个人权限获取接口
export function getStatus() {
  return request({
    method: 'get',
    url: '/my/status'
  })
}
//个人信息获取接口
export function getMy() {
  return request({
    method: 'get',
    url: '/my/info'
  })
}
//个人信息修改接口
export function updateMy(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/my/info',
    data
  })
}
//个人密码修改接口
export function updateMypwd(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/my/pwd',
    data
  })
}

//用户信息获取接口
export function getUsers() {
  return request({
    method: 'get',
    url: '/api/usersinfo'
  })
}

//修改用户信息接口
export function updateUser(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/usersinfo',
    data
  })
}
//用户权限更新接口
export function updateState(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/userstatus',
    data
  })
}
//用户信息删除接口
export function delUser(id: number) {
  return request({
    method: 'delete',
    url: `/api/usersinfo?id=${id}`
  })
}
