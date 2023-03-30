<template>
  <div class="travel-map">
    <div id="main"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import geoJson from '@/assets/data.json'
import { travel } from '@/request/api'

travel().then((res) => {
  console.log(res)
  if (res.data.status === 200) {
    let { points, linesData } = res.data.data
    draw(points, linesData)
  }
})

function draw(points: {}[], linesData: {}[]) {
  let myChart = echarts.init(document.getElementById('main') as HTMLElement)
  echarts.registerMap('china', geoJson as any) //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用

  let option = {
    backgroundColor: 'rgb(121,145,209)',
    geo: {
      map: 'china',
      aspectScale: 0.75, //scale地图长宽比
      zoom: 1.1, //缩放比
      itemStyle: {
        areaColor: {
          //径向渐变
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: '#09132c' // 0%处的颜色
            },
            {
              offset: 1,
              color: '#274d68' // 100%处的颜色
            }
          ],
          globalCoord: true
        },
        shadowColor: 'rgb(58,115,192)',
        // 偏移值
        shadowOffsetX: 10,
        shadowOffsetY: 11
      },
      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            opacity: 0
          }
        }
      ]
    },
    series: [
      {
        //配置地图相关参数，绘制地图，这个对象是关于地图图表的相关设置
        type: 'map',
        label: {
          show: true,
          color: '#1DE9B6'
        },
        zoom: 1.1,
        map: 'china',
        itemStyle: {
          backgroundColor: 'rgb(147,235 ,248)',
          borderWidth: 1,
          areaColor: {
            //径向渐变
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(31,54,150)' // 0%处的颜色
              },
              {
                offset: 1,
                color: 'rgb(89,128,142)' // 100%处的颜色
              }
            ],
            globalCoord: true
          }
        },
        //设置高亮
        emphasis: {
          areaColor: 'rgb(46,229,206)',
          borderWidth: 0.1,
          textStyle: {
            color: 'rgb(183,185,14)'
          }
        }
      },
      // 关于散点图的配置
      {
        type: 'effectScatter',
        // 坐标系
        coordinateSystem: 'geo',
        // 配置何时展示特效
        showEffectOn: 'render',
        // 散点的大小
        symbolSize: 10,
        zlevel: 1,
        data: points,
        rippleEffect: {
          // 涟漪特效相关配置
          period: 15,
          scale: 4,
          brushType: 'fill'
        }
      },
      // 关于地图线路动画效果设置
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4,
          symbol: 'arrow',
          symbolSize: 7,
          //拖尾效果
          trailLength: 0.4
        },
        // 线的样式
        lineStyle: {
          color: '#1DE9B6',
          width: 1,
          opacity: 0.1,
          // 弯曲程度
          curveness: 0.3
        },
        data: linesData
      }
    ]
  }
  myChart.setOption(option)
}
</script>

<style lang="less" scoped>
.travel-map {
  width: 100%;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>
