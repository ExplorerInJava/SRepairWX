const app = getApp();
Page({
  data: {
    cardCur: 0,
    orderList: [],
  },

  onShow() {
    this.setData({
      orderList: []
    })
    var that = this;
    wx.request({
      url: `${app.globalData.domain}/orders/user_loadOrders`,
      method: 'get',
      data: {
        start: 0,
        status1: 1,
        status2: 2,
        account: wx.getStorageSync("account")
      },
      success(res) {
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
        let x = 0
        while (x < res.data.data.length) {
          res.data.data[x].local_path = `${app.globalData.domain}` + res.data.data[x].local_path
          console.log(res.data.data[x].local_path + res.data.data[x].images[0]); ////////////////////////////
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

    // 初始化towerSwiper 传已有的数组名即可
  },


  showModal: function(e) {
    console.log(e.currentTarget.dataset.target);
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    var reject = e.currentTarget.dataset.target;
    if (reject != "reject") {
      wx.navigateTo({
        url: '../upload/upload',
      })
    }

  },

  //上拉刷新继续查看新的order
  onReachBottom: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: `${app.globalData.domain}/orders/user_loadOrders`,
      method: 'get',
      data: {
        start: this.data.orderList.length,
        status1: 1,
        status2: 2,
        account: wx.getStorageSync("account")
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
});