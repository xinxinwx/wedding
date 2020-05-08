// pages/address/address.js
let that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 36,
    name:"",
    markers:[],
    he_tel:"",
    she_tel:"",
    addressname:"",
    loadingState:0


    // markers: [{
    //   iconPath: "/static/image/address.png",
    //   id: 0,
    //   // latitude: 36.74257678,
    //   // longitude: 114.82661247,
    //   callout: {
    //     content: "婚礼地址",
    //     color: '#FF0000',
    //     fontSize: 15,
    //     borderRadius: 10,
    //     display: 'ALWAYS',
    //   },
    //   width: 35,
    //   height: 45
    // }]
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.getData();
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
  getData(){
    wx.cloud.callFunction({
      name: "addres",
      success(res) {
        that.setData({
          loadingState:1,
          longitude: parseFloat(res.result.data[0].address.longitude),
          latitude: parseFloat(res.result.data[0].address.latitude),
          name: res.result.data[0].address.name,
          markers: [{
            iconPath: "/static/image/address.png",
            id: 0,
            latitude: parseFloat(res.result.data[0].address.latitude),
            longitude: parseFloat(res.result.data[0].address.longitude),
            callout: {
              content: res.result.data[0].content,
              color: '#FF0000',
              fontSize: 15,
              borderRadius: 10,
              display: 'ALWAYS',
            },
            width: 35,
            height: 45
          }],
          he_tel: res.result.data[0].address.he_tel,
          she_tel: res.result.data[0].address.she_tel,
          addressname: res.result.data[0].address.addresname
      
        })
      }, fail(err) {
      }
    })
  },
  callhe(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.he_tel
    })
  },
  callshe (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.she_tel
    })
  },
  markertap(){
   this.go();
  },
  goNavigation(){
   this.go();
  },

  /**
 * 导航前往
 */
  go() {
    wx.showModal({
      title: '导航',
      content: '立即导航前往吗？',
      confirmText: "立即前往",
      confirmColor: "#d4237a",
      success(res) {
        if (res.confirm) {
            wx.openLocation({
              latitude: that.data.latitude,
              longitude: that.data.longitude,
              scale: 18,
              name: '',
              address: that.data.addressname
            })
        } 
      }
    })
  },
})