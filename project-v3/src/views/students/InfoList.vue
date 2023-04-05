<template>
  <div class="infoList">
    <Find
      find="student"
      :changeText="changeText"
      :getData="getData"
      @updateTableData="tableData = $event"
      @updateTotal="total = $event"
    ></Find>
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mather" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
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
  </div>
</template>

<script lang="ts" setup>
import { getStu } from '@/request/api'
import Find from '@/components/common/Find.vue'

const tdState = reactive<{
  tableData: Student[]
}>({
  tableData: []
})
let { tableData } = toRefs(tdState)

let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数
let total = ref(0)

const changeText: (tableDataRef: Student[]) => void = (
  tableDataRef: Student[]
) => {
  tableDataRef.forEach((item) => {
    item.sex === 1 ? (item.sex_text = '男') : (item.sex_text = '女')
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
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>

<style lang="less" scoped>
.infoList {
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
