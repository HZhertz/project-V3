<template>
  <div class="my">
    <div class="userAvatar">
      <div style="padding: 0 30px; border-right: 3px solid #51515199">
        <el-avatar shape="circle" :size="150" :src="form.user_pic" />
        <div style="margin: 10px; text-align: center">我的头像</div>
      </div>
      <div style="margin: 0 30px">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3007/api/my/avatar"
          :headers="headerObj"
          :data="form"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon"
            ><Picture /><i style="font-size: 14px">点击上传图片</i></el-icon
          >
        </el-upload>
        <div style="margin: 10px; text-align: center">修改头像</div>
      </div>
    </div>
    <el-divider />
    <div style="display: flex">
      <div class="info">
        <div style="height: 30px">我的信息</div>
        <el-form
          :model="form"
          :rules="rules"
          ref="myInfoRef"
          hide-required-asterisk
        >
          <el-form-item label="昵称:" prop="nickname">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" prop="username">{{
            form.username
          }}</el-form-item>
          <el-form-item label="用户ID:" prop="id">{{ form.id }}</el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="security">
        <div style="height: 30px">账户安全</div>
        <el-form>
          <el-form-item label="密码:"
            >********
            <el-button
              type="primary"
              style="margin: 0 40px"
              @click="changePwd()"
              >更改密码</el-button
            ></el-form-item
          >
        </el-form>
      </div>
    </div>
  </div>
  <el-dialog title="修改密码" v-model="dialogFormVisible" width="500px">
    <el-form :model="pwdForm" :rules="pwdRules" ref="pwdFormRef">
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="pwdForm.oldPwd"
          type="password"
          autocomplete="off"
          placeholder="请输入旧密码"
          prefix-icon="Key"
          show-password
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          v-model="pwdForm.newPwd"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
          prefix-icon="Key"
          show-password
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, UploadProps } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import { getMy, updateMy, updateMypwd } from '@/request/api'
import Cookies from 'js-cookie'
import { emailRule, passRule } from '@/utils/validate'

const infoState = reactive({
  form: {
    user_pic: '',
    nickname: '',
    username: '',
    id: 0,
    email: ''
  },
  headerObj: {
    Authorization: Cookies.get('token')
  },
  pwdForm: {
    oldPwd: '',
    newPwd: ''
  }
})
let { form, headerObj, pwdForm } = toRefs(infoState)
const dialogFormVisible = ref(false)

const rules = reactive({
  nickname: [{ required: true, message: '请输入昵称' }],
  email: [{ validator: emailRule, trigger: 'blur', required: true }]
})
const pwdRules = reactive({
  oldPwd: [{ validator: passRule, trigger: 'blur' }],
  newPwd: [{ validator: passRule, trigger: 'blur' }]
})

const getData = () => {
  getMy().then((res) => {
    if (res.data.status === 200) {
      const { user_pic, nickname, username, id, email } = res.data.data
      form.value = { user_pic, nickname, username, id, email }
    }
  })
}
getData()

let myInfoRef = ref()

const save = () => {
  myInfoRef.value.validate().then(() => {
    updateMy(form.value).then((res) => {
      if (res.data.status === 200) {
        getData()
        ElMessage({ type: 'success', message: res.data.message })
      }
    })
  })
}

let pwdFormRef = ref()
const changePwd = () => {
  dialogFormVisible.value = true
}
const close = () => {
  pwdFormRef.value.resetFields()
  dialogFormVisible.value = false
}
const submit = () => {
  pwdFormRef.value.validate().then(() => {
    updateMypwd(pwdForm.value).then((res) => {
      if (res.data.status === 200) {
        dialogFormVisible.value = false
        ElMessage({ type: 'success', message: res.data.message })
      }
    })
  })
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  if (response.status === 200) {
    location.reload()
    // console.log(response)
    ElMessage({ type: 'success', message: response.message })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isJPG = rawFile.type
  const isPNG = rawFile.type
  if (!(isJPG || isPNG)) {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>
<style lang="less" scoped>
.my {
  .userAvatar {
    display: flex;
  }
  .info {
    width: 400px;
    margin-right: 200px;
  }
  .avatar-uploader .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
