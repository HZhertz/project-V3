<template>
  <div>
    <!-- 查询重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-if="status === 'student'"
          v-model="formInline.name"
          placeholder="请输入姓名查询"
        ></el-input>
        <el-input
          v-else
          v-model="formInline.username"
          placeholder="请输入用户名查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { findStu, findUser } from '@/request/api'

const props = defineProps<{
  find: string
  changeText: Function
  getData: () => void
}>()

const formInline = reactive({
  name: '',
  username: ''
})
const status = ref(props.find)

const emit = defineEmits(['updateTableData', 'updateTotal'])
const updateTableData = (newValue: Student[] | UsersInfo[]) => {
  emit('updateTableData', newValue)
}
const updateTotal = (newValue: number) => {
  emit('updateTotal', newValue)
}
const find = () => {
  if (props.find === 'student') {
    findStu(formInline.name).then((res) => {
      if (res.data.status === 200) {
        updateTableData(res.data.data)
        updateTotal(res.data.total)
        props.changeText(res.data.data)
      }
    })
  } else if (props.find === 'user') {
    findUser(formInline.username).then((res) => {
      if (res.data.status === 200) {
        updateTableData(res.data.data)
        updateTotal(res.data.total)
        props.changeText(res.data.data)
      }
    })
  }
}
const reset = () => {
  if (props.find === 'student') {
    formInline.name = ''
    props.getData()
  } else if (props.find === 'user') {
    formInline.username = ''
    props.getData()
  }
}
</script>
<style lang="less" scoped></style>
