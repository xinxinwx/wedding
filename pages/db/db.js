// pages/db/db.js
const DB = wx.cloud.database().collection('counters')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  add(){
   DB.add({
     data:{
       name:"你猜",
       age:18
     },
      success(res){
        console.log("添加成功")
      },fail(res){
        console.log("添加失败")
      }
   })
  },
  getData(){
    DB.get({
      success(res){
        console.log("查询数据",res)
      }, fail(res) {
        console.log("查询数据失败")
      }

    })
  },
  delect(event){
  DB.doc(33).remove({
    success() {
      console.log("删除数据成功")
    }, fail(res) {
      console.log("删除数据失败")
    }
  })
  },
  updata(){
    DB.doc("74b140b45e1f075c0229ca48739487f9").update({
      data: {
        age: 15
      },
      success() {
        console.log("更新数据成功")
      }, fail(res) {
        console.log("更新数据失败")
      }
    })
  },
  qiuhe(){
    wx.cloud.callFunction({
      name:"banner",
      success(res){
        console.log(res)
        console.log(res.result.data)
      },fail(err){
        console.log(res)
      }
    })
  },
  test(){
    wx.cloud.callFunction({
      name: "friendMsgList",
      data:{
        size:10

      },
      success(res) {
        console.log("评论数据", res.result)

      }, fail(err) {
        console.log(res)
      }
    })
       
         
  }
})