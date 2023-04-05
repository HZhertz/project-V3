<template>
  <div class="studentEdit">
    <!-- 查询重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="请输入姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="compData" border style="width: 100%" row-key="id">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="id" label="学号" align="center"> </el-table-column>
      <el-table-column prop="class_text" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="danger" icon="Delete" @click="del(scope.row)" />
          <el-button type="info" icon="Rank" class="move" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 50]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { delStu, getStu, findStu } from '@/request/api'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'

const state = reactive<{
  tableData: Student[]
}>({
  tableData: []
})
let { tableData } = toRefs(state)

let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数
let total = ref(0) //总条数
const formInline = reactive({
  name: ''
})

const changeText = (tableDataRef: Student[]) => {
  tableDataRef.forEach((item) => {
    item.sex === 1 ? (item.sex_text = '男') : (item.sex_text = '女')
    item.class === 1
      ? (item.class_text = 'C++')
      : item.class === 2
      ? (item.class_text = 'Java')
      : (item.class_text = 'Python')
    item.state === 1
      ? (item.state_text = '已入学')
      : item.state === 0
      ? (item.state_text = '未入学')
      : (item.state_text = '休学中')
  })
}
const getData = () => {
  getStu().then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
      changeText(tableData.value)
    }
  })
}
getData()

let compData = computed(() => {
  return tableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  )
})

onMounted(() => {
  const table = document.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(table as HTMLElement, {
    handle: '.move',
    onEnd({ newIndex, oldIndex }) {
      const targetRow = tableData.value.splice(oldIndex as number, 1)[0]
      tableData.value.splice(newIndex as number, 0, targetRow)
      console.log(table, '000')
    }
  })
})

const find = () => {
  findStu(formInline.name).then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
      changeText(tableData.value)
    }
  })
}
const reset = () => {
  formInline.name = ''
  getData()
}
const del = (row: Student) => {
  delStu(row.id).then((res) => {
    if (res.data.status === 200) {
      ElMessage({ message: '删除数据成功', type: 'success' })
      getData()
    }
  })
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>

<style lang="less" scoped>
.studentEdit {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
