import multer from 'koa-multer'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
//配置storage
const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/user_avatar')) //路径一定要对
  },
  //修改文件名称
  filename: function (req, file, cb) {
    // console.log( req, file)
    cb(null, req.body.username + req.body.id + file.originalname)
  }
})
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 12 * 500 * 1024, //单位 b
  files: 1 //文件数量
}
//加载配置
const upload = multer({ storage: storage, limits })

export default upload
