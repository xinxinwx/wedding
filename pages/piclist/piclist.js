// pages/piclist/piclist.js


var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagetype: '',
    loadingState: 0,
    pagerList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      imagetype: options.imagetype
    })
     this.getDatalist();
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
    return {
      title: "甜蜜婚礼",
      path: 'pages/index/index'
    }
  },
  //获取列表数据
  getDatalist(){
    wx.cloud.callFunction({
      name:"imglist",
      data:{
        type: that.data.imagetype 
      },
      success(res){
        that.setData({
          loadingState:1,
          pagerList: res.result.data[0].list
        })
      },fail(err){
        console.log("失败的数据", err)
      }
    })
  },
  /**
   * 查看大图
   */
  lookbigPic: function (e) {
    console.log("哈哈点击了程序")
    let position = e.currentTarget.id
    var list = that.data.pagerList
    let current = list[position].img

    var urls = []
    for (var i in list) {
      urls = urls.concat(list[i].img)
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
})