const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    TabCur: 0
  },

  jump(e) {
    console.log("index:  " + e.target.dataset.idx)
    wx.setStorageSync("currentIndex", e.target.dataset.idx)
    wx.navigateTo({
      url: '../handle/handle',
    })
  },

  tabSelect(e) {
    wx.hideToast();
    console.log(e);
    var that = this;
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      orderList: []
    })
    console.log(wx.getStorageSync("isAdmin"))
    this.setData({
      isAdmin: wx.getStorageSync("isAdmin")
    })
    //如果是Admin的话：
    if (this.data.isAdmin) {
      wx.request({
        url: `${app.globalData.domain}/orders/loadOrders`,
        method: 'get',
        data: {
          start: 0,
          status1: that.data.TabCur,
        },
        success(res) {
          console.log(res);
          if (res.data.data == "null" || res.data.data == null) {
            wx.showToast({
              title: '暂无该类请求哦',
              icon: 'none'
            })
            setTimeout(function() {
              wx.hideToast()
            }, 1500)
            return
          }
          let x = 0
          while (x < res.data.data.length) {
            res.data.data[x].local_path = `${app.globalData.domain}` + res.data.data[x].local_path
            var imgaeList = res.data.data[x].images.split(",")
            res.data.data[x].images = imgaeList
            x += 1
          }
          wx.setStorageSync("orderList", res.data.data)
          if (that.data.orderList == []) {
            that.setData({
              orderList: res.data.data
            })
          } else {
            that.setData({
              orderList: that.data.orderList.concat(res.data.data)
            })
          }
          console.log(that.data.orderList)
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var that = this;
    this.setData({
      orderList:[]
    })
    new Promise(function() {
      console.log(wx.getStorageSync("isAdmin"))
      that.setData({
        isAdmin: wx.getStorageSync("isAdmin")
      })
      //如果是Admin的话：
      if (that.data.isAdmin) {
        app.postData(`${app.globalData.domain}/orders/loadOrders`, {
          start: 0,
          status1: that.data.TabCur
        }).then(res => {
          if (res.data.data == "null" || res.data.data == null) {
            wx.showToast({
              title: '暂无该类请求哦',
              icon: 'none'
            })
            setTimeout(function () {
              wx.hideToast()
            }, 1500)
            return
          }
          console.log(res);
          let x = 0
          while (x < res.data.data.length) {
            res.data.data[x].local_path = `${app.globalData.domain}` + res.data.data[x].local_path
            var imgaeList = res.data.data[x].images.split(",")
            res.data.data[x].images = imgaeList
            x += 1
          }
          wx.setStorageSync("orderList", res.data.data)
          if (that.data.orderList == []) {
            that.setData({
              orderList: res.data.data
            })
          } else {
            that.setData({
              orderList: that.data.orderList.concat(res.data.data)
            })
          }
          console.log(that.data.orderList)
        })
      }
    })
  },
  //上拉刷新继续查看新的order
  onReachBottom: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.isAdmin) {
      wx.request({
        url: `${app.globalData.domain}/orders/loadOrders`,
        method: 'get',
        data: {
          start: this.data.orderList.length,
          status1: this.data.TabCur,
        },
        success(res) {
          if (res.data.data == "null" || res.data.data == null) {
            wx.hideLoading();
            wx.showToast({
              title: '已经到底啦~',
            })
            return;
          }
          console.log(res.data.data);
          let x = 0
          while (x < res.data.data.length) {
            res.data.data[x].local_path = `${app.globalData.domain}` + res.data.data[x].local_path
            var imgaeList = res.data.data[x].images.split(",")
            res.data.data[x].images = imgaeList
            x += 1
          }
          wx.setStorageSync("orderList", res.data.data)
          if (that.data.orderList == []) {
            that.setData({
              orderList: res.data.data
            })
          } else {
            that.setData({
              orderList: that.data.orderList.concat(res.data.data)
            })
          }
          console.log(that.data.orderList)
        }
      })

      wx.hideLoading();
    }
  }

})