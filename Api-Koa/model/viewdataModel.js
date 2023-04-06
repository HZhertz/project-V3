import query from '../sql/query.js'

class ViewDataModel {
  // 获取折线图信息
  async getStack() {
    return await query('SELECT * FROM stacked_line')
  }
  // 获取散点图信息(点)
  async getPoint() {
    return await query('SELECT points_value, itemStyle_color FROM geo_scatter')
  }
  // 获取散点图信息(线)
  async getLine() {
    return await query(
      'SELECT linesData_coords1, linesData_coords2 , lineStyle_color FROM geo_scatter'
    )
  }
}
export default new ViewDataModel()
