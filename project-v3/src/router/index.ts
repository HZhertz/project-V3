import Cookies from 'js-cookie'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const routes: RouterT[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes //路由配置
})

const getRouteTree = () => {
  const menus = store.getters.getNewMenus
  // 循环菜单对象
  for (let key in menus) {
    const newRoute: RouterT = {
      path: menus[key].path,
      name: menus[key].name,
      iconClass: menus[key].icon,
      component: () => import('@/views/Home.vue'),
      redirect: menus[key].children[0].path,
      children: []
    }
    for (let i = 0; i < menus[key].children.length; i++) {
      const link: string = menus[key].children[i].link
      const component: string = menus[key].children[i].component
      newRoute.children?.push({
        path: menus[key].children[i].path,
        name: menus[key].children[i].name,
        iconClass: menus[key].children[i].icon,
        component: () =>
          import(
            /* @vite-ignore */ '../views/' + link + '/' + component + '.vue'
          )
      })
    }
    // 动态添加路由规则
    router.addRoute(newRoute)
  }
  // 动态添加首页
  router.addRoute({
    path: '/',
    name: '首页',
    component: () => import('@/views/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: '首页',
        component: () => import('@/views/index/Index.vue')
      }
    ]
  })
}

//路由前置导航守卫
router.beforeEach((to, from, next) => {
  // token存在 && vuex里的menus(权限列表)为空
  const token = Cookies.get('token')
  if (token && store.state.menus.length === 0) {
    // console.log('menus为空')
    store.dispatch('getUserStatus').then(() => {
      getRouteTree()
      next(to.path)
    })
  }
  // 限定条件第一次登录
  else if (
    token &&
    store.state.menus.length !== 0 &&
    from.path === '/login' &&
    to.path === '/home'
  ) {
    // 动态添加路由规则
    getRouteTree()
    next('/index')
  } else if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    next(from)
  } else {
    next()
  }
})
export const initRouter = (app: App<Element>) => {
  app.use(router)
}
