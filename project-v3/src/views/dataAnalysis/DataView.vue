<template>
  <div class="data-view">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { dataView } from '@/request/api'

onMounted(() => {
  let myChart = echarts.init(document.getElementById('main1') as HTMLElement) //初始化实例
  myChart.setOption({
    title: {
      text: '班级'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['一班', '二班', '三班', '四班', '五班', '六班']
    },
    yAxis: { type: 'value' },
    //数据
    series: [
      {
        name: '人数',
        type: 'bar',
        data: [23, 65, 32, 43, 13, 55]
      }
    ]
  })
})

//第二个图表的绘制
dataView()
  .then((res) => {
    // console.log(res)
    if (res.data.status === 200) {
      //解构赋值
      let { legend, xAxis, series } = res.data.data
      draw(legend, xAxis, series)
    }
  })
  .catch((err) => {
    throw err
  })
function draw(legend: string[], xAxis: string[], series: {}[]) {
  let myChart1 = echarts.init(document.getElementById('main2') as HTMLElement) //初始化实例
  let option = {
    title: {
      text: '会话量'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: series
  }
  myChart1.setOption(option)
}
</script>
<style lang="less" scoped>
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 50%;
    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>
