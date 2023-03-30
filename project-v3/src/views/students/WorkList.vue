<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="学号" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="class_text" label="班级" align="center">
      </el-table-column>
      <el-table-column
        prop="workstate_C_text"
        label="C++完成情况"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="workstate_Java_text"
        label="Java完成情况"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="workstate_Python_text"
        label="Python完成情况"
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { getWorks } from '@/request/api'

const tdState = reactive<{
  tableData: StudentWork[]
}>({
  tableData: []
})
let { tableData } = toRefs(tdState)
const state = reactive({
  total: 0,
  page: 1,
  size: 10,
  loading: true
})
let { total, page, size, loading } = toRefs(state)

const getData = (page: number, size: number) => {
  getWorks(page, size).then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
      tableData.value.forEach((item) => {
        item.class === 1
          ? (item.class_text = 'C++')
          : item.class === 2
          ? (item.class_text = 'Java')
          : (item.class_text = 'Python')
        item.workstate_C === 1
          ? (item.workstate_C_text = '已完成')
          : (item.workstate_C_text = '未完成')
        item.workstate_Java === 1
          ? (item.workstate_Java_text = '已完成')
          : (item.workstate_Java_text = '未完成')
        item.workstate_Python === 1
          ? (item.workstate_Python_text = '已完成')
          : (item.workstate_Python_text = '未完成')
      })
      loading.value = false
    }
  })
}
getData(page.value, size.value)

const handleSizeChange = (val: number) => {
  size.value = val
  page.value = 1
  getData(page.value, val)
}
const handleCurrentChange = (val: number) => {
  page.value = val
  getData(val, size.value)
}
</script>

<style lang="less" scoped>
.workList {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
