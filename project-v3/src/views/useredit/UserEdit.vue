<template>
  <div class="userEdit">
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column label="用户头像" align="center">
        <template v-slot="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.user_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" align="center">
      </el-table-column>
      <el-table-column prop="email" label="用户邮箱" align="center">
      </el-table-column>
      <el-table-column
        prop="privilege"
        label="权限"
        align="center"
        :width="200"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            type="info"
            size="small"
            icon="Edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 50]"
      background
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="修改用户信息" v-model="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="userFormRef">
        <el-form-item
          label="用户头像"
          :label-width="formLabelWidth"
          prop="user_pic"
        >
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3007/api/userspic"
            :data="form"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-avatar
              shape="square"
              :size="150"
              :src="userImg"
              class="avatar"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="用户ID" :label-width="formLabelWidth" prop="id"
          >{{ form.id }}
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { delUser, getUsers, updateUser } from '@/request/api'
import { emailRule, nameRule } from '@/utils/validate'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps } from 'element-plus'

const tdState = reactive<{
  tableData: UserInfo[]
}>({
  tableData: []
})
let { tableData } = toRefs(tdState)

const infoState = reactive({
  form: {
    user_pic: '',
    id: 0,
    username: '',
    nickname: '',
    email: ''
  }
})
let { form } = toRefs(infoState)
const rules = reactive({
  username: [
    {
      validator: nameRule,
      trigger: 'blur',
      required: true
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称'
    }
  ],
  email: [
    {
      validator: emailRule,
      trigger: 'blur',
      required: true
    }
  ]
})
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
//获取el-form组件对象
let userFormRef = ref()

let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数
let total = ref(0)

const userImg = ref()

const getData = () => {
  getUsers().then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
    }
  })
}

getData()

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(response)
  if (response.status === 200) {
    userImg.value = 'http://127.0.0.1:3007/uploads/' + response.srcurl
    form.value.user_pic = 'http://127.0.0.1:3007/uploads/' + response.srcurl
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

const del = (row: UserInfo) => {
  ElMessageBox.confirm('你确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: 'Cancel',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        delUser(row.id).then((res) => {
          if (res.data.status === 200) {
            getData()
            ElMessage({ message: res.data.message, type: 'success' })
          }
        })
        done()
      } else if (action === 'cancel') {
        done()
      }
    }
  })
}
const edit = (row: UsersInfo) => {
  form.value = { ...row }
  userImg.value = form.value.user_pic
  dialogFormVisible.value = true
}
const close = () => {
  userFormRef.value.resetFields()
  dialogFormVisible.value = false
}
const submit = () => {
  userFormRef.value.validate().then(() => {
    updateUser(form.value).then((res) => {
      if (res.data.status === 200) {
        getData()
        ElMessage({ type: 'success', message: res.data.message })
      }
    })
    dialogFormVisible.value = false
  })
}

let compData = computed(() => {
  return tableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>

<style lang="less" scoped>
.infoEdit {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 20px;
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
