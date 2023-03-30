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
      <el-table-column label="权限更改" align="center">
        <template v-slot="scope">
          <el-button
            type="info"
            icon="Edit"
            @click="edit(scope.row)"
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

    <el-dialog title="权限修改" v-model="dialogFormVisible" width="300px">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        multiple
        collapse-tags
        collapse-tags-tooltip
        :render-after-expand="false"
        show-checkbox
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getUsers, updateState } from '@/request/api'
import { ElMessage } from 'element-plus'

const tdState = reactive<{
  tableData: UsersInfo[]
}>({
  tableData: []
})
let { tableData } = toRefs(tdState)

let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数
let total = ref(0)

const dialogFormVisible = ref(false)
const data = [
  {
    id: 1,

    label: '学生信息',
    children: [
      { id: 2, label: '学生列表' },
      { id: 3, label: '学生管理' },
      { id: 4, label: '信息列表' },
      { id: 5, label: '信息管理' },
      { id: 6, label: '作业列表' },
      { id: 7, label: '作业管理' }
    ]
  },
  {
    id: 8,

    label: '数据分析',
    children: [
      { id: 9, label: '数据概览' },
      { id: 10, label: '地图概览' },
      { id: 11, label: '旅游地图' }
    ]
  },
  {
    id: 12,

    label: '用户中心',
    children: [{ id: 13, label: '个人信息' }]
  },
  {
    id: 14,

    label: '用户权限管理',
    children: [
      { id: 15, label: '权限信息' },
      { id: 16, label: '用户信息' }
    ]
  }
]
const defaultProps = {
  id: 'id',
  label: 'label',
  children: 'children'
}

const tree = ref()
const getData = () => {
  getUsers().then((res) => {
    if (res.data.status === 200) {
      tableData.value = res.data.data
      total.value = res.data.total
      tableData.value.forEach((item) => {
        item.privilege_arr = item.privilege.split(',').map(Number)
      })
    }
  })
}

getData()

const edit = (row: UsersInfo) => {
  let filteredArr = row.privilege_arr.filter(
    (num) => ![1, 8, 12, 14].includes(num)
  )
  dialogFormVisible.value = true
  nextTick(() => {
    tree.value.setCheckedKeys(filteredArr)
    tree.value.userid = row.id
  })
}
const close = () => {
  dialogFormVisible.value = false
}
const submit = () => {
  let newState = tree.value.getCheckedKeys()
  const addMissingNumbers = (arr: number[]) => {
    if (arr.some((num) => num >= 2 && num <= 7) && !arr.includes(1)) {
      arr.push(1)
    }
    if (arr.some((num) => num >= 9 && num <= 11) && !arr.includes(8)) {
      arr.push(8)
    }
    if (arr.includes(13) && !arr.includes(12)) {
      arr.push(12)
    }
    if (arr.some((num) => num === 15 || num === 16) && !arr.includes(14)) {
      arr.push(14)
    }
    return arr.sort((a, b) => a - b)
  }
  const data = {
    id: tree.value.userid,
    privilege: addMissingNumbers(newState).join()
  }

  updateState(data).then((res) => {
    if (res.data.status === 200) {
      getData()
      dialogFormVisible.value = false
      ElMessage({ type: 'success', message: res.data.message })
    }
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
}
</style>
