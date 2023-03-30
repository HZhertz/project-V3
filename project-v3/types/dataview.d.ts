interface DataViewSeries {
  data: number[]
  name: string
  stack: string
  type: string
}
interface DataView {
  legend: string[]
  series: DataViewSeries[]
  xAxis: string[]
}
interface DataViewRes {
  data: {
    data: DataView
    status: number
  }
}