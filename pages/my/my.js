import { request } from '../../utils/wx-promise-request';
const app = getApp()

Page({
  data: {
    all: 0,
    fixing: 0,
    fixed: 0,
    userInfo: {},
    hasUserInfo: false,
    isAdmin: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  loginOut(){
    wx.removeStorageSync("isAdmin")
    wx.removeStorageSync("account")
    wx.removeStorageSync("isLogin")
    wx.reLaunch({
      url: '../login/login',
    })
  },

  onShow: function() {
    var userInfo = wx.getStorageSync("userInfo");
    var that = this
    that.setData({
      isAdmin: wx.getStorageSync("isAdmin")
    })
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.cc = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true,
    // })
    let i = 0;
    var isAdmin = this.data.isAdmin
    new Promise(function() {
      if (isAdmin) {
        request({
          url: `${app.globalData.domain}/orders/count`,
          data: {
            isAdmin: true
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        }).then(res => {
          console.log(res)
          that.setData({
            all: res.data.all,
            fixing: res.data.fixing,
            fixed: res.data.fixed
          })
        })
      } else {
        console.log("account------------------" + wx.getStorageSync("account"))
        request({
          url: `${app.globalData.domain}/orders/count`,
          data: {
            isAdmin: false,
            account: wx.getStorageSync("account")
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {},
          fail: function (res) { },
          complete: function (res) { },
        }).then(res => {
          console.log("普通用户的返回的res:")
          console.log(res)
          that.setData({
            all: res.data.all,
            fixing: res.data.fixing,
            fixed: res.data.fixed
          })
        })
      }
    })
    // .then(numDH())


    // function numDH() {
    //   if (i < 20) {
    //     setTimeout(function() {
    //       that.setData({
    //         visitTotal: i,
    //         all: i,
    //         forksCount: i
    //       })
    //       i++
    //       numDH();
    //     }, 20) // 在此处定义数字的变幻间隔
    //   } else {
    //     that.setData({
    //       visitTotal: that.coutNum(that.data.all),
    //       all: that.coutNum(that.data.fixing),
    //       forksCount: that.coutNum(that.data.fixed)
    //     })
    //   }
    // }
    // wx.hideLoading()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://i.loli.net/2019/03/17/5c8deaf4aafcc.jpg'],
      current: 'https://i.loli.net/2019/03/17/5c8deaf4aafcc.jpg' // 当前显示图片的http链接      
    })
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  }

})