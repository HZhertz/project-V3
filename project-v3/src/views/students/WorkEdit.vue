<template>
  <div class="workEdit">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="学号" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="class_text" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="workstate_C" label="C++完成情况" align="center">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.workstate_C"
            class="workstate_C"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-value="1"
            :inactive-value="0"
            active-text="已完成"
            inactive-text="未完成"
            @change="debouncedChange(scope.row)"
        /></template>
      </el-table-column>
      <el-table-column
        prop="workstate_Java"
        label="Java完成情况"
        align="center"
      >
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.workstate_Java"
            class="workstate_Java"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-value="1"
            :inactive-value="0"
            active-text="已完成"
            inactive-text="未完成"
            @change="debouncedChange(scope.row)"
        /></template>
      </el-table-column>
      <el-table-column
        prop="workstate_Python"
        label="Python完成情况"
        align="center"
      >
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.workstate_Python"
            class="workstate_Python"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-value="1"
            :inactive-value="0"
            active-text="已完成"
            inactive-text="未完成"
            @change="debouncedChange(scope.row)"
        /></template>
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
import { getWorks, updateWorks } from '@/request/api'
import { ElMessage } from 'element-plus'

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
      })
      loading.value = false
    }
  })
}
getData(page.value, size.value)

// const changeWorks = (row: WorkRow) => {
//   console.log(row)
//   updateWorks(row).then((res) => {
//     if (res.data.status === 200) {
//       getData(page.value, size.value)
//       ElMessage({ type: 'success', message: res.data.message })
//     }
//   })
// }
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null
  return function (this: any) {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}
const debouncedChange: (row: StudentWork) => void = debounce(
  function (row: StudentWork) {
    updateWorks(row).then((res) => {
      if (res.data.status === 200) {
        getData(page.value, size.value)
        ElMessage({ type: 'success', message: res.data.message })
      }
    })
  }, // 在这里处理change事件
  400
) // 防抖时间为毫秒

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
.workEdit {
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
