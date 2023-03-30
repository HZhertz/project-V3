export const nameRule = (rule: unknown, value: string, callback: (obj?: Error) => void) => {
  // 请输入4-10位的昵称
  let reg = /(^[A-Za-z0-9]{4,10}$)/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入4-10位用户名'))
  } else {
    callback()
  }
}
export const passRule = (rule: unknown, value: string, callback: (obj?: Error) => void) => {
  let pass =
    /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!pass.test(value)) {
    callback(new Error('请输入6-12位密码包含大小写和数字和特殊符号'))
  } else {
    callback()
  }
}
export const emailRule = (rule: unknown, value: string, callback: (obj?: Error) => void) => {
  let email =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (!email.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}