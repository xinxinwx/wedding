
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingState: 0,
    showTitle:"",
    imguri:"",
    music:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    this.getData()
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
    innerAudioContext.pause();
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
  getData(){
    let that=this
    wx.cloud.callFunction({
      name: "splash",
      success(res) {
          that.setData({
           loadingState:1,
           imguri:res.result.data[0].imguri,
           title: res.result.data[0].title
        })
        console.log("音乐", res.result.data[0].music)
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
        if (res.result.data[0].music) {
          innerAudioContext.src = res.result.data[0].music
        }
        innerAudioContext.play();
      }, fail(err) {
      }
    })
  },
  jumpIndexPage(){
    wx.switchTab({
      url: '../../pages/pics/pics',
    })
  }

  
})