import ViewData from '../model/viewdataModel.js'

class ViewDataController {
  // 获取折线图数据
  async getStackedLine(ctx) {
    const rows = await ViewData.getStack()
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '获取折线图数据失败！' }
    } else {
      const legendArr = rows.map((item) => {
        return item.name
      })
      const seriesArr = rows.map((item) => {
        item.data = item.data.split(',').map(Number)
        return item
      })
      ctx.body = {
        type: 'success',
        status: 200,
        message: '获取折线图数据成功！',
        data: {
          legend: legendArr,
          xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series: seriesArr
        }
      }
    }
  }
  // 获取散点图数据
  async getGeoScatter(ctx) {
    // 获取points数据
    const rows = await ViewData.getPoint()
    if (rows.length === 0) {
      ctx.body = { type: 'error', message: '获取points数据失败！' }
    } else {
      const newRows = rows.map((item) => {
        item.points_value = item.points_value.split(',').map(Number)
        return item
      })
      const pointsRows = newRows.map((item) => {
        return {
          value: item.points_value,
          itemStyle: {
            color: item.itemStyle_color
          }
        }
      })
      const pointCenter = {
        value: [119.4543, 25.9222]
      }
      pointsRows.push(pointCenter)
      // 获取linesData数据
      const data = await ViewData.getLine()
      if (data.length === 0) {
        ctx.body = { type: 'error', message: '获取linesData数据失败！' }
      } else {
        const newData = data.map((item) => {
          item.linesData_coords1 = item.linesData_coords1.split(',').map(Number)
          item.linesData_coords2 = item.linesData_coords2.split(',').map(Number)
          return item
        })
        const linesData = newData.map((item) => {
          return {
            coords: [item.linesData_coords1, item.linesData_coords2],
            lineStyle: {
              color: item.lineStyle_color
            }
          }
        })
        const linesCenter = {
          coords: [
            [119.4543, 25.9222],
            [112.2363, 31.1572]
          ]
        }
        linesData.push(linesCenter)

        ctx.body = {
          type: 'success',
          status: 200,
          message: '获取散点图数据成功！',
          data: { points: pointsRows, linesData: linesData }
        }
      }
    }
  }
}
export default new ViewDataController()
