interface LoginData {
  username: string
  password: string
}
interface LoginRes {
  data: {
    message: string
    status: number
    token: string
    username: string
  }
}
