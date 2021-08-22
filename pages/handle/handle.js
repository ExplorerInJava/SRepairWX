const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicsList: [{
      icon: 'usefullfill',
      name: '待处理'
    }, {
      icon: 'radioboxfill',
      name: '处理中'
    }, {
      icon: 'repairfill',
      name: '维修中'
    }, {
      icon: 'roundcheckfill',
      name: '完成'
    }, ],
    basics: 0,
    order: {
      img_url: "",
      nickName: "",
      start_time: "2019-3-9 12:45 45",
      acount: "",
      address: "海淀区天南路菲利普斯大学北校区",
      detailAddress: "九号楼305",
      detail: "教室内的第一排桌子破损",
      images: ["https://image.weilanwl.com/img/4x3-1.jpg"]
    }
  },

  basicsSteps() {
    this.setData({
      basics: parseInt(this.data.basics) + 1
    })
    console.log(this.data.basics)
  },

  basicsBack() {
    this.setData({
      basics: this.data.basics - 1
    })
  },

  backHome(){
    wx.navigateBack();
  },

  connectFix() {
    wx.makePhoneCall({
      phoneNumber: '13253531214' // 仅为示例，并非真实的电话号码
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

  onLoad: function() {
    console.log(wx.getStorageSync("orderList"))
    console.log(wx.getStorageSync("currentIndex"))
    this.setData({
      order: wx.getStorageSync("orderList")[wx.getStorageSync("currentIndex")]
    })
    this.setData({
      basics: this.data.order.status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    console.log(wx.getStorageSync("orderList"))
    console.log(wx.getStorageSync("currentIndex"))
    this.setData({
      order:wx.getStorageSync("orderList")[wx.getStorageSync("currentIndex")]
    })
    this.setData({
      basics: this.data.order.status
    })
  },

  //保存订单请求状态
  save(){
    wx.request({
      url: `${app.globalData.domain}/orders/saveStatus`,
      data: {
        orderId: wx.getStorageSync("orderList")[wx.getStorageSync("currentIndex")].orderId,
        status: this.data.basics
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data.msg)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    this.backHome();
  },

  //订单完结
  over(){
    wx.request({
      url: `${app.globalData.domain}/orders/saveStatus`,
      data: {
        orderId: wx.getStorageSync("orderList")[wx.getStorageSync("currentIndex")].orderId,
        status: 4
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data.msg)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.backHome();
  },

  /**
   * 选择的图片预览
   * @param {string} `current` 预览的图片的本地临时地址
   */
  handleImagePreview(e) {
    var that = this;
    const idx = e.target.dataset.idx
    const images = this.data.order.images
    for(let i=0; i<images.length; i++) {
      images[i] = that.data.order.local_path + images[i]
    }
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

})