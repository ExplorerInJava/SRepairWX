const app = getApp();
Page({
  data: {
    isAdmin: "false",
    cardCur: 0,
    toggleDelay: false,

    orderList: [],

    list: [{
      name: 'scale-up',
      color: 'olive'
    }],
    list2: [{
      name: 'scale-up',
      color: 'orange'
    }],
    tower: [{
      id: 0,
      url: 'http://upload.ouliu.net/i/201905082051360l78o.jpeg'
    }, {
      id: 1,
        url: 'http://upload.ouliu.net/i/20190508205351r4z3l.jpeg'
    }, {
      id: 2,
        url: 'http://upload.ouliu.net/i/20190508205430sgart.jpeg'
    }, {
      id: 3,
        url: 'http://upload.ouliu.net/i/20190508205428tfp7h.jpeg'
    }],

    order_list: [{
        img_url: "",
        nickName: "",
        time: "2019-3-9 12:45 45",
        acount: "",
        address: "金水区文化路郑州大学北校区",
        detailAddress: ""
      },
      {
        img_url: "",
        nickName: "",
        time: "2019-3-9 12:45 45",
        acount: "",
        address: "金水区文化路郑州大学北校区",
        detailAddress: ""
      }
    ]
  },

  jump(e) {
    console.log("index:  " + e.target.dataset.idx)
    wx.setStorageSync("currentIndex", e.target.dataset.idx)
    wx.navigateTo({
      url: '../handle/handle',
    })
  },

  onShow() {
    //显示处理项
    wx.removeStorageSync("orderList")
    this.setData({
      orderList:[]
    })
    this.toggleDelay();
    var that = this;
    console.log(wx.getStorageSync("isAdmin"))
    this.setData({
      isAdmin: wx.getStorageSync("isAdmin")
    })
    this.towerSwiper('tower');
    //如果是Admin的话：
    if (this.data.isAdmin) {
      app.postData(`${app.globalData.domain}/orders/loadOrders`, {start: 0,status1: 0}).then(res => {
        console.log(res)
        if (res.data.data == "null" || res.data.data == null) {
          wx.hideLoading();
          wx.showToast({
            title: '尚无未处理请求~',
            duration: 1500,
            icon: "none"
          })
          return;
        }
        console.log(res.data.data);
        let x = 0
        while (x < res.data.data.length) {
          res.data.data[x].local_path = `${app.globalData.domain}` + res.data.data[x].local_path
          console.log(res.data.data[x].local_path + res.data.data[x].images[0]); ////////////////////////////
          var imgaeList = res.data.data[x].images.split(",")
          res.data.data[x].images = imgaeList
          x += 1
        }
        wx.setStorageSync("orderList", res.data.data)
        that.setData({
          orderList: res.data.data
        })
        console.log(that.data.orderList)
      })
    }
    // 初始化towerSwiper 传已有的数组名即可
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      towerList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.towerList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    }
  },

  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function() {
      that.setData({
        animation: ''
      })
    }, 1000)
  },
  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function() {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
  },

  connectAdmin() {
    wx.makePhoneCall({
      phoneNumber: '13253531214' // 仅为示例，并非真实的电话号码
    })
  },

  showModal: function(e) {
    // console.log(e.currentTarget.dataset.target);
    // this.setData({
    //   modalName: e.currentTarget.dataset.target
    // })
    wx.navigateTo({
      url: '../upload/upload',
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
    if (this.data.isAdmin) {
      wx.request({
        url: `${app.globalData.domain}/orders/loadOrders`,
        method: 'get',
        data: {
          start: this.data.orderList.length,
          status1: 0
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


});