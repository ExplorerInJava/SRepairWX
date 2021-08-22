const app = getApp();
Page({
  data: {

  },

  onLoad(){
    let userInfo = wx.getStorageSync("userInfo")
    let isLogin = wx.getStorageSync("isLogin")
    if (userInfo != null && userInfo != "null" && userInfo != "") {
      if(isLogin != "true" || isLogin != true) {
        wx.navigateTo({
          url: '../login/login',
        })
      }
      wx.navigateTo({
        url: '../index/index',
      })
    }
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync("userInfo", e.detail.userInfo)
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
});