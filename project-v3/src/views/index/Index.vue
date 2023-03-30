<template>
  <div class="index">
    <el-card> <el-calendar v-model="value" /> </el-card>
    <el-card>
      <div id="main"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
const value = ref(new Date())
onMounted(() => {
  let myChart = echarts.init(document.getElementById('main') as HTMLElement) //初始化实例
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  })
})
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 50%;
    #main {
      height: 500px;
    }
  }
}
</style>
