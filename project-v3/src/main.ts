import { createApp } from 'vue'
import App from './App.vue'
//引入 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入router
// import router from './router'
import { initRouter } from './router'
//引入font-awesome图标库
import 'font-awesome/css/font-awesome.min.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './store/store'

const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
// app.use(router)
initRouter(app)
app.mount('#app')
