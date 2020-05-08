// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let size = event.size
  let ye=event.ye
  return cloud.database().collection('friendMsgList').skip(ye).limit(size).orderBy('msgtime', 'desc').get({
    success(res) {
      return res
    },
    fail(err) {
      return err
    }
  })
}