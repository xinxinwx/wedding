// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let type=event.type
  return cloud.database().collection('photolist').where({ "type": type}).get({
    success(res) {
      return res
    },
    fail(err) {
      return err
    }
  })
}