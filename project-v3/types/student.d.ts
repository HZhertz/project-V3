interface Student {
  id: number
  name: string
  age: number
  sex: number
  sex_text?: string
  class: number
  class_text?: string
  state: number
  state_text?: string
  address: string
  phone: string
  time: string
  father: string
  mather: string
  workstate_C: number
  workstate_Java: number
  workstate_Python: number
}
interface StudentsRes {
  data: {
    status: number
    message: string
    data: Student[]
    total: number
  }
}
interface InfoRow {
  id: number
  name: string
  sex: number
  age: number
  father: string
  mather: string
  address: string
  time: string
  phone: string
}
interface StudentWork {
  id: number
  name: string
  class: number
  class_text?: string
  workstate_C: number
  workstate_C_text?: string
  workstate_Java: number
  workstate_Java_text?: string
  workstate_Python: number
  workstate_Python_text?: string
}
interface WorkRow {
  id: number
  workstate_C: number
  workstate_Java: number
  workstate_Python: number
}
