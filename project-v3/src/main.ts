import { createApp } from 'vue'
import App from './App.vue'

//引入 pinia store
import { createPinia } from 'pinia'

//引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入router
// import router from './router'
import { initRouter } from './router'

import { initStore } from './store'

//引入font-awesome图标库
import 'font-awesome/css/font-awesome.min.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(router)
initRouter(app)
initStore(app)
app.mount('#app')