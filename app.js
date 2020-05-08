//app.js
const back = wx.getBackgroundAudioManager();
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env:"xinxinjingjing-tg632"
    }),
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    back.title = "点击关闭音乐";
    // back.src = "https://sharefs.yun.kugou.com/202001151614/f66ce8ea0d2bcc7138e0aafff15f4ec2/G003/M06/1A/11/o4YBAFS_OIuAKsjgAEY7gunUbdg339.mp3";
  
    // back.play();

    back.onEnded=back.play()
  
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    back.pause();
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    userInfo: null
  }
})
