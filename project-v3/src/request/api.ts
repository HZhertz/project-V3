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
    url: '/api/register',
    data
  })
}
// 学生列表获取接口
export function getStu(): Promise<StudentsRes> {
  return request({
    method: 'get',
    url: '/api/student/infos'
  })
}
// 学生列表查询接口
export function findStu(name: string): Promise<StudentsRes> {
  return request({
    method: 'get',
    url: `/api/student/info?name=${name}`
  })
}
// 学生列表删除接口
export function delStu(id: number) {
  return request({
    method: 'delete',
    url: `/api/student/info?id=${id}`
  })
}

//信息列表新增和修改接口
export function info(type: string, data: any): Promise<StudentsRes> {
  data = qs.stringify(data)
  let obj = { method: type, url: '/api/student/info', data }
  return request(obj)
}

//信息列表新增接口
// export function addInfo(data: any) {
//   data = qs.stringify(data)
//   return request({
//     method: 'post',
//     url: '/api/student/info',
//     data
//   })
// }
//信息列表修改接口
// export function updateInfo(data: any) {
//   data = qs.stringify(data)
//   return request({
//     method: 'put',
//     url: '/api/student/info',
//     data
//   })
// }

//作业列表分页查询接口
export function getWorks(page: number, size: number) {
  return request({
    method: 'get',
    url: `/api/student/works?page=${page}&size=${size}`
  })
}
//作业列表修改接口
export function updateWorks(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/student/work',
    data
  })
}

//数据概览接口
export function dataView(): Promise<DataViewRes> {
  return request({
    method: 'get',
    url: '/api/view/stack'
  })
}
//旅游地图接口
export function travel() {
  return request({
    method: 'get',
    url: '/api/view/geo'
  })
}

//个人权限获取接口
export function getStatus() {
  return request({
    method: 'get',
    url: '/api/my/router'
  })
}
//个人信息获取接口
export function getMy() {
  return request({
    method: 'get',
    url: '/api/my/info'
  })
}
//个人信息修改接口
export function updateMy(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/api/my/info',
    data
  })
}
//个人密码修改接口
export function updateMypwd(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'post',
    url: '/api/my/pwd',
    data
  })
}

//用户信息获取接口
export function getUsers() {
  return request({
    method: 'get',
    url: '/api/users/infos'
  })
}
//用户信息删除接口
export function delUser(id: number) {
  return request({
    method: 'delete',
    url: `/api/users/info?id=${id}`
  })
}
//修改用户信息接口
export function updateUser(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/users/info',
    data
  })
}
//用户信息查找接口
export function findUser(username: string) {
  return request({
    method: 'get',
    url: `/api/users/info?username=${username}`
  })
}
//用户权限更新接口
export function updatePvg(data: any) {
  data = qs.stringify(data)
  return request({
    method: 'put',
    url: '/api/users/pvg',
    data
  })
}
