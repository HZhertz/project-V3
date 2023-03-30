interface RouterT {
  path: string,
  name?: string,
  iconClass?: string,
  redirect?: string,
  hidden?: boolean,
  component: () => void,
  children?: RouterT[]
}