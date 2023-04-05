<template>
  <div class="infoEdit">
    <div style="display: flex">
      <Find
        find="student"
        :changeText="changeText"
        :getData="getData"
        @updateTableData="tableData = $event"
        @updateTotal="total = $event"
      ></Find>
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item>
          <el-button color="#626aef" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

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

    <el-dialog
      :title="state ? '添加学生信息' : '修改学生信息'"
      v-model="dialogFormVisible"
      width="500px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="diaFormRef">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" :label="1">男</el-radio>
          <el-radio v-model="form.sex" :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="父亲姓名"
          :label-width="formLabelWidth"
          prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="母亲姓名"
          :label-width="formLabelWidth"
          prop="mather"
        >
          <el-input v-model="form.mather" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期时间"
            format="YYYY 年 MM 月 DD 日"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
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
import { getStu, info, delStu } from '@/request/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import Find from '@/components/common/Find.vue'

const tdState = reactive<{
  tableData: Student[]
}>({
  tableData: []
})

let { tableData } = toRefs(tdState)
let currentPage = ref(1) //当前页数
let pageSize = ref(10) //每页显示条数

const infoState = reactive({
  form: {
    id: 0,
    name: '',
    sex: 1,
    age: 0,
    father: '',
    mather: '',
    address: '',
    time: '',
    phone: ''
  }
})
let { form } = toRefs(infoState)
const rules = reactive({
  name: [{ required: true, message: '请输入姓名' }],
  sex: [{ required: true }],
  age: [{ required: true, message: '请输入年龄' }],
  address: [{ required: true, message: '请输入地址' }],
  time: [{ required: true, message: '请输入入学时间' }],
  phone: [{ required: true, message: '请输入联系方式' }]
})
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
let state = ref(true)
let total = ref(0)

//获取el-form组件对象
let diaFormRef = ref()

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

const add = () => {
  form.value = {
    id: 0,
    name: '',
    sex: 1,
    age: 0,
    father: '',
    mather: '',
    address: '',
    time: '',
    phone: ''
  }
  state.value = true
  dialogFormVisible.value = true
}
const del = (row: InfoRow) => {
  ElMessageBox.confirm('你确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: 'Cancel',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        delStu(row.id).then((res) => {
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
const edit = (row: InfoRow) => {
  const newRow = (({
    id,
    name,
    sex,
    age,
    father,
    mather,
    address,
    time,
    phone
  }) => ({ id, name, sex, age, father, mather, address, time, phone }))(row)
  form.value = { ...newRow }
  state.value = false
  dialogFormVisible.value = true
}

const close = () => {
  diaFormRef.value?.resetFields()
  dialogFormVisible.value = false
}
const submit = () => {
  diaFormRef.value
    .validate()
    .then(() => {
      if (state.value) {
        info('post', form.value).then((res) => {
          if (res.data.status === 200) {
            getData()
            dialogFormVisible.value = false
            ElMessage({ type: 'success', message: res.data.message })
          }
        })
      } else {
        info('put', form.value).then((res) => {
          if (res.data.status === 200) {
            getData()
            dialogFormVisible.value = false
            ElMessage({ type: 'success', message: res.data.message })
          }
        })
      }
    })
    .catch(() => {
      console.log('校验不通过')
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
