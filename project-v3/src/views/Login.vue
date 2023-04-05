<template>
  <div class="login">
    <el-card class="box-card">
      <h1 class="title">学生后台管理系统</h1>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            size="large"
            v-model="ruleForm.username"
            type="text"
            placeholder="用户名：admin"
            autocomplete="off"
            prefix-icon="UserFilled"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="密码：123456"
            prefix-icon="Key"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%; height: 40px; font-size: 15px; margin-top: 10px"
            type="primary"
            @click="loginFn()"
            >登录</el-button
          >
          <el-button
            style="
              width: 100%;
              height: 40px;
              font-size: 15px;
              margin-top: 10px;
              margin-left: 0px;
            "
            type="info"
            @click="register()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { nameRule, passRule } from '@/utils/validate'
import { login, getStatus, regUser } from '@/request/api'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const state = reactive({
  ruleForm: {
    username: '',
    password: ''
  }
})
let { ruleForm } = toRefs(state)

const rules = reactive({
  username: [{ validator: nameRule, trigger: 'blur' }],
  password: [{ validator: passRule, trigger: 'blur' }]
})

//获取el-form组件对象
let ruleFormRef = ref()
// 获取项目路由对象
let router = useRouter()

let store = useStore()

const loginFn = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      console.log('校验通过', ruleForm.value)
      login(ruleForm.value).then((res) => {
        if (res.data.status === 200) {
          Cookies.set('username', res.data.username, { expires: 2 })
          Cookies.set('token', res.data.token, { expires: 2 })
          ElMessage({ message: res.data.message, type: 'success' })
          // 获取用户权限信息
          store.dispatch('getUserStatus').then((res) => {
            router.push('/home')
          })
        }
      })
    })
    .catch(() => {
      console.log('校验不通过')
    })
}

const register = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      regUser(ruleForm.value).then((res) => {
        if (res.data.status === 200) {
          ElMessage({ message: res.data.message, type: 'success' })
        }
      })
    })
    .catch(() => {})
}
</script>
<style lang="less">
.title {
  margin: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.box-card {
  width: 420px;
  height: 300px;
  padding: 0px 15px 40px 15px;
  position: absolute;
  opacity: 0.85;
  top: 25%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.login {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/bg.jpg') !important;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}
</style>
