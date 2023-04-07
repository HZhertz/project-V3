import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: 'types/auto-import.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '#': path.join(__dirname, 'types')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3007/api/', //实际请求地址
        changeOrigin: true, //开启代理跨域
        rewrite: (path) => path.replace(/^\/api/, '') //重写路径
      }
    }
  }
})
