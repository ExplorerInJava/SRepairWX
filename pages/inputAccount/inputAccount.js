const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExist:true,
    couldLogin:false
  },

  keyInput1(e) {
    var that = this;
    console.log(e)
    if (e.detail.cursor>=6) {
      that.setData({
        couldLogin: true,
        account:e.detail.value
      })
    }
  },

  onbluer(e) {
    var that = this
    console.log(e.detail.value)
    let account = e.detail.value

    wx.request({
      url: `${app.globalData.domain}/user/checkAccount`,
      data: {
        account: that.data.account
      },
      method: "get",
      success(res) {
        if (res.data.msg == "exist") {
          that.setData({
            isExist: true
          })
        } else {
          that.setData({
            isExist: false
          })
        }
      }
    })
  },

  formSubmit(){
    var that = this;
    if(!that.data.isExist) {
      return;
    }
    wx.request({
      url: `${app.globalData.domain}/user/checkAccount`,
      data: {
        account: that.data.account
      },
      method: "get",
      success(res) {
        console.log(res)
        if (res.data.msg == "exist") {
          that.setData({
            isExist: true
          })
          wx.setStorageSync("account", that.data.account)
          wx.navigateTo({
            url: '../findPassword/findpassword',
          })
        } else {
          that.setData({
            isExist: false
          })
        }
      }
    })
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

  }
})