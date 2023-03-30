<template>
  <div class="header">
    <el-header>
      <div class="title_header">学生后台管理系统</div>
      <div class="bread"><Bread></Bread></div>
      <div class="name">
        <span class="nickname">{{ nickName }}</span
        ><span class="username">ID:{{ userID }}</span>
      </div>
      <div class="avatar">
        <el-avatar shape="square" :size="60" :src="userPic" />
      </div>
      <div class="setting">
        <el-button
          style="margin: 10px"
          color="#1c1641"
          circle
          size="large"
          @click="drawer = true"
          ><el-icon size="30px"><Setting /></el-icon>
        </el-button>
      </div>
    </el-header>
    <el-drawer v-model="drawer" title="设置">
      <el-button type="danger" @click="logout()">退出登录</el-button>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import Cookies from 'js-cookie'
import Bread from '@/components/common/Breadcrumb.vue'
import { Setting } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getMy } from '@/request/api'

const drawer = ref(false)

let nickName = ref('')
let userID = ref()
let userPic = ref('')

const getData = () => {
  getMy().then((res) => {
    if (res.data.status === 200) {
      nickName.value = res.data.data.nickname
      userID.value = res.data.data.id
      userPic = res.data.data.user_pic
    }
  })
}
getData()

let router = useRouter()
const logout = () => {
  ElMessageBox.confirm('你确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: 'Cancel',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        Cookies.remove('username')
        Cookies.remove('token')
        router.push('/home')
        done()
      } else if (action === 'cancel') {
        drawer.value = false
        done()
      }
    }
  })
}
</script>

<style lang="less" scoped>
.header {
  .el-header {
    padding: 0;
    background: #1c1641;
    color: #fff;
    display: flex;

    .title_header {
      margin: 0 20px;
      width: 160px;
      font-size: 20px;
      line-height: 60px;
    }
    .bread {
      flex: 1;
    }
    .name {
      .nickname {
        display: block;
        margin-top: 10px;
        padding: 0 10px;
        color: #fff;
        font-size: 18px;
        font-weight: 800;
      }
      .username {
        display: block;
        margin-top: 10px;
        padding: 0 10px;
        color: #ddd;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .avatar {
      margin-right: 20px;
    }
  }
}
</style>
