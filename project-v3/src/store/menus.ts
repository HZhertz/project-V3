import { defineStore } from 'pinia'
import { Names } from './store-name'

import { getStatus } from '@/request/api'

export const useRouteStore = defineStore(Names.ROUTE, {
  state: () => {
    return {
      menus: []
    }
  },
  // computed 修饰一些值
  getters: {
    getNewMenus(state: any) {
      const newMenus: NewMenus = {}
      //获取旧的菜单
      const menus = state.menus
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].parentId === 0) {
          //一级菜单
          newMenus[menus[i].id] = {
            ...menus[i],
            children: newMenus[menus[i].id]?.children || []
          } // 浅拷贝
        } else {
          // 二级菜单
          let parentId = menus[i].parentId
          newMenus[parentId] = newMenus[parentId] || {}
          newMenus[parentId].children = newMenus[parentId].children || []
          newMenus[parentId].children?.push(menus[i]) // ? 链判断运算符,前面为空,后面不执行
        }
      }
      return newMenus
    }
  },
  // methods 同步/异步 提交state
  actions: {
    updateMenus(menus: MenuObj[]) {
      this.menus = menus
    },
    getUserStatus() {
      return new Promise((resolve, reject) => {
        // console.log('运行至此');
        getStatus().then((res) => {
          if (res.data.status === 200) {
            this.updateMenus(res.data.data)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    }
  }
})
