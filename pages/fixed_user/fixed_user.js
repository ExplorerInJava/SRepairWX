const app = getApp();
Page({

  data: {
    orderList: []
  },
  handleImagePreview(e) {

    const idx = e.target.dataset.idx
    const images = this.data.order.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this;
    wx.request({
      url: `${app.globalData.domain}/orders/user_loadOrders`,
      method: 'get',
      data: {
        start: 0,
        status1: 4,  ////////////////////////假数据   应该是三的
        account: wx.getStorageSync("account")
      },
      success(res) {
        console.log(res);
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
          var imgaeList = res.data.data[x].images.split(",")
          res.data.data[x].images = imgaeList
          x += 1
        }
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
  },

  //上拉刷新继续查看更多的order
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.domain}/orders/user_loadOrders`,
      method: 'get',
      data: {
        start: this.data.orderList.length,
        status1: 4,
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
})