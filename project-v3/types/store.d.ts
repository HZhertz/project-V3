interface MenuObj {
  id: number
  parentId: number
  level: number
  path: string
  name: string
  title: string
  icon: string
  link: string
  children?: MenuObj[]
}
interface State {
  menus: MenuObj[]
}
interface NewMenus {
  [key: number]: MenuObj
}
