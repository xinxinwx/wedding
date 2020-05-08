// pages/pics/pics.js
const innerAudioContext = wx.createInnerAudioContext()
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: true,
    loadingState:0,
    banners:[],
    imagetypelist:[],
    music:null
   
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.getData()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    innerAudioContext.onPlay(() => {
      console.log('录音播放开始');
      that.setData({
        isPlayingMusic: true
      })
    })

    innerAudioContext.onStop(() => {
      console.log('录音播放停止');
      that.setData({
        isPlayingMusic: false
      })
    })

    innerAudioContext.onEnded(() => {
      console.log('录音播放结束');
      that.setData({
        isPlayingMusic: false
      })
    })

    innerAudioContext.onPause(() => {
      console.log('录音播放暂停');
      that.setData({
        isPlayingMusic: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (innerAudioContext.paused) {
      innerAudioContext.play();
    }
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
   //获取数据
   getData(){
    let that = this
    wx.cloud.callFunction({
      name: "banner",
      success(res) {
        console.log("要播放的音乐",res.result.data[0].music)
         that.setData({
           loadingState:1,
           banners: res.result.data[0].bannerlist,
           imagetypelist:res.result.data[0].list,
           music:res.result.data[0].music
        })

        //设置背景音乐
        innerAudioContext.autoplay = true
        innerAudioContext.loop = true
        if (res.result.data[0].music) {
          innerAudioContext.src = res.result.data[0].music
        }

      }, fail(err) {
        console.log(res)
      }
    })
  },

   //音乐播放控制
   play() {
    if (this.data.isPlayingMusic) {
       that.setData({
         isPlayingMusic: false
       })
      innerAudioContext.pause();
    } else {
      that.setData({
         isPlayingMusic: true
      })
      innerAudioContext.play();
    }
  },

  //点击查看更多
  listimageClick: function (e) {
    console.log(e.currentTarget.id)
    let imagetype = e.currentTarget.id
    wx.navigateTo({
      url: '../piclist/piclist?imagetype=' + imagetype,
    })
  },

  /**
 * banner的照片点击
 */
  bannerimageClick: function (e) {
    let imagetype = e.currentTarget.id

    wx.navigateTo({
      url: '../piclist/piclist?imagetype=' + imagetype,
    })
  },

 


 
})