<template>
  <div class="studentList">
    <el-table :data="compData" border style="width: 100%">
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
import { getStu } from '@/request/api'
const state = reactive<{
  tableData: Student[]
}>({
  tableData: []
})
let { tableData } = toRefs(state)

let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数
let total = ref(0) //总条数

const getData = () => {
  getStu().then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
      tableData.value.forEach((item) => {
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
  })
}
getData()

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
.studentList {
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
