import { createStore } from 'vuex'
import { App } from 'vue'
import { getStatus } from '@/request/api'

const store = createStore<State>({
  state() {
    return {
      menus: []
    }
  },
  getters: {
    getNewMenus(state) {
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
  mutations: {
    updateMenus(state, menus) {
      state.menus = menus
    }
  },
  actions: {
    getUserStatus({ commit }) {
      return new Promise((resolve, reject) => {
        // console.log('运行至此');
        getStatus().then((res) => {
          if (res.data.status === 200) {
            commit('updateMenus', res.data.data)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    }
  },
  modules: {}
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}

export default store
