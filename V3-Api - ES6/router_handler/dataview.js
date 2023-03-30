// 导入数据库操作模块
import db from '../db/index.js'

// 获取图表信息的处理函数
export async function getView(req, res) {
  try {
    // 定义sql语句,获取图表信息
    const sql = 'select name from dataview'
    const [rows] = await db.query(sql)
    const newRows = rows.map((item) => {
      return item.name
    })
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('获取legend信息失败！')
    try {
      // 定义sql语句,获取图表信息
      const sql = 'select name , type , stack , data from dataview'
      const [data] = await db.query(sql)
      const newData = data.map((item) => {
        item.data = item.data.split(',').map(Number)
        return item
      })
      // 执行 SQL 语句成功，但是查询的结果可能为空
      if (data.length === 0) return res.cc('获取series信息失败！')
      const result = {
        legend: newRows,
        xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: newData
      }
      res.send({
        status: 200,
        message: '获取图表信息成功',
        data: result
      })
    } catch (err) {
      return res.cc(err)
    }
  } catch (err) {
    return res.cc(err)
  }
}
// 获取地图信息的处理函数
export async function getTravel(req, res) {
  try {
    // 定义sql语句,获取地图信息
    const sql = 'select points_value, itemStyle_color from traveldata'
    const [rows] = await db.query(sql)
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (rows.length === 0) return res.cc('获取points信息失败！')
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
    try {
      // 定义sql语句,获取地图信息
      const sqlL =
        'select linesData_coords1, linesData_coords2 , lineStyle_color from traveldata'
      const [data] = await db.query(sqlL)
      // 执行 SQL 语句成功，但是查询的结果可能为空
      if (data.length === 0) return res.cc('获取linesData信息失败！')
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

      const result = { points: pointsRows, linesData: linesData }
      res.send({
        status: 200,
        message: '获取图表信息成功',
        data: result
      })
    } catch (err) {
      return res.cc(err)
    }
  } catch (err) {
    return res.cc(err)
  }
}
